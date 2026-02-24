// /js/scale.js
export function installPageScale({ maxScale = 1, safe = 40, topBias = 0 } = {}) {
  const viewport = document.getElementById("viewport");
  const page = document.getElementById("page");

  function measure() {
    // 先清掉 transform 才量得到「原始尺寸」
    const prev = page.style.transform;
    page.style.transform = "none";

    // 用 getBoundingClientRect 量實際外框（包含超出內容的元素）
    const r = page.getBoundingClientRect();

    page.style.transform = prev;
    return { w: r.width, h: r.height };
  }

  function rescale() {
    const vw = viewport.clientWidth;
    const vh = viewport.clientHeight;

    const { w, h } = measure();

    // 加安全邊界，避免裝飾被切（花朵、陰影、泡泡等）
    const W = w + safe * 2;
    const H = h + safe * 2;

    const s = Math.min(vw / W, vh / H, maxScale);

    // 置中（但不會是負值）
    const tx = Math.max((vw - w * s) / 2, 0);
    const ty = Math.max((vh - h * s) / 2 + topBias, 0);

    page.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`;
    window.__PAGE_SCALE__ = s;
  }

  window.addEventListener("resize", rescale);
  window.addEventListener("load", rescale);
  rescale();
}
