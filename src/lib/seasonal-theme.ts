export interface SeasonalSale {
  /** Replaces "Sale" / "Our Biggest Sale" wherever the offer is named */
  saleName: string;
  /** Short pill label used on the homepage popup */
  offerLabel: string;
  /** Hero pill text */
  heroPill: string;
  /** Prefix for the PDP promo code row */
  promoCodeLabel: string;
  /** Eyebrow above the popup's 10% welcome offer */
  welcomeEyebrow: string;
  /** Heading of the homepage subscribe section */
  subscribeHeading: string;
  /** Countdown target, in the visitor's local time. The countdown hides once it passes. */
  endsAt: string;
}

const HALLOWEEN_SALE: SeasonalSale = {
  saleName: "Halloween Sale",
  offerLabel: "Halloween Offer",
  heroPill: "Halloween Sale · Up to 60% off",
  promoCodeLabel: "Halloween offer: extra 15% off with code",
  welcomeEyebrow: "Halloween welcome treat",
  subscribeHeading: "A Halloween treat: 10% off.",
  endsAt: "2026-11-01T23:59:59",
};

/**
 * Temporary festive theme. Discounts and codes are unchanged — this only
 * re-labels and re-skins the existing offers.
 *
 * To switch the site back to its regular look, set this to `null`.
 */
export const SEASONAL_SALE: SeasonalSale | null = HALLOWEEN_SALE;

export const SEASONAL_SALE_ENDS_AT: Date | null = SEASONAL_SALE ? new Date(SEASONAL_SALE.endsAt) : null;
