import { NextResponse } from 'next/server';
import { getAuthenticatedCustomer, setPasswordForCustomer } from '@/lib/server/custom-auth';

export async function POST(request: Request) {
  try {
    const authCustomer = await getAuthenticatedCustomer();
    if (!authCustomer) {
      return NextResponse.json(
        { success: false, error: { message: 'Not authenticated' } },
        { status: 401 }
      );
    }

    const { password } = (await request.json()) as { password?: string };
    if (!password) {
      return NextResponse.json(
        { success: false, error: { message: 'Password is required' } },
        { status: 400 }
      );
    }

    await setPasswordForCustomer(authCustomer.id, password);
    return NextResponse.json({ success: true, data: { message: 'Password set successfully' } });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to set password';
    return NextResponse.json(
      { success: false, error: { message } },
      { status: 400 }
    );
  }
}
