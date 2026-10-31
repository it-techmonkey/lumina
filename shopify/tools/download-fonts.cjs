const fs = require('node:fs');
const path = require('node:path');
async function main() {
  const response = await fetch('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Manrope:wght@300;400;500;600;700;800&display=swap', {headers:{'User-Agent':'Mozilla/5.0 AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36'}});
  if (!response.ok) throw new Error('Unable to fetch font styles.');
  let css = await response.text();
  const assets = path.resolve(__dirname,'../theme/assets');
  const urls = [...new Set([...css.matchAll(/url\((https:[^)]+)\)/g)].map(match=>match[1]))];
  for (let i=0;i<urls.length;i++) {
    const response=await fetch(urls[i]);if(!response.ok)throw new Error('Unable to download font');
    const name=`lumina-font-${i}.woff2`;fs.writeFileSync(path.join(assets,name),Buffer.from(await response.arrayBuffer()));css=css.replaceAll(urls[i],name);
  }
  fs.writeFileSync(path.join(assets,'lumina-fonts.css'),css);
  console.log(`Stored ${urls.length} font files for Shopify CDN delivery.`);
}
main().catch(error=>{console.error(error.message);process.exitCode=1;});
