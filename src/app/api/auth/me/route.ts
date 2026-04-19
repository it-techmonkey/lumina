import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { getCustomer } from '@/lib/auth';
import { getAccountOrdersByEmail } from '@/lib/server/account-orders';

export async function GET() {
  try {
    const { userId } = await auth();
    const customer = await getCustomer();

    if (!customer || !userId) {
      return NextResponse.json(
        { success: false, error: { message: 'Not authenticated' } },
        { status: 401 }
      );
    }

    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const primaryEmailAddress =
      user.primaryEmailAddress?.emailAddress ?? user.emailAddresses[0]?.emailAddress ?? null;
    const orderProfile = primaryEmailAddress
      ? await getAccountOrdersByEmail(primaryEmailAddress)
      : {
          firstName: null,
          lastName: null,
          defaultAddress: null,
          recentOrders: [],
        };

    return NextResponse.json({
      success: true,
      data: {
        ...customer,
        hasPassword: false,
        shouldSetupPassword: false,
        orderProfile,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Auth me error:', message);
    return NextResponse.json(
      { success: false, error: { message: 'Internal server error' } },
      { status: 500 }
    );
  }
}
