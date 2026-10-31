if (!process.argv.includes('--run-historical-migration')) throw new Error('Historical migration disabled. Edit shopify/theme directly; run build-css.cjs to rebuild styles.');
const fs=require('fs');const path=require('path');const base=path.resolve(__dirname,'../theme');
const read=p=>fs.readFileSync(path.join(base,p),'utf8');const write=(p,v)=>fs.writeFileSync(path.join(base,p),v);const json=(p,v)=>write(p,JSON.stringify(v,null,2)+'\n');
for(const file of fs.readdirSync(path.join(base,'sections')).filter(n=>n.endsWith('.liquid'))){let source=read('sections/'+file).replace(/data-native-block(?:="")?/g,'{{ block.shopify_attributes }}');write('sections/'+file,source);}
// Empty base prices must not advertise free custom blinds before LPO is configured.
let product=read('sections/lumina-product.liquid');product=product.replace('{{ selected_variant.price | money }}</span>','{% if selected_variant.price > 0 %}{{ selected_variant.price | money }}{% else %}<span class="text-[25px]">{{ block.settings.unpriced_label | escape }}</span>{% endif %}</span>');
const [markup,tail]=product.split('{% schema %}');const schema=JSON.parse(tail.split('{% endschema %}')[0]);schema.blocks.find(b=>b.type==='price').settings.push({type:'text',id:'unpriced_label',label:'Label when base price is zero',default:'Made to your measurements'});
schema.blocks.find(b=>b.type==='options_preview').settings.push({type:'paragraph',content:'Do not enable purchasing with these design controls. LPO must supply validated option pricing first.'});
write('sections/lumina-product.liquid',markup+'{% schema %}\n'+JSON.stringify(schema,null,2)+'\n{% endschema %}');
// Give all content sections standard layout controls and clean, useful field labels.
for(const file of fs.readdirSync(path.join(base,'sections')).filter(n=>n.endsWith('.liquid'))){let source=read('sections/'+file);if(!source.includes('{% schema %}'))continue;let[html,tail]=source.split('{% schema %}');const schema=JSON.parse(tail.split('{% endschema %}')[0]);
 for(const group of [schema,...(schema.blocks||[])]){for(const setting of group.settings||[]){if(setting.label?.startsWith('Text: '))setting.label=setting.label.replace('Text: ','');if(setting.label?.startsWith('Heading: '))setting.label='Heading';}}
 if(schema.settings?.some(s=>s.id==='spacing_top')){
  schema.settings.push({type:'color',id:'background',label:'Section background override'},{type:'select',id:'content_width',label:'Content width',default:'original',options:[{value:'original',label:'Original design'},{value:'narrow',label:'Narrow'},{value:'wide',label:'Wide'}]});
  html=html.replace('<div style="padding-top:', '<div class="lumina-editable-section lumina-width-{{ section.settings.content_width }}" style="--section-background:{{ section.settings.background }};padding-top:');
 }
 write('sections/'+file,html+'\n{% schema %}\n'+JSON.stringify(schema,null,2)+'\n{% endschema %}');
}
// Fix missing desktop headline in the original measuring section.
const measuringPath='sections/lumina-measuring.liquid';let measuring=read(measuringPath);let[mh,mt]=measuring.split('{% schema %}');let ms=JSON.parse(mt.split('{% endschema %}')[0]);const setting=ms.settings.find(s=>s.type==='html'&&s.default?.includes('fit perfectly')&&!s.default.includes('Measure once'));if(setting)setting.default='<span>Measure once,</span><span class="font-normal italic">fit perfectly</span>';write(measuringPath,mh+'{% schema %}\n'+JSON.stringify(ms,null,2)+'\n{% endschema %}');
// Use Judge.me data for the hero rating instead of an inherited hardcoded count.
const heroPath='sections/lumina-hero.liquid';let hero=read(heroPath);let[hh,ht]=hero.split('{% schema %}');let hs=JSON.parse(ht.split('{% endschema %}')[0]);const rating=hs.settings.find(s=>s.default?.includes?.('750+ verified reviews'));if(rating){hh=hh.replace('{{ section.settings.'+rating.id+' | escape }}',"{% assign rating_product = settings.featured_product | default: all_products['honeycomb-blackout-blind'] %}{{ rating_product.metafields.judgeme.badge }}");hs.settings=hs.settings.filter(s=>s.id!==rating.id);}write(heroPath,hh+'{% schema %}\n'+JSON.stringify(hs,null,2)+'\n{% endschema %}');
// Keep empty cart badges out of the layout.
let header=read('sections/lumina-header.liquid');header=header.replace('{{ cart.item_count }}</span>','{% if cart.item_count > 0 %}{{ cart.item_count }}{% endif %}</span>');write('sections/lumina-header.liquid',header);
console.log('Applied production polish: native editor selection, safe unpriced display, colors, spacing, headings and real review counts.');
