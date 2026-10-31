(() => {
  'use strict';
  const root = document.body.dataset.rootUrl || '/';
  const purchasing = document.body.dataset.purchasing === 'true';
  const money = (amount, currency = 'USD') => new Intl.NumberFormat(document.documentElement.lang || 'en-US', { style: 'currency', currency }).format(amount / 100);
  let lastFocus;
  let lightboxImages=[],lightboxIndex=0;
  function showMedia(gallery,index){const slides=[...gallery.querySelectorAll('[data-media-index]')];if(!slides.length)return;index=(index+slides.length)%slides.length;gallery.dataset.activeIndex=index;slides.forEach((slide,i)=>{slide.hidden=i!==index;if(i!==index)slide.querySelectorAll('video').forEach(video=>video.pause());});gallery.querySelectorAll('[data-media-thumb]').forEach((button,i)=>button.setAttribute('aria-pressed',String(Number(button.dataset.mediaThumb)===index)));}
  function showLightbox(images,index=0){lightboxImages=images;lightboxIndex=(index+images.length)%images.length;const image=document.querySelector('[data-lightbox-image]');image.src=images[lightboxIndex];image.alt=`Lumina image ${lightboxIndex+1}`;document.querySelectorAll('[data-lightbox-step]').forEach(button=>button.hidden=images.length<2);openDialog('LuminaGallery');}
  function openDialog(id) {
    const dialog = document.getElementById(id);
    if (!dialog || dialog.open) return;
    lastFocus = document.activeElement;
    dialog.showModal();
    document.body.classList.add('dialog-open');
  }
  function bindDialogs(scope=document){scope.querySelectorAll('dialog:not([data-dialog-bound])').forEach(dialog=>{dialog.dataset.dialogBound='true';dialog.addEventListener('close',()=>{if(!document.querySelector('dialog[open]'))document.body.classList.remove('dialog-open');if(lastFocus?.isConnected)lastFocus.focus();});dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});});}
  bindDialogs();
  function showGallery(gallery, index) {
    const thumbs = [...gallery.querySelectorAll('[data-gallery-index]')];
    if (!thumbs.length) return;
    const images=JSON.parse(gallery.querySelector('[data-gallery-images]').textContent);
    index = (index + images.length) % images.length;
    gallery.dataset.activeIndex = index;
    const main = gallery.querySelector('[data-gallery-main]');
    main.src = images[index]; main.alt = `Lumina blackout blind image ${index+1}`;
    thumbs.forEach((button,i) => button.setAttribute('aria-pressed',String(i===index)));
    gallery.querySelectorAll('[data-gallery-dot]').forEach((dot,i)=>{dot.style.width=i===index?'32px':'6px';dot.style.background=i===index?'#131720':'#1317204d';});
  }
  function node(tag, className, text) { const el = document.createElement(tag); if(className)el.className=className; if(text!==undefined)el.textContent=text; return el; }
  async function refreshCart() {
    const target = document.querySelector('[data-cart-content]');
    try {
      const response = await fetch(root+'cart.js', {headers:{Accept:'application/json'}});
      if(!response.ok)throw new Error('Unable to load your cart. Please try again.');
      const cart = await response.json();
      document.querySelectorAll('[data-cart-count]').forEach(el=>{el.textContent=cart.item_count || '';});
      if(!target)return;
      target.replaceChildren();
      if(!cart.items.length){const empty=node('div','lumina-cart-empty');empty.append(node('h3','','Your cart is empty'),node('p','text-sm text-[#657186] mb-6','A better night’s sleep starts here.'));const link=node('a','lumina-button','Shop The Blind');link.href=root+'products/honeycomb-blackout-blind';empty.append(link);target.append(empty);return;}
      cart.items.forEach(item=>{
        const row=node('article','lumina-cart-item');
        if(item.image){const image=node('img');image.src=item.image;image.alt=item.product_title;row.append(image);}
        const info=node('div');info.append(node('h3','',item.product_title),node('p','',money(item.final_line_price,cart.currency)));
        Object.entries(item.properties||{}).filter(([key,value])=>!key.startsWith('_')&&value).forEach(([key,value])=>info.append(node('p','',`${key}: ${value}`)));
        const quantity=node('div','lumina-cart-quantity');
        for(const delta of [-1,1]){const button=node('button','',delta===-1?'−':'+');button.type='button';button.setAttribute('aria-label',`${delta===-1?'Decrease':'Increase'} quantity of ${item.product_title}`);button.dataset.cartKey=item.key;button.dataset.cartQuantity=item.quantity+delta;quantity.append(button);if(delta===-1)quantity.append(node('span','',String(item.quantity)));}
        info.append(quantity);row.append(info);target.append(row);
      });
      const totals=node('div','lumina-cart-totals');totals.append(node('span','','Subtotal'),node('strong','',money(cart.total_price,cart.currency)));target.append(totals);
      const checkout=node('button','lumina-button lumina-cart-checkout','Checkout');checkout.type='button';checkout.disabled=!purchasing;checkout.addEventListener('click',()=>{if(purchasing)location.href=root+'checkout';});target.append(checkout);
      const link=node('a','block text-center underline mt-4 text-sm','View cart');link.href=root+'cart';target.append(link);
    } catch(error){ if(target)target.replaceChildren(node('p','',error.message)); }
  }
  document.addEventListener('click', async event => {
    const target=event.target.closest('button,a');if(!target)return;
    if(target.matches('[data-all-reviews],[data-open-review-form]')){
      const section=target.closest('.lumina-judgeme-section');const panel=section.querySelector('[data-native-review-panel]');
      section.querySelector('[data-review-preview]').hidden=true;panel.hidden=false;panel.focus({preventScroll:true});
      if(target.matches('[data-open-review-form]')){
        const open=()=>{const button=panel.querySelector('.jm-review-widget__write-review,.jm-review-widget-header__write-review,.jdgm-write-rev-link')||[...panel.querySelectorAll('button')].find(el=>/write a review/i.test(el.textContent));if(button){button.click();return true;}return false;};
        if(!open()){const observer=new MutationObserver(()=>{if(open())observer.disconnect();});observer.observe(panel,{childList:true,subtree:true});setTimeout(()=>observer.disconnect(),10000);}
      }
    }
    if(target.matches('[data-menu-toggle]')){const menu=document.getElementById(target.getAttribute('aria-controls'));menu.hidden=!menu.hidden;target.setAttribute('aria-expanded',String(!menu.hidden));}
    if(target.matches('[data-media-thumb]')){const gallery=target.closest('[data-gallery]');showMedia(gallery,Number(target.dataset.mediaThumb));if(target.hasAttribute('data-gallery-more'))showLightbox([...gallery.querySelectorAll('[data-media-index] img')].map(img=>img.currentSrc||img.src),Number(target.dataset.mediaThumb));}
    if(target.matches('[data-media-step]')){const gallery=target.closest('[data-gallery]');showMedia(gallery,Number(gallery.dataset.activeIndex||0)+Number(target.dataset.mediaStep));}
    if(target.matches('[data-native-zoom]')){const gallery=target.closest('[data-gallery]');const current=gallery.querySelector('[data-media-index]:not([hidden]) img');const images=[...gallery.querySelectorAll('[data-media-index] img')].map(image=>image.currentSrc||image.src);if(current)showLightbox(images,images.indexOf(current.currentSrc||current.src));}
    if(target.closest('#LuminaMobileMenu')&&target.tagName==='A'){document.getElementById('LuminaMobileMenu').hidden=true;document.querySelector('[data-menu-toggle]')?.setAttribute('aria-expanded','false');}
    if(target.matches('[data-dialog-close]'))target.closest('dialog').close();
    if(target.matches('[data-gallery-index]'))showGallery(target.closest('[data-gallery]'),Number(target.dataset.galleryIndex));
    if(target.matches('[data-gallery-step]')){const gallery=target.closest('[data-gallery]');showGallery(gallery,Number(gallery.dataset.activeIndex||0)+Number(target.dataset.galleryStep));}
    if(target.matches('[data-dialog-open]')){if(target.dataset.dialogOpen==='LuminaGallery'){const gallery=target.closest('[data-gallery]');showLightbox(JSON.parse(gallery.querySelector('[data-gallery-images]').textContent),Number(gallery.dataset.activeIndex||0));}else openDialog(target.dataset.dialogOpen);}
    if(target.matches('[data-review-image]')){const images=[...new Set([...target.closest('section').querySelectorAll('[data-review-image]')].map(el=>el.dataset.reviewImage))];showLightbox(images,images.indexOf(target.dataset.reviewImage));}
    if(target.matches('[data-lightbox-step]'))showLightbox(lightboxImages,lightboxIndex+Number(target.dataset.lightboxStep));
    if(target.matches('[data-swatch],[data-direction]')){const siblings=target.parentElement.querySelectorAll('button');siblings.forEach(button=>button.setAttribute('aria-pressed',String(button===target)));const label=target.parentElement.previousElementSibling;if(label){let selected=label.querySelector('[data-selected-label]');if(!selected){selected=node('span','text-[#657186]');selected.dataset.selectedLabel='';label.append(selected);}selected.textContent=target.dataset.swatch||target.dataset.direction;}}
    if(target.matches('[data-unit]')){const options=target.closest('[data-design-options]');const unit=target.dataset.unit;options.querySelectorAll('[data-unit]').forEach(button=>button.setAttribute('aria-pressed',String(button===target)));options.querySelectorAll('[data-dimension-unit]').forEach(label=>label.textContent=unit==='in'?'Inches':'Centimeters');options.querySelectorAll('input[type=number]').forEach(input=>{input.value='';input.placeholder=unit==='in'?'Inches':'Centimeters';input.removeAttribute('min');input.removeAttribute('max');});options.querySelectorAll('select').forEach(select=>{select.replaceChildren();const values=unit==='in'?['0','1/16','1/8','3/16','1/4','5/16','3/8','7/16','1/2','9/16','5/8','11/16','3/4','13/16','7/8','15/16']:Array.from({length:10},(_,i)=>String(i));values.forEach(value=>{const option=node('option','',unit==='in'?value:value+' mm');option.value=value;select.append(option);});const label=select.previousElementSibling;if(label)label.textContent=unit==='in'?'Sixteenths':'Millimeters';});}
    if(target.matches('[data-faq-more]')){const section=target.closest('section');const extra=section.querySelectorAll('[data-extra-faq]');const expand=extra[0]?.hidden;extra.forEach(el=>el.hidden=!expand);target.textContent=expand?'View less':'View more';}
    if(target.matches('[data-copy-code]')){try{await navigator.clipboard.writeText(target.dataset.copyCode);const before=target.innerHTML;target.textContent='Copied';setTimeout(()=>target.innerHTML=before,1800);}catch{target.title=target.dataset.copyCode;}}
    if(target.matches('[data-cart-open]')){openDialog('LuminaCart');refreshCart();}
    if(target.matches('[data-cart-key]')){document.querySelector('[data-cart-error]').textContent='';target.disabled=true;try{const response=await fetch(root+'cart/change.js',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:target.dataset.cartKey,quantity:Number(target.dataset.cartQuantity)})});if(!response.ok)throw new Error('Unable to update this item.');await refreshCart();}catch(error){document.querySelector('[data-cart-error]').textContent=error.message;target.disabled=false;}}
  });
  document.addEventListener('keydown',event=>{if(event.key==='Escape'){const menu=document.getElementById('LuminaMobileMenu');if(menu){menu.hidden=true;document.querySelector('[data-menu-toggle]')?.setAttribute('aria-expanded','false');}}});
  document.addEventListener('submit',event=>{
    if(!event.target.matches('.lumina-native-product-form'))return;
    const section=event.target.closest('[data-lumina-product]');
    if(!purchasing||section.dataset.canPurchase!=='true'){event.preventDefault();return;}
    let redirect=event.target.querySelector('input[name=return_to]');
    if(event.submitter?.matches('[data-buy-now]')){if(!redirect){redirect=node('input');redirect.type='hidden';redirect.name='return_to';event.target.append(redirect);}redirect.value=root+'checkout';}else redirect?.remove();
  });
  document.addEventListener('change',event=>{
    if(!event.target.matches('[data-variant-selector]'))return;
    const section=event.target.closest('[data-lumina-product]');
    const variants=JSON.parse(section.querySelector('[data-product-variants]').textContent);
    const variant=variants.find(v=>String(v.id)===event.target.value);if(!variant)return;
    const currency=JSON.parse(section.querySelector('[data-product-currency]').textContent)||'USD';
    section.querySelector('[data-variant-id]').value=variant.id;
    const price=section.querySelector('[data-product-price]');if(price){price.textContent=variant.price>0?money(variant.price,currency):price.dataset.unpricedLabel;price.classList.toggle('lumina-unpriced',variant.price===0);}
    const compare=section.querySelector('[data-compare-price]');const discount=section.querySelector('[data-discount-percent]');
    if(compare){compare.hidden=!(variant.compare_at_price>variant.price);compare.textContent=money(variant.compare_at_price||0,currency);}
    if(discount){discount.hidden=!(variant.compare_at_price>variant.price);discount.textContent=Math.round((1-variant.price/variant.compare_at_price)*100)+'% off';}
    section.dataset.canPurchase=String(variant.available&&section.dataset.purchaseEnabled==='true');
    section.querySelectorAll('[data-add-to-cart],[data-buy-now]').forEach(button=>button.disabled=section.dataset.canPurchase!=='true');
    const url=new URL(location.href);if(location.pathname.includes('/products/')){url.searchParams.set('variant',variant.id);history.replaceState({},'',url);}
  });
  // Theme editor reloads sections without navigating the document; listeners are delegated.
  function initCountdowns(){document.querySelectorAll('[data-countdown]').forEach(el=>{let end=Date.parse(el.dataset.endsAt||'');if(el.dataset.countdownMode==='daily'){const midnight=new Date();midnight.setHours(24,0,0,0);end=midnight.getTime();}if(el.dataset.countdownMode==='none'||!Number.isFinite(end)){el.hidden=true;return;}el.hidden=false;const left=Math.max(0,Math.floor((end-Date.now())/1000));el.textContent=`${String(Math.floor(left/3600)).padStart(2,'0')}:${String(Math.floor(left/60)%60).padStart(2,'0')}:${String(left%60).padStart(2,'0')}`;});}
  initCountdowns();setInterval(initCountdowns,1000);document.addEventListener('shopify:section:load',event=>{initCountdowns();bindDialogs(event.target);});
  document.addEventListener('shopify:block:select',event=>{const dialog=event.target.closest('[data-editor-dialog]');if(dialog)openDialog(dialog.id);const details=event.target.closest('details');if(details){details.hidden=false;details.open=true;}const slide=event.target.closest('[data-media-index]');if(slide)showMedia(slide.closest('[data-gallery]'),Number(slide.dataset.mediaIndex));});
  document.addEventListener('shopify:section:select',event=>{const dialog=event.target.querySelector('[data-editor-dialog]');if(dialog)openDialog(dialog.id);});
  document.addEventListener('shopify:section:deselect',event=>event.target.querySelector('[data-editor-dialog]')?.close());
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)document.querySelectorAll('video[autoplay]').forEach(video=>{video.pause();video.removeAttribute('autoplay');});
  const popup=document.getElementById('LuminaNewsletterPopup');
  if(popup){
    popup.addEventListener('close',()=>{try{localStorage.setItem('lumina-popup-dismissed-at',String(Date.now()));}catch{}});
    if(!window.Shopify?.designMode){
      const success=popup.querySelector('[data-newsletter-success]');const errors=popup.querySelector('[data-newsletter-errors]');let dismissed=false;
      try{const last=Number(localStorage.getItem('lumina-popup-dismissed-at')||0);dismissed=!!localStorage.getItem('lumina-newsletter-subscribed')||Date.now()-last<(Number(popup.dataset.popupCooldown)||15)*60000||sessionStorage.getItem('lumina-popup-dismissed')==='1';if(success)localStorage.setItem('lumina-newsletter-subscribed','1');}catch{}
      if(success||errors)openDialog(popup.id);
      else if(!dismissed)setTimeout(()=>{if(!document.querySelector('dialog[open]'))openDialog(popup.id);},(Number(popup.dataset.popupDelay)||3)*1000);
    }
  }
})();
