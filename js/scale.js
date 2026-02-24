// Page scale: scales the whole #page proportionally to fit *both* viewport width & height,
// and centers it. This avoids layout reflow; everything inside #page scales together.
export function installPageScale({ baseWidth = 1200, minScale = 0.65 } = {}) {
  const viewport = document.getElementById("viewport");
  const page = document.getElementById("page");
  if (!viewport || !page) return;

  // Ensure a stable layout width (design width).
  page.style.width = `${baseWidth}px`;

  function measureBaseHeight() {
    const prev = page.style.transform;
    page.style.transform = "";
    const rect = page.getBoundingClientRect();
    page.style.transform = prev;
    return rect.height || page.offsetHeight || 1;
  }

  function rescale() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const baseH = measureBaseHeight();

    // Fit to BOTH dimensions; never upscale above 1.
    const s = Math.max(minScale, Math.min(vw / baseWidth, vh / baseH, 1));

    // Center the scaled page in the viewport.
    const tx = Math.max(0, (vw - baseWidth * s) / 2);
    const ty = Math.max(0, (vh - baseH * s) / 2);

    page.style.transformOrigin = "top left";
    page.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`;
    window.__PAGE_SCALE__ = s;
  }

  // Recompute after images load (base height changes).
  const imgs = page.querySelectorAll("img");
  imgs.forEach((img) => {
    if (!img.complete) {
      img.addEventListener(
        "load",
        () => requestAnimationFrame(rescale),
        { once: true }
      );
    }
  });

  window.addEventListener("resize", () => requestAnimationFrame(rescale));
  window.addEventListener("load", () => requestAnimationFrame(rescale));
  rescale();
}
