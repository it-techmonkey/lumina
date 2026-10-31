# Draft verification — 2026-09-28

Target: **Lumina - Design Preview**, theme `157534552221`.

## Product design pass

The product template now uses the same Shopify product gallery as the existing website (first 20 media items), amber Judge.me rating, sale/compare summary, delivery estimate and countdown, guarantee grid, two-row promotion, original payment badge presentation, SVG trust icons, and a native sticky purchase bar. LPO labels, unit toggle, dimension rows, swatches and opening buttons were restyled. All new theme display controls are editable. The original site/product catalog remains untouched.

`tools/verify-product-design.cjs` passed at 360, 390, 768, 1024 and 1440px, with no horizontal overflow or uncaught JavaScript errors. Gallery navigation/lightbox, opening-direction guide, purchase locks and sticky visibility passed. Screenshots and evidence are in `.local/product-design/`. A final mobile video sizing fix restores the reference 4:3 media area.

The price matrix is still stored in LPO, with 448 local formula checks passing. The public LPO store config confirms `extensions` is empty. Live formula pricing remains blocked pending approval of the paid Formula extension. A synthetic `options:price` browser event tests theme display wiring only; it is not evidence that the app's pricing extension is active. No subscription, cart or order change was made.

| Check | Result |
| --- | --- |
| Shopify Theme Check | No errors or warnings |
| Theme JavaScript syntax | Passed |
| Final responsive check | No horizontal page overflow on home/product at 360, 390, 768, 1024 and 1440px; no uncaught JavaScript errors |
| Gallery and accordions | Five thumbnails, next image, more-images lightbox and Escape passed; product accordion rows match the original 65px height |
| Desktop homepage comparison | All nine measured section positions and heights match the original at 1440px |
| Mobile homepage | Main sections closely match; hero keeps content within the viewport instead of copying the original's overflowing inner column |
| Background customization | Empty overrides preserve original backgrounds; selected overrides still apply |
| Homepage popup | Fullscreen at 1440×1000, no internal overflow at 390px, Escape closes, dismissal survives reload, absent on product pages |
| Newsletter | Native Shopify customer form; success screen configured with existing subscriber discount; no signup submitted |
| Judge.me | Real 4.8 / 115 review data; four-review snapshot, native full list and native review form tested |
| LPO UI | Official embed and block installed; units, dimensions, fabric/frame colors and opening direction render |
| Local matrix parity | 448 inch/cm and fractional-boundary checks passed across 112 price cells |
| LPO storefront pricing | **Incomplete:** split surcharge works, dimension formula is ignored on the current subscription |
| LPO billing | No subscription change. Formula extension approval (+$9/month shown in app) pending |
| Purchase lock | Add to Cart and Buy Now disabled |
| Theme roles | `154578714781` live; `157534552221` unpublished |

The final layout/gallery check writes `.local/fidelity/final-verification.json`. Popup/review evidence is in `.local/fidelity/verification.json`; original/draft screenshots and geometry are in `.local/fidelity/`. The app pricing diagnostic is `.local/lpo/verification.json`. These directories are ignored by Git.

This is a close native-theme recreation, not a claim that every pixel matches. LPO uses native dimension inputs with decimal fractions rather than the original separate sixteenths selectors. Real Judge.me counts replace the original's inconsistent marketing count. The Shopify product's zero base price is preserved, with a theme-only starting-price display. The native app's full review layout differs after expanding the review snapshot.

After Formula activation, verify 24×36 inches and 60.96×91.44 cm both produce $205.71, and split opening produces $240.71. Check minimum/maximum rejection and boundary sizes, then validate cart properties, currency, final totals and checkout. No cart or order was submitted. Newsletter success, any double opt-in requirement and discount redemption also need a controlled launch test.

The earlier accessibility audit predates this fidelity pass; its zero-violation result must not be treated as certification of the current app controls and reference colors.

All source edits are inside `shopify/`. The existing Next.js implementation, product catalog fields, original theme, domains and DNS were not edited. LPO configuration and the unpublished theme were updated. Publishing still requires the owner's explicit instruction.
