const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const out = path.resolve(__dirname,'../.local');
fs.mkdirSync(out,{recursive:true});
const preview='https://lumina-10621.myshopify.com/?preview_theme_id=157534552221';
async function main(){
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 const page=await context.newPage();page.setDefaultTimeout(15000);const errors=[];page.on('pageerror',error=>errors.push(error.message));
 const response=await page.goto(preview,{waitUntil:'networkidle',timeout:90000});
 await page.screenshot({path:path.join(out,'home-desktop.png')});
 const report={home:{status:response.status(),url:page.url(),title:await page.title(),headings:await page.locator('h1').allTextContents(),liquidErrors:await page.getByText(/Liquid (error|syntax error)/).count()}};
 report.home.metrics=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,brokenImages:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.getAttribute('src')),font:getComputedStyle(document.body).fontFamily,css:[...document.styleSheets].map(s=>s.href)}));
 await page.locator('#faq summary').first().click();report.faq=await page.locator('#faq details').first().getAttribute('open')!==null;
 await page.locator('[data-faq-more]').click();report.faqExpanded=await page.locator('[data-extra-faq]:visible').count();
 await page.locator('[data-cart-open]').click();report.cartOpens=await page.locator('#LuminaCart').evaluate(el=>el.open);await page.locator('#LuminaCart [data-dialog-close]').click();
 await page.setViewportSize({width:390,height:844});await page.goto(preview,{waitUntil:'networkidle',timeout:90000});
 await page.screenshot({path:path.join(out,'home-mobile.png')});
 await page.locator('[data-menu-toggle]').click();report.mobileMenu=await page.locator('#LuminaMobileMenu').isVisible();await page.locator('[data-menu-toggle]').click();
 report.mobileOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
 const productUrl='https://lumina-10621.myshopify.com/products/honeycomb-blackout-blind?preview_theme_id=157534552221';
 const productResponse=await page.goto(productUrl,{waitUntil:'networkidle',timeout:90000});
 report.product={status:productResponse.status(),url:page.url(),headings:await page.locator('h1').allTextContents(),liquidErrors:await page.getByText(/Liquid (error|syntax error)/).count(),overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)};
 await page.screenshot({path:path.join(out,'product-mobile.png')});
 if(await page.locator('[data-media-index]').count()){
 await page.locator('[data-media-step="1"]').click();report.gallery=await page.locator('[data-media-index="1"]').isVisible();
 await page.locator('[data-native-zoom]').click();report.lightbox=await page.locator('#LuminaGallery').evaluate(el=>el.open);await page.keyboard.press('Escape');
 }
 if(await page.locator('[data-swatch]').count()){
 await page.locator('[data-swatch="Graphite"]').first().click();report.swatch=await page.locator('[data-swatch="Graphite"]').first().getAttribute('aria-pressed');
 await page.locator('[data-unit="cm"]').click();report.centimeters=await page.locator('[data-dimension-unit]').first().textContent();
 report.buyDisabled=await page.locator('[data-add-to-cart]').isDisabled()&&await page.locator('[data-buy-now]').isDisabled();
 await page.locator('[data-dialog-open="LuminaFitPromise"]').click();report.fitPromise=await page.locator('#LuminaFitPromise').evaluate(el=>el.open);await page.keyboard.press('Escape');
 }
 await page.setViewportSize({width:1440,height:1000});await page.goto(productUrl,{waitUntil:'networkidle',timeout:90000});await page.screenshot({path:path.join(out,'product-desktop.png')});
 report.judgeme=await page.evaluate(()=>({widgets:document.querySelectorAll('.jdgm-widget').length,reviewChildren:document.querySelector('#judgeme_product_reviews')?.children.length||0,scripts:[...document.scripts].map(s=>s.src).filter(s=>/judge|jdgm/i.test(s)),defined:typeof window.jdgm!=='undefined',sampleText:document.body.innerText.includes('Design preview — sample reviews')}));
 report.product.brokenImages=await page.evaluate(()=>[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.getAttribute('src')));
 const policy=await page.goto('https://lumina-10621.myshopify.com/?preview_theme_id=157534552221&view=shipping-policy',{waitUntil:'networkidle',timeout:90000});report.policy={status:policy.status(),heading:await page.locator('h1').allTextContents()};
 report.errors=errors;fs.writeFileSync(path.join(out,'verification.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));await browser.close();
}
main().catch(error=>{console.error(error.message);process.exit(1);});
