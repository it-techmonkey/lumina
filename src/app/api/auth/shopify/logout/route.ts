import { NextResponse } from 'next/server';
import {
  buildCustomerLogoutUrl,
  clearCustomerAuthCookies,
  sanitizeReturnTo,
} from '@/lib/server/customer-account-auth';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const requestedReturnTo = requestUrl.searchParams.get('return_to');
  const returnTo = sanitizeReturnTo(requestedReturnTo || '/');
  const absoluteReturnTo = new URL(returnTo, requestUrl.origin).toString();

  await clearCustomerAuthCookies();
  const logoutUrl = await buildCustomerLogoutUrl(absoluteReturnTo);
  return NextResponse.redirect(logoutUrl);
}
