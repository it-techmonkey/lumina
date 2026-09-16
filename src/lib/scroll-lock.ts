// Reference-counted body scroll lock, so nested overlays (e.g. an edit modal
// opened from inside the cart drawer) don't clobber an outer overlay's lock
// when the inner one closes first.
let lockCount = 0;

export function lockBodyScroll() {
  lockCount += 1;
  document.body.style.overflow = "hidden";
}

export function unlockBodyScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = "";
  }
}
