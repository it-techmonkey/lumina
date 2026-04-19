import { NextResponse } from 'next/server';
import { createOtpChallenge, normalizeEmail } from '@/lib/server/custom-auth';

export async function POST(request: Request) {
  try {
    const { email } = (await request.json()) as { email?: string };
    if (!email) {
      return NextResponse.json(
        { success: false, error: { message: 'Email is required' } },
        { status: 400 }
      );
    }

    const result = await createOtpChallenge(normalizeEmail(email));

    return NextResponse.json({
      success: true,
      data: {
        message: 'OTP sent',
        ...(result.devOtpCode ? { devOtpCode: result.devOtpCode } : {}),
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to send OTP';
    return NextResponse.json(
      { success: false, error: { message } },
      { status: 400 }
    );
  }
}
