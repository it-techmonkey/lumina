import { Suspense } from "react";
import ConfirmationClient from "./ConfirmationClient";

function ConfirmationFallback() {
  return (
    <main className="w-full bg-[#f9fafb]">
      <section className="relative overflow-hidden bg-[#eaedf0] px-4 py-12 md:px-6 md:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.88),transparent_34%),linear-gradient(135deg,rgba(234,237,240,0.28),rgba(255,255,255,0.76))]" />
        <div className="relative mx-auto flex w-full max-w-[1248px] flex-col gap-5">
          <span className="inline-flex w-fit rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#657186]">
            Checkout confirmation
          </span>
          <h1 className="max-w-3xl font-playfair text-4xl font-medium leading-tight text-[#131720] md:text-[56px]">
            Confirming your order
          </h1>
          <p className="max-w-2xl text-[15px] leading-7 text-[#657186]">
            Loading your latest checkout state...
          </p>
        </div>
      </section>
    </main>
  );
}

export default function CheckoutConfirmationPage() {
  return (
    <Suspense fallback={<ConfirmationFallback />}>
      <ConfirmationClient />
    </Suspense>
  );
}
