"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { formatPriceWithCurrency } from "@/lib/api";

const CHECKOUT_STATE_PREFIX = "checkout:";

type LocalOrderLineItem = {
  id: string | null;
  title: string;
  quantity: number;
  price: string;
  sku: string | null;
  configuration: Record<string, string>;
  properties: Array<{
    name: string;
    value: string;
  }>;
};

type LocalOrder = {
  id: string;
  name: string;
  createdAt: string;
  financialStatus: string | null;
  fulfillmentStatus: string | null;
  totalPrice: string;
  currencyCode: string;
  lineItems: LocalOrderLineItem[];
};

type CheckoutSnapshot = {
  draftOrderId: string;
  checkoutUrl: string;
  lineItems: Array<{
    handle: string;
    title: string;
    calculatedPrice: number;
    quantity: number;
  }>;
  subtotal: number;
  currencyCode: string;
  createdAt: string;
};

type DraftOrderStatusResponse = {
  success: boolean;
  data?: {
    id: string;
    status: string;
    orderId: string | null;
    orderName: string | null;
    invoiceUrl: string;
    totalPrice: string;
    createdAt: string;
    localOrder: LocalOrder | null;
  };
  error?: { message: string };
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatStatus(status: string) {
  switch (status.toLowerCase()) {
    case "completed":
      return "Payment confirmed";
    case "invoice_sent":
      return "Checkout open";
    default:
      return "Waiting for payment";
  }
}

function formatLabel(value: string) {
  return value
    .replace(/^_+/, "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function configurationEntries(configuration: Record<string, string>) {
  return Object.entries(configuration).filter(([, value]) => value);
}

export default function ConfirmationClient() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const { customer } = useAuth();
  const [statusData, setStatusData] = useState<DraftOrderStatusResponse["data"] | null>(null);
  const [checkoutSnapshot, setCheckoutSnapshot] = useState<CheckoutSnapshot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openedCheckout, setOpenedCheckout] = useState(false);
  const hasClearedCartRef = useRef(false);

  const draftOrderId = searchParams.get("draftOrderId");
  const checkoutUrl = searchParams.get("checkoutUrl");

  const headline = useMemo(() => {
    if (!statusData) {
      return "Confirming your order";
    }

    if (statusData.status.toLowerCase() !== "completed") {
      return "Complete payment in Shopify";
    }

    return statusData.localOrder
      ? "Your order is confirmed"
      : "Payment received, finalizing your order";
  }, [statusData]);

  useEffect(() => {
    if (!draftOrderId) {
      return;
    }

    try {
      const stored = window.sessionStorage.getItem(`${CHECKOUT_STATE_PREFIX}${draftOrderId}`);
      if (!stored) {
        return;
      }

      setCheckoutSnapshot(JSON.parse(stored) as CheckoutSnapshot);
    } catch (storageError) {
      console.error("Could not load checkout snapshot:", storageError);
    }
  }, [draftOrderId]);

  useEffect(() => {
    if (!checkoutUrl || openedCheckout) {
      return;
    }

    const popup = window.open(checkoutUrl, "_blank", "noopener,noreferrer");
    setOpenedCheckout(Boolean(popup));
  }, [checkoutUrl, openedCheckout]);

  useEffect(() => {
    if (!draftOrderId) {
      setIsLoading(false);
      setError("Missing draft order reference. Please restart checkout from your cart.");
      return;
    }

    let isMounted = true;
    let pollTimer: number | null = null;

    const loadStatus = async () => {
      try {
        const response = await fetch(`/api/orders/status/${encodeURIComponent(draftOrderId)}`, {
          cache: "no-store",
        });
        const payload = (await response.json()) as DraftOrderStatusResponse;

        if (!response.ok || !payload.success || !payload.data) {
          throw new Error(payload.error?.message || "Could not load checkout status");
        }

        if (!isMounted) {
          return;
        }

        setStatusData(payload.data);
        setError(null);
        setIsLoading(false);

        const isCompleted = payload.data.status.toLowerCase() === "completed";

        if (isCompleted && !hasClearedCartRef.current) {
          clearCart();
          hasClearedCartRef.current = true;
        }

        if (!isCompleted || !payload.data.localOrder) {
          pollTimer = window.setTimeout(loadStatus, isCompleted ? 5000 : 4000);
        }
      } catch (statusError) {
        if (!isMounted) {
          return;
        }

        setIsLoading(false);
        setError(statusError instanceof Error ? statusError.message : "Could not load checkout status");
        pollTimer = window.setTimeout(loadStatus, 6000);
      }
    };

    loadStatus();

    return () => {
      isMounted = false;
      if (pollTimer) {
        window.clearTimeout(pollTimer);
      }
    };
  }, [clearCart, draftOrderId]);

  const currentCheckoutUrl = statusData?.invoiceUrl || checkoutUrl;
  const isCompleted = statusData?.status.toLowerCase() === "completed";
  const syncedOrder = statusData?.localOrder || null;
  const primaryLinkHref = syncedOrder ? "/account" : isCompleted ? "/products" : "/cart";
  const primaryLinkLabel = syncedOrder ? "View my account" : isCompleted ? "Continue browsing" : "Back to cart";
  const displayCurrency = syncedOrder?.currencyCode || checkoutSnapshot?.currencyCode || "USD";
  const displayLineItems = syncedOrder
    ? syncedOrder.lineItems.map((item) => ({
        key: item.id || `${syncedOrder.id}-${item.title}`,
        title: item.title,
        quantity: item.quantity,
        total: formatPriceWithCurrency(Number(item.price || 0), syncedOrder.currencyCode),
        configuration: configurationEntries(item.configuration),
      }))
    : (checkoutSnapshot?.lineItems || []).map((item) => ({
        key: `${item.handle}-${item.title}`,
        title: item.title,
        quantity: item.quantity,
        total: formatPriceWithCurrency(item.calculatedPrice * item.quantity, displayCurrency),
        configuration: [],
      }));
  const displayTotal = syncedOrder
    ? formatPriceWithCurrency(Number(syncedOrder.totalPrice || 0), syncedOrder.currencyCode)
    : checkoutSnapshot
      ? formatPriceWithCurrency(checkoutSnapshot.subtotal, displayCurrency)
      : statusData?.totalPrice || "-";

  return (
    <main className="w-full bg-[#f9fafb]">
      <section className="relative overflow-hidden bg-[#eaedf0] px-4 py-12 md:px-6 md:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.88),transparent_34%),linear-gradient(135deg,rgba(234,237,240,0.28),rgba(255,255,255,0.76))]" />
        <div className="relative mx-auto flex w-full max-w-[1248px] flex-col gap-5">
          <span className="inline-flex w-fit rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#657186]">
            Checkout confirmation
          </span>
          <h1 className="max-w-3xl font-playfair text-4xl font-medium leading-tight text-[#131720] md:text-[56px]">
            {headline}
          </h1>
          <p className="max-w-2xl text-[15px] leading-7 text-[#657186]">
            {isCompleted
              ? syncedOrder
                ? "Your payment is confirmed and your order summary is now saved inside Lumina."
                : "Your payment is through. We&apos;re finishing the final sync so the full order record appears inside the app."
              : "Keep this page open while you finish payment in Shopify. We&apos;ll verify the draft order automatically and update your Lumina confirmation here."}
          </p>
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-[1248px] gap-6 px-4 py-8 md:px-6 md:py-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.9fr)]">
        <section className="rounded-[28px] border border-[#eaedf0] bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${
                isCompleted
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-[#dbe0e6] bg-[#f8fafc] text-[#657186]"
              }`}
            >
              {statusData ? formatStatus(statusData.status) : "Checking status"}
            </span>
            {draftOrderId && (
              <span className="text-xs uppercase tracking-[0.14em] text-[#9aa3af]">
                Draft order {draftOrderId}
              </span>
            )}
          </div>

          <div className="mt-6 rounded-[24px] bg-[#fbfcfd] p-5">
            <h2 className="font-playfair text-2xl text-[#131720]">What happens next</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl bg-white p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-[#9aa3af]">1</p>
                <p className="mt-2 text-sm leading-6 text-[#131720]">
                  {isCompleted ? "Payment has been received and Shopify has closed the checkout." : "Open the secure Shopify checkout and complete payment."}
                </p>
              </div>
              <div className="rounded-2xl bg-white p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-[#9aa3af]">2</p>
                <p className="mt-2 text-sm leading-6 text-[#131720]">
                  {isCompleted ? "Lumina is syncing the paid order into your account timeline." : "This page polls Shopify until the draft order flips to paid."}
                </p>
              </div>
              <div className="rounded-2xl bg-white p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-[#9aa3af]">3</p>
                <p className="mt-2 text-sm leading-6 text-[#131720]">
                  {syncedOrder ? "Your in-app confirmation is ready, and the same order is available in your account history." : "As soon as sync finishes, your paid order appears inside your Lumina account history."}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {currentCheckoutUrl && !isCompleted && (
              <a
                href={currentCheckoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[#131720] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-black"
              >
                Open secure checkout
              </a>
            )}
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center rounded-full border border-[#dbe0e6] px-6 py-3 text-sm font-medium text-[#131720] transition-colors hover:border-[#131720]"
            >
              Refresh status
            </button>
            <Link
              href={primaryLinkHref}
              className="inline-flex items-center justify-center rounded-full border border-[#dbe0e6] px-6 py-3 text-sm font-medium text-[#131720] transition-colors hover:border-[#131720]"
            >
              {primaryLinkLabel}
            </Link>
            {isCompleted && !syncedOrder && (
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full border border-[#dbe0e6] px-6 py-3 text-sm font-medium text-[#131720] transition-colors hover:border-[#131720]"
              >
                Shop again
              </Link>
            )}
          </div>

          {error && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {isLoading && (
            <div className="mt-6 rounded-2xl border border-[#edf1f6] bg-[#fbfcfd] px-4 py-3 text-sm text-[#657186]">
              Checking Shopify for the latest payment status...
            </div>
          )}

          {isCompleted && statusData && (
            <div className={`mt-6 rounded-[24px] border border-emerald-200 bg-emerald-50 p-5 ${syncedOrder ? "confirmation-enter success-glow" : ""}`}>
              <div className="flex items-start gap-4">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-white text-emerald-700 ${syncedOrder ? "confirmation-check" : ""}`}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-playfair text-2xl text-emerald-900">
                    {syncedOrder ? "Order confirmed" : "Payment received"}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-emerald-900/80">
                    {syncedOrder
                      ? `Shopify marked this checkout as completed and Lumina saved it as ${syncedOrder.name}.`
                      : `Shopify marked this draft order as completed for ${statusData.orderName || "your order"}. We're still waiting for the final account sync.`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {isCompleted && (
            <div className="mt-6 rounded-[24px] border border-[#eaedf0] bg-[#fbfcfd] p-5">
              <p className="text-xs uppercase tracking-[0.14em] text-[#9aa3af]">
                {customer?.email ? "Saved to your account" : "Viewing as guest"}
              </p>
              <h3 className="mt-2 font-playfair text-2xl text-[#131720]">
                {customer?.email ? "We’ll keep this order in your Lumina account" : "Your order is confirmed even without an account"}
              </h3>
              <p className="mt-2 text-sm leading-6 text-emerald-900/80">
                {customer?.email
                  ? `Signed in as ${customer.email}. Once sync completes, this order will stay visible in your account history automatically.`
                  : "If you create or sign in to a Lumina account with the same checkout email later, your order history can still line up here once the records sync."}
              </p>
            </div>
          )}

          {displayLineItems.length > 0 && (
            <div className={`mt-6 rounded-[24px] border border-[#eaedf0] bg-white p-5 ${syncedOrder ? "confirmation-enter" : ""}`}>
              <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[#edf1f6] pb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-[#9aa3af]">Order summary</p>
                  <h3 className="mt-1 font-playfair text-2xl text-[#131720]">
                    {syncedOrder?.name || statusData?.orderName || "Draft order"}
                  </h3>
                </div>
                <p className="font-playfair text-3xl text-[#131720]">{displayTotal}</p>
              </div>

              <div className="mt-4 space-y-3">
                {displayLineItems.map((item) => (
                  <div key={item.key} className="rounded-2xl bg-[#fbfcfd] p-4">
                    <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="font-medium text-[#131720]">
                          {item.quantity}× {item.title}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-[#131720]">{item.total}</p>
                    </div>

                    {item.configuration.length > 0 && (
                      <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        {item.configuration.map(([key, value]) => (
                          <div key={key} className="rounded-2xl bg-white px-3 py-2">
                            <p className="text-[11px] uppercase tracking-[0.14em] text-[#9aa3af]">
                              {formatLabel(key)}
                            </p>
                            <p className="mt-1 text-sm text-[#131720]">{value}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <aside className="space-y-6">
          <section className="rounded-[24px] border border-[#eaedf0] bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9aa3af]">Order snapshot</p>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-[0.14em] text-[#9aa3af]">Status</dt>
                <dd className="mt-1 text-[#131720]">{statusData ? formatStatus(statusData.status) : "Waiting for Shopify"}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.14em] text-[#9aa3af]">Order ref</dt>
                <dd className="mt-1 text-[#131720]">
                  {syncedOrder?.name || statusData?.orderName || "Assigned after payment"}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.14em] text-[#9aa3af]">Created</dt>
                <dd className="mt-1 text-[#131720]">
                  {syncedOrder ? formatDate(syncedOrder.createdAt) : statusData ? formatDate(statusData.createdAt) : "-"}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.14em] text-[#9aa3af]">Total</dt>
                <dd className="mt-1 text-[#131720]">{displayTotal}</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-[24px] border border-[#eaedf0] bg-white p-6 shadow-sm">
            <h2 className="font-playfair text-2xl text-[#131720]">Need a hand?</h2>
            <p className="mt-3 text-sm leading-6 text-[#657186]">
              If payment has gone through but the final order card hasn&apos;t appeared yet, give it a few seconds. Draft-order completion and local webhook sync usually land quickly, but they can arrive slightly out of sequence.
            </p>
          </section>
        </aside>
      </div>
    </main>
  );
}
