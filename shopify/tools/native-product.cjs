if (!process.argv.includes('--run-historical-migration')) throw new Error('Historical migration disabled. Edit shopify/theme directly; run build-css.cjs to rebuild styles.');
const fs=require('node:fs');const path=require('node:path');const cheerio=require('cheerio');
const base=path.resolve(__dirname,'../theme');const read=p=>fs.readFileSync(path.join(base,p),'utf8');const write=(p,s)=>fs.writeFileSync(path.join(base,p),s);
const text=(id,label,def)=>({type:'text',id,label,...(def?{default:def}:{})});
// Preserve only the design control markup; the surrounding product page is native Liquid.
const original=read('sections/lumina-product.liquid').split('{% schema %}')[0];
const tokens=[];const mask=original.replace(/{[{%][\s\S]*?[%}]}/g,m=>{tokens.push(m);return `LIQUIDTOKEN${tokens.length-1}END`;});
const $=cheerio.load(mask,{xml:{xmlMode:false,decodeEntities:true}},false);const restore=s=>s.replace(/LIQUIDTOKEN(\d+)END(?:="")?/gi,(_,n)=>tokens[Number(n)]);
write('snippets/lumina-design-options.liquid',restore($.html($('[data-design-options]'))));
write('snippets/lumina-guarantee-badges.liquid',restore($.html($('div').filter((_,el)=>$(el).children('svg').length===4).first()))||'');
const markup=`{% liquid
 assign product = product | default: section.settings.product | default: settings.featured_product
 if product == blank
   assign product = all_products['honeycomb-blackout-blind']
 endif
 assign selected_variant = product.selected_or_first_available_variant
 assign option_apps = section.blocks | where: 'type', '@app'
 assign product_form_id = 'LuminaProductForm-' | append: section.id
 assign can_purchase = false
 if settings.enable_purchasing and selected_variant.available
   if option_apps.size > 0 or section.settings.require_options_app == false
     assign can_purchase = true
   endif
 endif
%}
<section class="w-full bg-white pt-10 md:pt-15 pb-12 md:pb-20" data-lumina-product data-section-id="{{ section.id }}" data-can-purchase="{{ can_purchase }}">
 <div class="max-w-[1248px] mx-auto px-4 md:px-8 xl:px-0 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[64px]">
  <div class="relative w-full self-start lg:sticky lg:top-24">{% render 'lumina-product-gallery', product: product, section: section %}</div>
  <div class="w-full pt-2">
   {% if product != blank %}
   {% form 'product', product, id: product_form_id, class: 'lumina-native-product-form' %}
    <input type="hidden" name="id" value="{{ selected_variant.id }}" data-variant-id>
    <input type="hidden" name="quantity" value="1">
    {% for block in section.blocks %}
     {% case block.type %}
      {% when 'title' %}<div {{ block.shopify_attributes }}><h1 class="font-playfair font-medium text-[#131720] text-[32px] leading-tight lg:text-[40px]">{{ block.settings.heading | default: product.title | escape }}</h1></div>
      {% when 'description' %}<div class="lumina-product-description text-[#657186] text-[15px] leading-6" {{ block.shopify_attributes }}>{% if block.settings.text != blank %}{{ block.settings.text }}{% else %}{{ product.description }}{% endif %}</div>
      {% when 'rating' %}<div {{ block.shopify_attributes }}><a href="#reviews" class="lumina-rating-link">{% render 'lumina-judgeme-badge', product: product %}</a></div>
      {% when 'price' %}<div {{ block.shopify_attributes }}><div class="flex items-end gap-3 flex-wrap"><span class="font-playfair text-[36px] leading-none" data-product-price>{{ selected_variant.price | money }}</span><s class="text-[#8c95a4] text-lg" data-compare-price {% unless selected_variant.compare_at_price > selected_variant.price %}hidden{% endunless %}>{{ selected_variant.compare_at_price | money }}</s><span class="rounded-full bg-[#131720] px-3 py-1 text-xs font-semibold text-white" data-discount-percent {% unless selected_variant.compare_at_price > selected_variant.price %}hidden{% endunless %}>{% if selected_variant.compare_at_price > selected_variant.price %}{{ selected_variant.compare_at_price | minus: selected_variant.price | times: 100.0 | divided_by: selected_variant.compare_at_price | round }}% off{% endif %}</span></div><div class="flex flex-wrap justify-between gap-3 mt-4 text-[13px] text-[#657186]"><p>{{ block.settings.shipping | escape }}</p><p>{{ block.settings.delivery | escape }}</p></div></div>
      {% when 'promotion' %}<div class="lumina-promotion" {{ block.shopify_attributes }}><span>{{ block.settings.text | escape }}</span><button type="button" data-copy-code="{{ block.settings.code | escape }}">{{ block.settings.code | escape }}</button></div>
      {% when 'guarantees' %}<div {{ block.shopify_attributes }}>{% render 'lumina-guarantee-badges' %}</div>
      {% when 'options_preview' %}{% if option_apps.size == 0 and block.settings.show %}<div {{ block.shopify_attributes }}>{% render 'lumina-design-options' %}</div>{% endif %}
      {% when '@app' %}{% render block %}
      {% when 'variant_picker' %}{% unless product.has_only_default_variant %}<div {{ block.shopify_attributes }}><label for="Variant-{{ section.id }}" class="block text-sm font-semibold mb-2">{{ block.settings.label | escape }}</label><select id="Variant-{{ section.id }}" data-variant-selector class="w-full rounded-xl border border-[#dbe0e6] bg-[#f9fafb] p-3">{% for variant in product.variants %}<option value="{{ variant.id }}" {% if variant.id == selected_variant.id %}selected{% endif %} {% unless variant.available %}disabled{% endunless %}>{{ variant.title | escape }} — {{ variant.price | money }}{% unless variant.available %} (Sold out){% endunless %}</option>{% endfor %}</select></div>{% endunless %}
      {% when 'buy_buttons' %}<div {{ block.shopify_attributes }}><button type="button" data-dialog-open="LuminaFitPromise" class="lumina-fit-button"><span>{{ block.settings.promise | escape }}</span><span>Learn More</span></button><div class="grid grid-cols-2 gap-3 mt-4"><button type="submit" name="add" data-add-to-cart class="lumina-outline-button" {% unless can_purchase %}disabled{% endunless %}>{{ block.settings.add_label | escape }}</button><button type="submit" name="checkout" value="checkout" data-buy-now class="lumina-button" {% unless can_purchase %}disabled{% endunless %}>{{ block.settings.buy_label | escape }}</button></div>{% if block.settings.show_payments %}<div class="lumina-payments">{% if shop.enabled_payment_types.size > 0 %}{% for type in shop.enabled_payment_types %}{{ type | payment_type_svg_tag }}{% endfor %}{% else %}<img src="{{ 'payment-badge.png' | asset_url }}" width="400" height="60" alt="Accepted payment methods" loading="lazy">{% endif %}</div>{% endif %}<p data-product-message role="status" class="text-sm text-[#657186] mt-3"></p></div>
      {% when 'trust' %}<div class="lumina-trust-block" {{ block.shopify_attributes }}><p class="text-xs uppercase tracking-widest text-[#657186] mb-5">{{ block.settings.heading | escape }}</p><div class="grid grid-cols-3 gap-3 text-center">{% for index in (1..3) %}{% capture title_key %}title_{{ index }}{% endcapture %}{% capture text_key %}text_{{ index }}{% endcapture %}<div><span class="lumina-trust-symbol" aria-hidden="true">{% case index %}{% when 1 %}↗{% when 2 %}✓{% when 3 %}☆{% endcase %}</span><strong class="block text-xs">{{ block.settings[title_key] | escape }}</strong><p class="text-xs text-[#657186] mt-2">{{ block.settings[text_key] | escape }}</p></div>{% endfor %}</div></div>
      {% when 'accordion' %}<details class="lumina-accordion" {{ block.shopify_attributes }}><summary><span class="font-playfair text-base">{{ block.settings.heading | escape }}</span><span aria-hidden="true">+</span></summary><div class="lumina-richtext">{{ block.settings.content }}</div></details>
      {% when 'text' %}<div class="lumina-richtext" {{ block.shopify_attributes }}>{{ block.settings.text }}</div>
      {% when 'custom_liquid' %}<div {{ block.shopify_attributes }}>{{ block.settings.code }}</div>
     {% endcase %}
    {% endfor %}
   {% endform %}
   <script type="application/json" data-product-variants>{{ product.variants | json }}</script>
   <script type="application/json" data-product-currency>{{ cart.currency.iso_code | default: shop.currency | json }}</script>
   {% else %}<h1 class="font-playfair text-4xl">{{ section.settings.empty_title | escape }}</h1>{% if request.design_mode %}<p>Select a product in this section or Theme settings.</p>{% endif %}{% endif %}
  </div>
 </div>
</section>`;
const blocks=[
 {type:'image',name:'Gallery image',settings:[{type:'image_picker',id:'image',label:'Image'},text('alt','Image description','Lumina blackout blind'),{type:'select',id:'original',label:'Original design image',options:Array.from({length:10},(_,i)=>({value:String(i+1),label:'Image '+(i+1)})),default:'1'}]},
 {type:'title',name:'Title',limit:1,settings:[text('heading','Title override')]},
 {type:'description',name:'Description',limit:1,settings:[{type:'richtext',id:'text',label:'Description override',info:'Leave blank to use the product description.'}]},
 {type:'rating',name:'Judge.me star rating',limit:1,settings:[]},
 {type:'price',name:'Price and delivery',limit:1,settings:[text('shipping','Shipping note','Sale price · free shipping'),text('delivery','Delivery note','Delivered in 7–11 business days')]},
 {type:'guarantees',name:'Guarantee stamps',limit:1,settings:[]},
 {type:'promotion',name:'Promotion',settings:[text('text','Offer text','Extra 15% off with code'),text('code','Discount code','FINAL15')]},
 {type:'options_preview',name:'Options design preview',limit:1,settings:[{type:'checkbox',id:'show',label:'Show design controls until LPO is added',default:true},{type:'paragraph',content:'These controls preview the design only. Add an LPO app block to replace them with priced product options.'}]},
 {type:'variant_picker',name:'Variant selector',limit:1,settings:[text('label','Label','Choose your option')]},
 {type:'@app'},
 {type:'buy_buttons',name:'Purchase buttons',limit:1,settings:[text('promise','Fit promise label','The Lumina Fit Promise'),text('add_label','Add to cart label','Add to Cart'),text('buy_label','Buy now label','Buy Now'),{type:'checkbox',id:'show_payments',label:'Show payment methods',default:true}]},
 {type:'trust',name:'Trust points',limit:1,settings:[text('heading','Heading','The Perfect-Fit Promise'),text('title_1','First title','Free USA Shipping'),text('text_1','First description','On every order, always'),text('title_2','Second title','1-Year Warranty'),text('text_2','Second description','Manufacturer backed'),text('title_3','Third title','Made to Measure'),text('text_3','Third description','Cut to your exact size')]},
 {type:'accordion',name:'Collapsible row',settings:[text('heading','Heading','Product details'),{type:'richtext',id:'content',label:'Content',default:'<p>Add product information.</p>'}]},
 {type:'text',name:'Rich text',settings:[{type:'richtext',id:'text',label:'Text',default:'<p>Add your text.</p>'}]},
 {type:'custom_liquid',name:'Custom Liquid',settings:[{type:'liquid',id:'code',label:'Liquid'}]}
];
const accordion=$('#product-details details').map((_,el)=>({type:'accordion',settings:{heading:$(el).find('summary').text().replace(/\+$/,'').trim(),content:restore($(el).find('.lumina-richtext').html())}})).get();
// Shopify richtext accepts paragraphs, lists, links and emphasis; remove presentation classes.
accordion.forEach(item=>{item.settings.content=item.settings.content.replace(/ class="[^"]*"/g,'').replace(/href="([^"]*LIQUIDTOKEN[^"]*)"/g,'href="https://www.luminablackoutblinds.com"');});
const initial=[...Array.from({length:10},(_,i)=>({type:'image',settings:{original:String(i+1),alt:`Lumina blackout blind image ${i+1}`}})),...['title','description','rating','price','guarantees','promotion','variant_picker','options_preview','buy_buttons','trust'].map(type=>({type,settings:{}})),...accordion];
const schema={name:'Product',settings:[{type:'product',id:'product',label:'Product (featured preview)'},{type:'select',id:'media_source',label:'Gallery source',default:'theme',options:[{value:'theme',label:'Theme image blocks'},{value:'product',label:'Shopify product media'}]},{type:'checkbox',id:'require_options_app',label:'Require LPO before enabling purchases',default:true},text('empty_title','Empty product title','Blackout Blind')],blocks,presets:[{name:'Product',blocks:initial}]};
write('sections/lumina-product.liquid',markup+'\n{% schema %}\n'+JSON.stringify(schema,null,2)+'\n{% endschema %}');
for(const template of ['product.json','index.product-preview.json']){const data=JSON.parse(read('templates/'+template));data.sections.main.blocks=Object.fromEntries(initial.map((b,i)=>['block'+i,b]));data.sections.main.block_order=initial.map((_,i)=>'block'+i);write('templates/'+template,JSON.stringify(data,null,2));}
console.log('Product page now uses native reorderable blocks, real variants, Shopify product forms and editable gallery media.');
