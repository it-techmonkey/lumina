if (!process.argv.includes('--run-historical-migration')) throw new Error('Historical migration disabled. Edit shopify/theme directly; run build-css.cjs to rebuild styles.');
// One-time refinement of the imported theme. Ongoing edits belong in theme/.
const fs = require('node:fs');
const path = require('node:path');
const theme = path.resolve(__dirname, '../theme');
function edit(file, transform) {
  const target = path.join(theme, file);
  fs.writeFileSync(target, transform(fs.readFileSync(target, 'utf8')));
}
edit('sections/lumina-product.liquid', text => text.replace('data-product-price>', 'data-product-price data-unpriced-label="{{ block.settings.unpriced_label | escape }}">').replaceAll("{{ 'guide-lumina-measuring-guide.png' | asset_url }}", '/?view=measuring-guide').replaceAll("{{ 'guide-lumina_honeycomb_fitting_guide.pdf' | asset_url }}", '/?view=fitting-guide'));
edit('snippets/lumina-guarantee-badges.liquid', text => text.replace('class="grid grid-cols-4', 'class="lumina-guarantee-badges grid grid-cols-4'));
edit('sections/lumina-hero.liquid', text => text.replace(/<div class="flex items-center gap-2\.5 bg-white\/8[\s\S]*?<\/span><\/div><h1/, `<a href="#reviews" class="lumina-hero-rating">{% assign rating_product = settings.featured_product | default: all_products['honeycomb-blackout-blind'] %}{% render 'lumina-judgeme-badge', product: rating_product %}</a><h1`));
for (const file of ['sections/lumina-hero.liquid', 'snippets/lumina-guarantee-badges.liquid']) {
  edit(file, text => {
    const ids = {}, refs = {};
    return text.replace(/id="(top-arc-[^"]+)"/g, (_, id) => `id="${id}-{{ section.id }}-${ids[id] = (ids[id] || 0) + 1}"`).replace(/href="#(top-arc-[^"]+)"/g, (_, id) => `href="#${id}-{{ section.id }}-${refs[id] = (refs[id] || 0) + 1}"`);
  });
}
fs.appendFileSync(path.join(theme, 'assets/lumina-theme.css'), `
/* Keep text readable and allow the original guarantee artwork to scale on narrow screens. */
[class~="text-[#8c95a4]"],[class~="text-[#c8cdd6]"],[class~="text-[#9aa3af]"],[class~="text-[#657186]"]{color:#566174}
.lumina-guarantee-badges>div{min-width:0}.lumina-guarantee-badges svg{max-width:100%;height:auto}
.lumina-unpriced{font-size:25px}.lumina-native-product-form{min-width:0;width:100%}
.lumina-hero-rating{display:inline-flex;border:1px solid #ffffff30;border-radius:999px;padding:8px 16px;background:#ffffff14;color:#fff}
.lumina-hero-rating .jdgm-prev-badge__text{color:#fff}.lumina-hero-rating .jdgm-star{color:#fbbf24!important}
`);
