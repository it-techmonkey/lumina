import { NextResponse } from 'next/server';
import { subscribeEmailToNewsletter } from '@/lib/server/shopify-newsletter';
import type { NewsletterSubscriptionResult } from '@/types';

interface SubscribeRequestBody {
  email?: unknown;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
  };
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SubscribeRequestBody;
    const email = typeof body.email === 'string' ? body.email.trim() : '';

    if (!email) {
      return NextResponse.json<ApiResponse<never>>(
        {
          success: false,
          error: { message: 'Please enter your email address.' },
        },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json<ApiResponse<never>>(
        {
          success: false,
          error: { message: 'Please enter a valid email address.' },
        },
        { status: 400 }
      );
    }

    const result = await subscribeEmailToNewsletter(email);

    return NextResponse.json<ApiResponse<NewsletterSubscriptionResult>>({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('[NewsletterSubscribe]', error);

    const message =
      error instanceof Error
        ? error.message
        : 'Unable to subscribe right now. Please try again in a moment.';

    return NextResponse.json<ApiResponse<never>>(
      {
        success: false,
        error: { message },
      },
      { status: 500 }
    );
  }
}
