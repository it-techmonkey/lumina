if (!process.argv.includes('--run-historical-migration')) throw new Error('Historical migration disabled. Edit shopify/theme directly; run build-css.cjs to rebuild styles.');
/* One-time migration to editable native sections. Run after build-theme.cjs only
 * when recreating the initial theme; Liquid files are authoritative afterwards. */
const fs=require('node:fs');const path=require('node:path');const cheerio=require('cheerio');
const base=path.resolve(__dirname,'../theme');
const read=file=>fs.readFileSync(path.join(base,file),'utf8');
const write=(file,data)=>fs.writeFileSync(path.join(base,file),data);
const presets={};
function loadSection(id){const [markup,tail]=read(`sections/${id}.liquid`).split('{% schema %}');return{markup,schema:JSON.parse(tail.split('{% endschema %}')[0])};}
function saveSection(id,markup,schema){write(`sections/${id}.liquid`,markup+'\n{% schema %}\n'+JSON.stringify(schema,null,2)+'\n{% endschema %}\n');}
function maskedDom(html){const tokens=[];const protect=s=>s.replace(/{[{%][\s\S]*?[%}]}/g,value=>{tokens.push(value);return `LUMINALIQTOKEN${tokens.length-1}END`;});const $=cheerio.load(protect(html),{xml:{xmlMode:false,decodeEntities:true}},false);return{$,protect,restore:s=>s.replace(/LUMINALIQTOKEN(\d+)END(?:="")?/gi,(_,i)=>tokens[Number(i)])};}
function editContent(html,scope='section',existing=[]){
 const { $,protect,restore }=maskedDom(html);const settings=[...existing],values={};let index=0;
 const add=(type,label,value,extra={})=>{const id='content_'+index++;settings.push({type,id,label,...(value?{default:value}:{}),...extra});if(value)values[id]=value;return `${scope}.settings.${id}`;};
 // Individual textual leaves preserve the original design's spans and emphasis.
 function visit(node){if(node.type==='text'){const value=node.data.trim();if(!value||value.includes('LUMINALIQTOKEN')||!/[a-zA-Z0-9]/.test(value))return;const parent=node.parent;if(['script','style','svg','title','option'].includes(parent?.name)||$(parent).closest('svg,script,style').length)return;const label=(parent?.name?.match(/^h[1-6]$/)?'Heading: ':'Text: ')+value.slice(0,45);const ref=add(value.length>100?'textarea':'text',label,value);node.data=node.data.replace(value,protect(`{{ ${ref} | escape }}`));}else if(node.children)for(const child of [...node.children])visit(child);}
 for(const child of $.root().contents().toArray())visit(child);
 $('img').each((_,el)=>{const img=$(el),original=restore(img.attr('src')||'');const ref=add('image_picker','Image',null);const alt=img.attr('alt')||'';const altRef=add('text','Image description',alt);const fallback=original.startsWith('{{')?original.slice(2,-2).trim():`'${original}'`;
 img.attr('src',protect(`{% if ${ref} != blank %}{{ ${ref} | image_url: width: 2000 }}{% else %}{{ ${fallback} }}{% endif %}`)).attr('alt',protect(`{{ ${altRef} | escape }}`));
 });
 $('video').each((_,el)=>{const video=$(el);const ref=add('video','Video',null);const cls=video.attr('class')||'';video.before(protect(`{% if ${ref} != blank %}{{ ${ref} | video_tag: autoplay: true, loop: true, muted: true, controls: true, class: '${cls}' }}{% else %}`));video.after(protect('{% endif %}'));});
 $('a').each((_,el)=>{const a=$(el),url=restore(a.attr('href')||'');if(!url)return;const ref=add('url','Link destination',null);a.attr('href',protect(`{% if ${ref} != blank %}{{ ${ref} }}{% else %}${url}{% endif %}`));});
 return{html:restore($.html()),settings,values};
}
function convert(id,groups=[]){
 const source=loadSection(id);const { $,protect,restore }=maskedDom(source.markup);const schemas=[],blocks={},order=[],slots=[];let count=0;
 for(const group of groups){const nodes=group.select($);if(!nodes.length)continue;const templates=[];
 nodes.each((i,el)=>{const raw=restore($.html(el));const edited=editContent(raw,'block');const type=group.type+'_'+i;const blockId='block'+count++;const title=($(el).find('h3').first().text()||$(el).text()).trim().slice(0,24)||group.name;schemas.push({type,name:title,settings:edited.settings});blocks[blockId]={type,settings:edited.values};order.push(blockId);const fragment=maskedDom(edited.html);fragment.$.root().children().first().attr('data-native-block','');let html=fragment.restore(fragment.$.html()).replace('data-native-block=""','{{ block.shopify_attributes }}');templates.push(`{% when '${type}' %}${html}`);});
 slots.push(`{% for block in section.blocks %}{% case block.type %}${templates.join('')}{% endcase %}{% endfor %}`);nodes.first().before(`<template data-block-slot="${slots.length-1}"></template>`);nodes.remove();
 }
 const edited=editContent(restore($.html()),'section',source.schema.settings);
 const schema={...source.schema,settings:edited.settings,...(schemas.length?{blocks:schemas}:{}),presets:[{name:source.schema.name,...(schemas.length?{blocks:order.map(key=>blocks[key])}:{})}]};
 // Section-specific spacing and colors can be changed without touching global store settings.
 schema.settings.push({type:'header',content:'Layout'},{type:'range',id:'spacing_top',label:'Extra top spacing',min:0,max:120,step:4,unit:'px',default:0},{type:'range',id:'spacing_bottom',label:'Extra bottom spacing',min:0,max:120,step:4,unit:'px',default:0});
 const final=edited.html.replace(/<template data-block-slot="(\d+)"><\/template>/g,(_,i)=>slots[Number(i)]);
 saveSection(id,`<div style="padding-top:{{ section.settings.spacing_top }}px;padding-bottom:{{ section.settings.spacing_bottom }}px">${final}</div>`,schema);
 presets[id]={blocks,block_order:order};
}
const gridCards=($)=>$('.grid').filter((_,el)=>$(el).children().length>=3&&$(el).children().toArray().every(c=>$(c).find('h3').length===1)).first().children();
convert('lumina-hero');
convert('lumina-quick-answers',[{type:'fact',name:'Fact',select:$=>$.root().children().first().children().first().children()}]);
convert('lumina-value-props',[{type:'benefit',name:'Benefit',select:gridCards}]);
convert('lumina-comparison',[{type:'comparison',name:'Comparison row',select:$=>$('tbody').children('tr')}]);
convert('lumina-our-story',[{type:'statistic',name:'Statistic',select:$=>$('.grid.grid-cols-2').children()}]);
convert('lumina-measuring',[{type:'step',name:'Measuring step',select:$=>$('h3').map((_,el)=>$(el).parent().parent()[0])}]);
convert('lumina-installation',[{type:'step',name:'Installation step',select:gridCards}]);
convert('lumina-key-features',[{type:'feature',name:'Feature',select:gridCards}]);
convert('lumina-product-features',[{type:'benefit',name:'Benefit',select:gridCards}]);
convert('lumina-why-lumina',[{type:'benefit',name:'Benefit',select:gridCards}]);
for(const id of ['privacy-policy','terms-of-service','shipping-policy','returns-refunds-policy'])convert('lumina-'+id,[{type:'policy',name:'Policy section',select:$=>$('h2').parent()}]);
// Populate JSON templates with the original content as the initial native blocks.
for(const name of fs.readdirSync(path.join(base,'templates')).filter(x=>x.endsWith('.json'))){const data=JSON.parse(read('templates/'+name));for(const section of Object.values(data.sections||{})){const preset=presets[section.type];if(preset?.block_order.length)Object.assign(section,preset);}write('templates/'+name,JSON.stringify(data,null,2)+'\n');}
// Header navigation is a theme-local block list, with an optional Shopify menu.
{
 const source=loadSection('lumina-header');const {$,protect,restore}=maskedDom(source.markup);
 const initial=[];$('nav').first().find('a').each((i,el)=>initial.push({type:'link',settings:{label:$(el).text(),destination:i===0?'product':i===1?'measuring':i===2?'fitting':i===3?'reviews':'faq'}}));
 const render=`{% if section.settings.menu != blank %}{% for link in section.settings.menu.links %}<a class="lumina-nav-link" href="{{ link.url }}">{{ link.title | escape }}</a>{% if link.links.size > 0 %}<details class="lumina-submenu"><summary aria-label="More {{ link.title | escape }} links">⌄</summary><div>{% for child in link.links %}<a href="{{ child.url }}">{{ child.title | escape }}</a>{% endfor %}</div></details>{% endif %}{% endfor %}{% else %}{% for block in section.blocks %}<a class="lumina-nav-link" href="{% render 'lumina-link', destination: block.settings.destination, custom_url: block.settings.url %}" {{ block.shopify_attributes }}>{{ block.settings.label | escape }}</a>{% endfor %}{% endif %}`;
 $('nav').first().html(protect(render));$('#LuminaMobileMenu nav>div').html(protect(render));
 $('a[aria-label="Home"]').html(protect(`{% if section.settings.logo %}{{ section.settings.logo | image_url: width: 360 | image_tag: class: 'lumina-logo', width: section.settings.logo_width, loading: 'eager' }}{% else %}<span class="font-playfair text-white text-[20px]">{{ section.settings.brand | escape }}</span>{% endif %}`));
 const linkSettings=[{type:'text',id:'label',label:'Label',default:'Link'},{type:'select',id:'destination',label:'Destination',options:[{value:'product',label:'Featured product'},{value:'measuring',label:'Measuring guide'},{value:'fitting',label:'Fitting guide'},{value:'reviews',label:'Reviews'},{value:'faq',label:'FAQ'},{value:'custom',label:'Custom URL'}],default:'custom'},{type:'url',id:'url',label:'Custom URL'}];
 source.schema.settings=[{type:'text',id:'brand',label:'Brand name',default:'Lumina'},{type:'image_picker',id:'logo',label:'Logo'},{type:'range',id:'logo_width',label:'Logo width',min:60,max:240,step:10,default:120},{type:'link_list',id:'menu',label:'Shopify navigation menu',info:'Leave blank to use the theme-local link blocks below.'}];source.schema.blocks=[{type:'link',name:'Navigation link',settings:linkSettings}];source.schema.presets=[{name:'Header',blocks:initial}];saveSection('lumina-header',restore($.html()),source.schema);
 const group=JSON.parse(read('sections/header-group.json'));group.sections.header.blocks=Object.fromEntries(initial.map((b,i)=>['link'+i,b]));group.sections.header.block_order=initial.map((_,i)=>'link'+i);write('sections/header-group.json',JSON.stringify(group,null,2));
}
// Footer, newsletter and FAQ supporting copy are editable as well.
for(const id of ['lumina-footer','lumina-newsletter','lumina-faq']){
 const source=loadSection(id);const edited=editContent(source.markup,'section',source.schema.settings);saveSection(id,edited.html,{...source.schema,settings:edited.settings});
}
console.log('Converted content, media, links and repeated cards into native Shopify editor settings and blocks.');
