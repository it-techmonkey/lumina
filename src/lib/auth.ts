'use server';

import { auth, clerkClient } from '@clerk/nextjs/server';
import { type ShopifyCustomer } from './shopify';

/**
 * Get the currently authenticated customer (server-side).
 * Used only for checkout email pre-fill.
 * Account management is handled by Shopify's hosted account pages.
 */
export async function getCustomer(): Promise<ShopifyCustomer | null> {
  const { userId } = await auth();
  if (!userId) return null;

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const primaryEmailAddress =
    user.primaryEmailAddress?.emailAddress ?? user.emailAddresses[0]?.emailAddress ?? null;

  if (!primaryEmailAddress) {
    return null;
  }

  return {
    id: user.id,
    firstName: user.firstName ?? null,
    lastName: user.lastName ?? null,
    email: primaryEmailAddress,
    phone: user.primaryPhoneNumber?.phoneNumber ?? null,
  };
}
