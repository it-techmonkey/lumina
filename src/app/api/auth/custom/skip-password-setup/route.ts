import { NextResponse } from 'next/server';
import { getAuthenticatedCustomer, skipPasswordSetup } from '@/lib/server/custom-auth';

export async function POST() {
  try {
    const authCustomer = await getAuthenticatedCustomer();
    if (!authCustomer) {
      return NextResponse.json(
        { success: false, error: { message: 'Not authenticated' } },
        { status: 401 }
      );
    }

    await skipPasswordSetup(authCustomer.id);
    return NextResponse.json({ success: true, data: { message: 'Skipped password setup' } });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to skip password setup';
    return NextResponse.json(
      { success: false, error: { message } },
      { status: 400 }
    );
  }
}
