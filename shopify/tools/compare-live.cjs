const {chromium}=require('playwright');
const fs=require('node:fs');const path=require('node:path');
const out=path.resolve(__dirname,'../.local/fidelity');fs.mkdirSync(out,{recursive:true});
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const report={};
 for(const site of ['original','draft']){
  const context=await browser.newContext({reducedMotion:'reduce'});
  await context.addInitScript(()=>{localStorage.setItem('discountModalDismissedAt',String(Date.now()));sessionStorage.setItem('lumina-popup-dismissed','1');});
  for(const width of [1440,390]){
   const page=await context.newPage();await page.setViewportSize({width,height:1000});
   await page.goto(site==='original'?'https://www.luminablackoutblinds.com/':'https://orders.luminablackoutblinds.com/?preview_theme_id=157534552221',{waitUntil:'networkidle'});
   await page.evaluate(async()=>{await document.fonts.ready;document.querySelectorAll('video').forEach(v=>v.pause());});
   await page.addStyleTag({content:'#preview-bar-iframe, #PBarNextFrameWrapper{display:none!important}'});
   await page.screenshot({path:path.join(out,`${site}-${width}.png`),fullPage:true});
   report[`${site}-${width}`]=await page.evaluate(()=>({sections:[...document.querySelectorAll('main section')].map(el=>({id:el.id,heading:el.querySelector('h1,h2')?.textContent,top:Math.round(el.getBoundingClientRect().top+scrollY),height:Math.round(el.getBoundingClientRect().height),width:Math.round(el.getBoundingClientRect().width)})),headings:[...document.querySelectorAll('h1,h2')].map(el=>({text:el.textContent,font:getComputedStyle(el).fontFamily,size:getComputedStyle(el).fontSize,lineHeight:getComputedStyle(el).lineHeight,weight:getComputedStyle(el).fontWeight})),fonts:[...document.fonts].map(f=>({family:f.family,weight:f.weight,status:f.status}))}));
   await page.close();
  }
  await context.close();
 }
 const ctx=await browser.newContext({viewport:{width:1440,height:1000}});const page=await ctx.newPage();await page.goto('https://www.luminablackoutblinds.com/',{waitUntil:'networkidle'});await page.getByRole('dialog',{name:'Get 10% off your first order'}).waitFor();await page.screenshot({path:path.join(out,'original-popup-desktop.png')});await page.setViewportSize({width:390,height:844});await page.screenshot({path:path.join(out,'original-popup-mobile.png')});
 fs.writeFileSync(path.join(out,'comparison.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(Object.fromEntries(Object.entries(report).map(([key,value])=>[key,value.sections])),null,2));await browser.close();
})().catch(e=>{console.error(e.message);process.exit(1)});
