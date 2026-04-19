import { NextResponse } from 'next/server';
import { clearCurrentSession, clearSessionCookie } from '@/lib/server/custom-auth';

function getReturnTo(request: Request): string {
  const url = new URL(request.url);
  return url.searchParams.get('return_to') || '/';
}

export async function GET(request: Request) {
  await clearCurrentSession();
  const response = NextResponse.redirect(new URL(getReturnTo(request), request.url));
  clearSessionCookie(response);
  return response;
}

export async function POST(request: Request) {
  await clearCurrentSession();
  const response = NextResponse.json({ success: true });
  clearSessionCookie(response);
  return response;
}
