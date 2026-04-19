import { NextResponse } from 'next/server';
import {
  applySessionCookie,
  createSession,
  normalizeEmail,
  verifyOtpChallenge,
} from '@/lib/server/custom-auth';

function getRequestMeta(request: Request) {
  return {
    userAgent: request.headers.get('user-agent'),
    ipAddress: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null,
  };
}

export async function POST(request: Request) {
  try {
    const { email, otp } = (await request.json()) as { email?: string; otp?: string };
    if (!email || !otp) {
      return NextResponse.json(
        { success: false, error: { message: 'Email and OTP are required' } },
        { status: 400 }
      );
    }

    const authCustomer = await verifyOtpChallenge(normalizeEmail(email), otp);
    const session = await createSession(authCustomer.id, getRequestMeta(request));

    const response = NextResponse.json({ success: true, data: { message: 'Logged in' } });
    applySessionCookie(response, session.token, session.expiresAt);
    return response;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'OTP verification failed';
    return NextResponse.json(
      { success: false, error: { message } },
      { status: 400 }
    );
  }
}
