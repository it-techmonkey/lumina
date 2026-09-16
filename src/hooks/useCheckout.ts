"use client";

import { useState } from "react";
import { createCheckout } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import { getStoreSessionContext } from "@/lib/store-events";
import type { CheckoutItemRequest, CheckoutResponse } from "@/types";

export function useCheckout() {
  const { markCheckoutPending } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const checkout = async (items: CheckoutItemRequest[]): Promise<CheckoutResponse | null> => {
    setIsCheckingOut(true);
    setCheckoutError(null);

    try {
      const result = await createCheckout(items, undefined, getStoreSessionContext());
      markCheckoutPending(result.draftOrderId);
      window.location.href = result.checkoutUrl;
      return result;
    } catch (error) {
      console.error("Checkout error:", error);
      setCheckoutError(error instanceof Error ? error.message : "Checkout failed");
      setIsCheckingOut(false);
      return null;
    }
  };

  return { checkout, isCheckingOut, checkoutError, setCheckoutError };
}
