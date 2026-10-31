const {chromium}=require('playwright');
const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('https://orders.luminablackoutblinds.com/products/honeycomb-blackout-blind?preview_theme_id=157534552221',{waitUntil:'networkidle'});
 await page.waitForTimeout(2500);
 console.log(await page.locator('[data-lumina-product]').innerText());
 console.log('LPO',await page.locator('.cl-po--options').count(),'errors',errors);
 fs.writeFileSync('shopify/.local/lpo/storefront.html',await page.content());
 await page.screenshot({path:'shopify/.local/lpo/product-desktop.png',fullPage:true});
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
