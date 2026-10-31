const {chromium}=require('playwright');
const fs=require('node:fs');
(async()=>{
 const b=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const p=await b.newPage({viewport:{width:1440,height:1000}});
 const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.addInitScript(()=>{window.luminaPriceEvents=[];document.addEventListener('options:price',e=>window.luminaPriceEvents.push(e.detail));});
 await p.goto('https://orders.luminablackoutblinds.com/products/honeycomb-blackout-blind?preview_theme_id=157534552221',{waitUntil:'networkidle'});
 await p.locator('[data-option="size_in"] input[type=text]').first().waitFor();
 const report={};
 async function size(option,w,h){const input=p.locator(`[data-option="${option}"] input[type=text]`);await input.nth(0).fill(String(w));await input.nth(1).fill(String(h));await input.nth(1).blur();await p.waitForTimeout(800);return p.evaluate(()=>({events:window.luminaPriceEvents.slice(-2),properties:[...document.querySelectorAll('.cl-po--options input')].filter(x=>x.type==='hidden'||x.checked).map(x=>({name:x.name,value:x.value}))}));}
 report.inches=await size('size_in',24,36);
 await p.locator('[data-option="opening_direction"] label').filter({hasText:'Split'}).click();await p.waitForTimeout(600);report.split=await p.evaluate(()=>window.luminaPriceEvents.slice(-1));
 await p.locator('[data-option="units"] label').filter({hasText:'Centimeters'}).click();report.cm=await size('size_cm',60.96,91.44);
 report.purchaseLocked=await p.locator('.lumina-product-purchase [data-add-to-cart]').isDisabled();report.errors=errors;
 report.formulaPricingPassed=report.inches.events.at(-1)?.price===20571&&report.split.at(-1)?.price===24071&&report.cm.events.at(-1)?.price===24071;
 fs.writeFileSync('shopify/.local/lpo/verification.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
 await p.screenshot({path:'shopify/.local/lpo/configured-desktop.png',fullPage:true});await b.close();
 if(!report.formulaPricingPassed)throw new Error('LPO dimension pricing is not active or does not match the matrix. Keep purchasing disabled.');
})().catch(e=>{console.error(e);process.exit(1)});
