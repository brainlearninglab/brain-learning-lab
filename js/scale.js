// Page scale: scales #page to fit viewport width (no reflow).
export function installPageScale({ baseWidth = 1200, minScale = 0.65 } = {}) {
  const viewport = document.getElementById("viewport");
  const page = document.getElementById("page");
  if (!viewport || !page) return;

  function rescale() {
    const vw = window.innerWidth;
    const s = Math.max(minScale, Math.min(vw / baseWidth, 1));
    page.style.transform = `scale(${s})`;
    // height compensation so the scaled page isn't clipped
    viewport.style.height = `${page.offsetHeight * s}px`;
    window.__PAGE_SCALE__ = s;
  }

  window.addEventListener("resize", rescale);
  window.addEventListener("load", rescale);
  rescale();
}
