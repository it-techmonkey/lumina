'use client';

import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center px-6 py-16 text-center">
      <span className="rounded-full border border-[#d9e0ea] px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#657186]">
        Lumina Account
      </span>
      <h1 className="mt-6 font-playfair text-4xl text-[#131720]">
        Sign in or create your account
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-6 text-[#657186]">
        Clerk is now handling authentication for this storefront. Use the buttons below or the nav
        to create your first test user and unlock your account dashboard.
      </p>

      <Show when="signed-out">
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <SignInButton>
            <button
              type="button"
              className="w-full rounded-full border border-[#d9e0ea] px-6 py-3 text-sm font-medium text-[#131720] transition-colors hover:border-[#131720] sm:w-auto"
            >
              Sign In
            </button>
          </SignInButton>
          <SignUpButton>
            <button
              type="button"
              className="w-full rounded-full bg-[#131720] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-black sm:w-auto"
            >
              Sign Up
            </button>
          </SignUpButton>
        </div>
      </Show>

      <Show when="signed-in">
        <div className="mt-10 flex flex-col items-center gap-4">
          <UserButton />
          <Link
            href="/account"
            className="rounded-full border border-[#d9e0ea] px-6 py-3 text-sm font-medium text-[#131720] transition-colors hover:border-[#131720]"
          >
            Go to My Account
          </Link>
        </div>
      </Show>
    </main>
  );
}
