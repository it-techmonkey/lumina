"use client";

import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { usePathname } from 'next/navigation';

const Header = () => {
  const { cart } = useCart();
  const pathname = usePathname();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href');
    if (pathname === '/' && href?.startsWith('/#')) {
      const targetId = href.replace('/#', '');
      const elem = document.getElementById(targetId);
      if (elem) {
        e.preventDefault();
        elem.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', href);
      }
    }
  };

  return (
    <header className="w-full flex justify-center sticky top-0 z-50 bg-white shadow-sm px-4 md:px-6">
      <div className="w-full max-w-[1280px] flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex flex-col items-start leading-none shrink-0" aria-label="Home">
          <span className="font-playfair text-[#131720] text-[20px] font-normal tracking-[-0.5px]">
            Lumina
          </span>
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden lg:flex items-center gap-8 shrink-0">
          <Link 
            href="/products" 
            className="font-sans font-medium text-[14px] text-[#657186] hover:text-[#131720] transition-colors leading-[20px] whitespace-nowrap"
          >
            The Blind
          </Link>
          <Link 
            href="/guide/lumina_honeycomb_measuring_guide.pdf"
            className="font-sans font-medium text-[14px] text-[#657186] hover:text-[#131720] transition-colors leading-[20px] whitespace-nowrap"
          >
            Measuring
          </Link>
          <Link 
            href="/#reviews" 
            onClick={handleScroll}
            className="font-sans font-medium text-[14px] text-[#657186] hover:text-[#131720] transition-colors leading-[20px] whitespace-nowrap"
          >
            Reviews
          </Link>
          <Link 
            href="/#faq" 
            onClick={handleScroll}
            className="font-sans font-medium text-[14px] text-[#657186] hover:text-[#131720] transition-colors leading-[20px] whitespace-nowrap"
          >
            FAQ
          </Link>
        </nav>

        {/* Icons (Account & Cart) */}
        <div className="flex shrink-0 items-center justify-end gap-5 text-[#131720]">
          <Show when="signed-out">
            <div className="hidden md:flex items-center gap-2">
              <SignInButton>
                <button
                  type="button"
                  className="rounded-full border border-[#d9e0ea] px-4 py-2 text-[13px] font-medium text-[#131720] transition-colors hover:border-[#131720]"
                >
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button
                  type="button"
                  className="rounded-full bg-[#131720] px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-black"
                >
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </Show>
          <Link href="/cart" aria-label="Cart" className="hover:opacity-70 transition-opacity relative">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cart.itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#131720] text-white text-[10px] font-semibold rounded-full min-w-5 h-5 px-1 flex items-center justify-center">
                {cart.itemCount > 99 ? '99+' : cart.itemCount}
              </span>
            )}
          </Link>
          <Show when="signed-out">
            <SignInButton>
              <button
                type="button"
                aria-label="Account"
                className="hover:opacity-70 transition-opacity md:hidden"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <div className="flex items-center gap-3">
              <Link
                href="/account"
                className="hidden md:inline text-[13px] font-medium text-[#657186] hover:text-[#131720] transition-colors"
              >
                Account
              </Link>
              <UserButton />
            </div>
          </Show>
        </div>
      </div>
    </header>
  );
};

export default Header;
