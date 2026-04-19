import crypto from 'crypto';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from './database';
import { sendOtpEmail } from './otp-email';

const SESSION_COOKIE_NAME = 'app_auth_session';
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30;
const OTP_TTL_MS = 1000 * 60 * 10;
const OTP_MAX_ATTEMPTS = 5;

function now() {
  return new Date();
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function sha256(value: string): string {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function randomToken(bytes = 32): string {
  return crypto.randomBytes(bytes).toString('hex');
}

function makePasswordHash(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `scrypt$${salt}$${hash}`;
}

function verifyPasswordHash(password: string, serialized: string): boolean {
  const [algorithm, salt, expectedHash] = serialized.split('$');
  if (algorithm !== 'scrypt' || !salt || !expectedHash) return false;

  const actualHash = crypto.scryptSync(password, salt, 64).toString('hex');
  const expectedBuffer = Buffer.from(expectedHash, 'hex');
  const actualBuffer = Buffer.from(actualHash, 'hex');

  if (expectedBuffer.length !== actualBuffer.length) return false;
  return crypto.timingSafeEqual(expectedBuffer, actualBuffer);
}

function makeOtpCode(): string {
  return String(crypto.randomInt(0, 1000000)).padStart(6, '0');
}

function makeOtpHash(email: string, code: string): string {
  return sha256(`${normalizeEmail(email)}:${code}`);
}

function isStrongEnoughPassword(password: string): boolean {
  return password.length >= 8;
}

export async function findOrCreateAuthCustomer(email: string) {
  const normalizedEmail = normalizeEmail(email);
  let authCustomer = await prisma.customerAuth.findUnique({ where: { email: normalizedEmail } });

  if (authCustomer) {
    return authCustomer;
  }

  authCustomer = await prisma.customerAuth.create({
    data: {
      email: normalizedEmail,
    },
  });

  return authCustomer;
}

export async function createOtpChallenge(email: string): Promise<{ authCustomerId: string; devOtpCode?: string }> {
  const normalizedEmail = normalizeEmail(email);
  const authCustomer = await findOrCreateAuthCustomer(normalizedEmail);

  const code = makeOtpCode();
  const codeHash = makeOtpHash(normalizedEmail, code);
  const expiresAt = new Date(Date.now() + OTP_TTL_MS);

  await prisma.otpChallenge.updateMany({
    where: {
      customerAuthId: authCustomer.id,
      consumedAt: null,
    },
    data: {
      consumedAt: now(),
    },
  });

  await prisma.otpChallenge.create({
    data: {
      customerAuthId: authCustomer.id,
      codeHash,
      expiresAt,
    },
  });

  console.log(`[custom-auth] OTP for ${normalizedEmail}: ${code}`);

  try {
    await sendOtpEmail(normalizedEmail, code);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown OTP delivery error';
    console.error(`[custom-auth] OTP email send failed for ${normalizedEmail}: ${message}`);

    if (process.env.NODE_ENV === 'production') {
      throw new Error('Failed to send OTP email');
    }
  }

  const isProd = process.env.NODE_ENV === 'production';
  return {
    authCustomerId: authCustomer.id,
    ...(isProd ? {} : { devOtpCode: code }),
  };
}

export async function verifyOtpChallenge(email: string, code: string) {
  const normalizedEmail = normalizeEmail(email);
  const authCustomer = await prisma.customerAuth.findUnique({ where: { email: normalizedEmail } });
  if (!authCustomer) {
    throw new Error('Customer not found');
  }

  const challenge = await prisma.otpChallenge.findFirst({
    where: {
      customerAuthId: authCustomer.id,
      consumedAt: null,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (!challenge) {
    throw new Error('No OTP request found');
  }

  if (challenge.expiresAt.getTime() < Date.now()) {
    throw new Error('OTP has expired');
  }

  if (challenge.attempts >= OTP_MAX_ATTEMPTS) {
    throw new Error('OTP attempts exceeded');
  }

  const expectedHash = makeOtpHash(normalizedEmail, code.trim());
  const isValid = challenge.codeHash === expectedHash;

  if (!isValid) {
    await prisma.otpChallenge.update({
      where: { id: challenge.id },
      data: { attempts: { increment: 1 } },
    });
    throw new Error('Invalid OTP code');
  }

  await prisma.otpChallenge.update({
    where: { id: challenge.id },
    data: {
      consumedAt: now(),
    },
  });

  await prisma.customerAuth.update({
    where: { id: authCustomer.id },
    data: { lastLoginAt: now() },
  });

  return authCustomer;
}

export async function verifyPasswordLogin(email: string, password: string) {
  const normalizedEmail = normalizeEmail(email);
  const authCustomer = await prisma.customerAuth.findUnique({ where: { email: normalizedEmail } });
  if (!authCustomer) {
    throw new Error('Invalid email or password');
  }

  if (!authCustomer.passwordHash) {
    return { customer: null, reason: 'PASSWORD_NOT_SET' as const };
  }

  const ok = verifyPasswordHash(password, authCustomer.passwordHash);
  if (!ok) {
    throw new Error('Invalid email or password');
  }

  await prisma.customerAuth.update({
    where: { id: authCustomer.id },
    data: { lastLoginAt: now() },
  });

  return { customer: authCustomer, reason: null };
}

export async function setPasswordForCustomer(customerAuthId: string, password: string) {
  if (!isStrongEnoughPassword(password)) {
    throw new Error('Password must be at least 8 characters long');
  }

  const passwordHash = makePasswordHash(password);
  await prisma.customerAuth.update({
    where: { id: customerAuthId },
    data: {
      passwordHash,
      passwordSetupSkippedAt: null,
      updatedAt: now(),
    },
  });
}

export async function skipPasswordSetup(customerAuthId: string) {
  await prisma.customerAuth.update({
    where: { id: customerAuthId },
    data: {
      passwordSetupSkippedAt: now(),
    },
  });
}

export async function createSession(customerAuthId: string, meta?: { userAgent?: string | null; ipAddress?: string | null }) {
  const token = randomToken();
  const tokenHash = sha256(token);
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

  await prisma.authSession.create({
    data: {
      tokenHash,
      customerAuthId,
      expiresAt,
      userAgent: meta?.userAgent || null,
      ipAddress: meta?.ipAddress || null,
    },
  });

  return { token, expiresAt };
}

export function applySessionCookie(response: NextResponse, token: string, expiresAt: Date) {
  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: expiresAt,
  });
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}

export async function clearCurrentSession() {
  const cookieStore = await cookies();
  const rawToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!rawToken) return;

  await prisma.authSession.deleteMany({ where: { tokenHash: sha256(rawToken) } });
}

export async function getAuthenticatedCustomer() {
  const cookieStore = await cookies();
  const rawToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!rawToken) return null;

  const session = await prisma.authSession.findFirst({
    where: {
      tokenHash: sha256(rawToken),
      expiresAt: { gt: now() },
    },
    include: {
      customerAuth: true,
    },
  });

  if (!session?.customerAuth) {
    return null;
  }

  await prisma.authSession.update({
    where: { id: session.id },
    data: { lastAccessedAt: now() },
  });

  return session.customerAuth;
}

export function shouldPromptPasswordSetup(authCustomer: { passwordHash: string | null; passwordSetupSkippedAt: Date | null }): boolean {
  return !authCustomer.passwordHash && !authCustomer.passwordSetupSkippedAt;
}
