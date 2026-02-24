// /js/scale.js
export function installPageScale({ maxScale = 1, safe = 80, topBias = 0 } = {}) {
  const viewport = document.getElementById("viewport");
  const page = document.getElementById("page");

  function measureIncludingDecor() {
    const prev = page.style.transform;
    page.style.transform = "none";

    // page 本體外框
    const pr = page.getBoundingClientRect();
    let minL = pr.left, minT = pr.top, maxR = pr.right, maxB = pr.bottom;

    // 任何你標記為 decorBBox 的 SVG 群組都算進來
    document.querySelectorAll(".decorBBox").forEach((node) => {
      const svg = node.ownerSVGElement;
      if (!svg) return;

      const bb = node.getBBox();
      const m = node.getCTM();
      if (!m) return;

      const p1 = svg.createSVGPoint(); p1.x = bb.x; p1.y = bb.y;
      const p2 = svg.createSVGPoint(); p2.x = bb.x + bb.width; p2.y = bb.y + bb.height;

      const q1 = p1.matrixTransform(m);
      const q2 = p2.matrixTransform(m);

      const sr = svg.getBoundingClientRect();

      const leftPx   = sr.left + Math.min(q1.x, q2.x);
      const rightPx  = sr.left + Math.max(q1.x, q2.x);
      const topPx    = sr.top  + Math.min(q1.y, q2.y);
      const bottomPx = sr.top  + Math.max(q1.y, q2.y);

      minL = Math.min(minL, leftPx);
      minT = Math.min(minT, topPx);
      maxR = Math.max(maxR, rightPx);
      maxB = Math.max(maxB, bottomPx);
    });

    page.style.transform = prev;

    return {
      width: maxR - minL,
      height: maxB - minT,
      padLeft: Math.max(pr.left - minL, 0),
      padTop: Math.max(pr.top - minT, 0),
    };
  }

  function rescale() {
    const vw = viewport.clientWidth;
    const vh = viewport.clientHeight;

    const { width, height, padLeft, padTop } = measureIncludingDecor();

    const W = width + safe * 2;
    const H = height + safe * 2;

    const s = Math.min(vw / W, vh / H, maxScale);

    const tx = Math.max((vw - width * s) / 2, 0) + (padLeft + safe) * s;
    const ty = Math.max((vh - height * s) / 2 + topBias, 0) + (padTop + safe) * s;

    page.style.transformOrigin = "top left";
    page.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`;
    window.__PAGE_SCALE__ = s;
  }

  window.addEventListener("resize", rescale);
  window.addEventListener("load", rescale);
  rescale();
}
