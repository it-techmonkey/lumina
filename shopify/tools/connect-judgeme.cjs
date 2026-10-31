if (!process.argv.includes('--run-historical-migration')) throw new Error('Historical migration disabled. Edit shopify/theme directly; run build-css.cjs to rebuild styles.');
const fs=require('node:fs');const path=require('node:path');const base=path.resolve(__dirname,'../theme');
const configPath=path.join(base,'config/settings_data.json');const data=JSON.parse(fs.readFileSync(configPath,'utf8'));
data.current.judgeme_legacy_loader=false;
data.current.blocks={...data.current.blocks,lumina_judgeme_core:{type:'shopify://apps/judge-me-reviews/blocks/judgeme_core/61ccd3b1-a9f2-4160-9fe9-4fec8413e5d8',disabled:false,settings:{}}};
fs.writeFileSync(configPath,JSON.stringify(data,null,2));
const templatePath=path.join(base,'templates/product.json');const template=JSON.parse(fs.readFileSync(templatePath,'utf8'));template.sections.reviews.blocks={judgeme_widget:{type:'shopify://apps/judge-me-reviews/blocks/review_widget/61ccd3b1-a9f2-4160-9fe9-4fec8413e5d8',settings:{}}};template.sections.reviews.block_order=['judgeme_widget'];fs.writeFileSync(templatePath,JSON.stringify(template,null,2));
console.log('Enabled Judge.me native app embed and product review app block in this theme only.');
