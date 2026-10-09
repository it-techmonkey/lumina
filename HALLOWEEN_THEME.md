# Halloween sale theme

A temporary festive skin added in October 2026. It re-labels the existing offers as Halloween offers and adds an orange accent plus a few decorations. It does not change any discount, price or code: `FINAL15` and the 10% subscriber code work exactly as before.

Everything is driven by one constant, `SEASONAL_SALE`, in `src/lib/seasonal-theme.ts`.

## Turning it off

1. Open `src/lib/seasonal-theme.ts`.
2. Change the last export to:

   ```ts
   export const SEASONAL_SALE: SeasonalSale | null = null;
   ```

3. Deploy.

The site returns to its previous wording and colours, and the countdown goes back to resetting at the visitor's midnight. No other file needs to change. To turn it back on, set the constant to `HALLOWEEN_SALE` again.

## The end date

`endsAt` in the same file (currently `2026-11-01T23:59:59`) is the countdown target, in the visitor's local time. It does not switch the theme off. Once it passes, the countdown and the "Ends in" text disappear from the top bar and product page, but the Halloween wording and colours stay until `SEASONAL_SALE` is set to `null`.

## What the theme changes

| Area | File | With the theme on | With it off |
| --- | --- | --- | --- |
| Top bar | `src/components/layout/TopBar.tsx` | "Halloween Sale \| Up to 60% Off…", orange-tinted bar, pumpkin icon | "Our Biggest Sale \| Up to 60% Off…", black bar |
| Countdown | `src/components/common/SaleCountdown.tsx` | Counts down to `endsAt` (e.g. `23d 07:55:23`), orange, "Halloween Sale ends in" | Counts down to midnight, amber/red, "Sale ends in" |
| Homepage hero | `src/components/home/Hero.tsx` | Sale pill above the rating, orange "Shop The Blind" button, orange stars, glow, cobweb, bats | No pill, white button, amber stars, no decorations |
| Product page | `src/components/product/ProductInfo.tsx` | "Halloween Sale price", orange "% off" badges, "Halloween offer: extra 15% off with code", orange Buy Now (page and sticky bar) | "Sale price", dark badges, "Extra 15% off with code", dark Buy Now |
| Homepage popup | `src/components/home/EmailCaptureModal.tsx` | "Halloween Offer", "Halloween welcome treat", orange dots and button | "Limited Offer", "Exclusive welcome offer", green dots, white button |
| Subscribe section | `src/components/home/SubscribeOffer.tsx` | "A Halloween treat: 10% off." | "Subscribe for 10% off." |

All Halloween copy lives in the `HALLOWEEN_SALE` object in `src/lib/seasonal-theme.ts`. The icons (pumpkin, bat, cobweb) are inline SVGs in `src/components/common/HalloweenDecor.tsx`.

## Removing the code completely

Switching off is enough to restore the site. To also delete the Halloween code, set `SEASONAL_SALE` to `null` first, then either reuse the switch for the next festive sale or remove it:

1. In each file in the table above, replace every `SEASONAL_SALE ? a : b` with `b`, delete every `{SEASONAL_SALE && …}` block, and remove the `seasonal-theme` and `HalloweenDecor` imports. The module-level helpers that only exist for the theme go too: `ACCENT_DOT` in `EmailCaptureModal.tsx`, and `SALE_BADGE` and `BUY_NOW_COLORS` in `ProductInfo.tsx`.
2. In `SaleCountdown.tsx`, call `useCountdown()` with no argument (or `useEndOfDayCountdown()`).
3. Delete `src/lib/seasonal-theme.ts`, `src/components/common/HalloweenDecor.tsx` and this document.
4. Run `npx tsc --noEmit` and `npm run lint`; both flag any leftover reference.

Two changes are worth keeping even after removal, since they are not Halloween-specific:

- `useCountdown(target)` in `src/hooks/useEndOfDayCountdown.ts` counts down to a fixed date, with days. `useEndOfDayCountdown()` still works as before.
- The "| Ends in" label is rendered by `SaleCountdown` (topbar variant) instead of being part of `OFFER_TEXT` in `TopBar.tsx`, so it can hide together with the timer.

## Not touched

Shopify checkout, discount codes, emails, product photos, page metadata, and the Shopify draft theme in `shopify/`.
