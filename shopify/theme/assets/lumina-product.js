(() => {
  'use strict';
  const cleanups = new Map();
  const money = (cents, currency) => new Intl.NumberFormat(document.documentElement.lang || 'en-US', {style:'currency',currency}).format(cents / 100);
  function updatePrice(section, amount, configured = false) {
    const price = section.querySelector('[data-product-price]');
    if (!price) return;
    const minimum = Number(price.dataset.minimumPrice || 0);
    const valid = Number.isFinite(amount) && amount >= minimum && amount > 0;
    const total = valid ? amount : minimum;
    const currency = JSON.parse(section.querySelector('[data-product-currency]').textContent) || 'USD';
    const percent = Number(section.querySelector('[data-price-block]')?.dataset.offerPercent || 0);
    const compare = percent > 0 && percent < 100 ? Math.round((total / 100 / (1 - percent / 100)) * 100) : 0;
    price.replaceChildren();
    if (!configured || !valid) {
      const prefix = document.createElement('span'); prefix.className = 'lumina-price-from'; prefix.textContent = price.dataset.fromLabel || '';
      price.append(prefix, ' ');
    }
    price.append(total > 0 ? money(total, currency) : price.dataset.unpricedLabel);
    section.querySelectorAll('[data-compare-price],[data-sticky-compare]').forEach(el => {el.hidden = compare <= total;el.textContent = money(compare,currency);});
    section.querySelectorAll('[data-discount-percent],[data-sticky-discount]').forEach(el => {el.hidden = compare <= total;el.textContent = percent + '% off';});
    section.querySelectorAll('[data-product-saving]').forEach(el => el.textContent = money(Math.round((compare-total)/100)*100,currency));
    section.querySelectorAll('[data-sticky-price]').forEach(el => el.textContent = money(total,currency));
    section.dataset.lpoPriceValid = String(configured && valid);
  }
  function init(section) {
    if (cleanups.has(section)) return;
    const price = section.querySelector('[data-product-price]');
    if (price) updatePrice(section,Number(price.dataset.minimumPrice));
    section.querySelectorAll('[data-delivery-range]').forEach(el => {
      const min=Number(el.dataset.daysMin),max=Number(el.dataset.daysMax);
      if (!(min>0 && max>=min)) return;
      const start=new Date(),end=new Date();start.setDate(start.getDate()+min);end.setDate(end.getDate()+max);
      const format = d => d.toLocaleDateString(document.documentElement.lang || 'en-US',{month:'short',day:'numeric'});
      el.textContent=`Delivered by ${format(start)} – ${format(end)}`;
    });
    const sticky=section.querySelector('[data-sticky-purchase]');
    const button=section.querySelector('.lumina-product-purchase [data-add-to-cart]');
    let observer;
    if(sticky && button){observer=new IntersectionObserver(([entry])=>{sticky.hidden=entry.isIntersecting;},{threshold:0});observer.observe(button);}
    cleanups.set(section,()=>observer?.disconnect());
  }
  function initAll(scope=document){scope.querySelectorAll('[data-lumina-product]').forEach(init);}
  document.addEventListener('options:price',event=>{
    const section=event.target.closest?.('[data-lumina-product]')||document.querySelector('[data-lumina-product]');
    if(section)updatePrice(section,Number(event.detail?.price),true);
  });
  // LPO patches its own labels on render. Add the guide again only when absent.
  function addOptionGuide(){document.querySelectorAll('[data-lumina-product] [data-option="size_in"],[data-lumina-product] [data-option="size_cm"]').forEach(option=>{
    const ranges=option.dataset.option==='size_in'?['10–138','10–79']:['25.4–350.52','25.4–200.66'];
    option.querySelectorAll('input[type="text"]').forEach((input,index)=>{input.inputMode='decimal';input.placeholder=ranges[index]||'';});
  });document.querySelectorAll('[data-lumina-product] [data-option="opening_direction"] .cl-po--label').forEach(label=>{
    if(label.querySelector('[data-dialog-open]'))return;
    const button=document.createElement('button');button.type='button';button.className='lumina-direction-help';button.dataset.dialogOpen='LuminaDirection';button.setAttribute('aria-label','Learn about opening directions');button.textContent='?';label.append(button);
  });}
  window.addEventListener('options:rendered',addOptionGuide);
  document.addEventListener('shopify:section:load',event=>{initAll(event.target);addOptionGuide();});
  document.addEventListener('shopify:section:unload',event=>{event.target.querySelectorAll('[data-lumina-product]').forEach(section=>{cleanups.get(section)?.();cleanups.delete(section);});});
  initAll();addOptionGuide();
})();
