import { NextResponse } from 'next/server';
import {
  applySessionCookie,
  createSession,
  normalizeEmail,
  verifyPasswordLogin,
} from '@/lib/server/custom-auth';

function getRequestMeta(request: Request) {
  return {
    userAgent: request.headers.get('user-agent'),
    ipAddress: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null,
  };
}

export async function POST(request: Request) {
  try {
    const { email, password } = (await request.json()) as { email?: string; password?: string };
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: { message: 'Email and password are required' } },
        { status: 400 }
      );
    }

    const result = await verifyPasswordLogin(normalizeEmail(email), password);

    if (result.reason === 'PASSWORD_NOT_SET') {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'PASSWORD_NOT_SET',
            message: 'Password is not set for this account. Use OTP login first.',
          },
        },
        { status: 400 }
      );
    }

    if (!result.customer) {
      return NextResponse.json(
        { success: false, error: { message: 'Invalid email or password' } },
        { status: 401 }
      );
    }

    const session = await createSession(result.customer.id, getRequestMeta(request));
    const response = NextResponse.json({ success: true, data: { message: 'Logged in' } });
    applySessionCookie(response, session.token, session.expiresAt);
    return response;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Password login failed';
    return NextResponse.json(
      { success: false, error: { message } },
      { status: 401 }
    );
  }
}
