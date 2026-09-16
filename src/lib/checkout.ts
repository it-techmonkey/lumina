import { getTotalInches } from "@/lib/pricing";
import type { CartItem, CheckoutItemRequest } from "@/types";

export function cartItemToCheckoutRequest(item: CartItem): CheckoutItemRequest {
  return {
    handle: item.product.slug,
    widthInches: getTotalInches(
      item.configuration.width,
      item.configuration.widthFraction,
      item.configuration.widthUnit
    ),
    heightInches: getTotalInches(
      item.configuration.height,
      item.configuration.heightFraction,
      item.configuration.heightUnit
    ),
    quantity: item.quantity,
    submittedPrice: item.product.price,
    configuration: {
      blindName: item.configuration.blindName || item.product.name,
      blindColor: item.configuration.blindColor || undefined,
      frameColor: item.configuration.frameColor || undefined,
      openingDirection: item.configuration.openingDirection || undefined,
    },
  };
}
