// /js/scale.js
export function installPageScale({ maxScale = 1, safe = 80, topBias = 0 } = {}) {
  const viewport = document.getElementById("viewport");
  const page = document.getElementById("page");

  function measureIncludingDecor() {
    const prev = page.style.transform;
    page.style.transform = "none";

    // page 本體外框（螢幕座標 px）
    const pr = page.getBoundingClientRect();
    let minL = pr.left, minT = pr.top, maxR = pr.right, maxB = pr.bottom;

    // 把 decorBBox 算進來（但排除 logoEEG 內的，避免你用 -900 之類把全頁撐爆）
    document.querySelectorAll(".decorBBox").forEach((node) => {
      if (node.closest(".logoEEG")) return; // ✅ 很重要：先別讓 logoEEG 影響 page scale

      const svg = node.ownerSVGElement;
      if (!svg) return;

      const bb = node.getBBox();
      const m = node.getScreenCTM(); // ✅ 直接得到螢幕座標用的矩陣
      if (!m) return;

      const pt = svg.createSVGPoint();

      // ✅ 4 corners（旋轉才不會算錯）
      const corners = [
        { x: bb.x, y: bb.y },
        { x: bb.x + bb.width, y: bb.y },
        { x: bb.x, y: bb.y + bb.height },
        { x: bb.x + bb.width, y: bb.y + bb.height },
      ].map(({ x, y }) => {
        pt.x = x;
        pt.y = y;
        const r = pt.matrixTransform(m); // ✅ 螢幕 px
        return { x: r.x, y: r.y };
      });

      const xs = corners.map((p) => p.x);
      const ys = corners.map((p) => p.y);

      // ✅ 這裡才是你現在缺的：用 xs/ys 更新 min/max
      minL = Math.min(minL, ...xs);
      minT = Math.min(minT, ...ys);
      maxR = Math.max(maxR, ...xs);
      maxB = Math.max(maxB, ...ys);
    });

    page.style.transform = prev;

    return {
      minL, minT,
      width: maxR - minL,
      height: maxB - minT,
    };
  }

  function rescale() {
    const vw = viewport.clientWidth;
    const vh = viewport.clientHeight;

    const { minL, minT, width, height } = measureIncludingDecor();

    const W = width + safe * 2;
    const H = height + safe * 2;

    const s = Math.min(vw / W, vh / H, maxScale);

    const tx = (vw - W * s) / 2 + safe * s - minL * s;
    const ty = (vh - H * s) / 2 + safe * s - minT * s + topBias;

    page.style.transformOrigin = "top left";
    page.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`;
    window.__PAGE_SCALE__ = s;
  }

  window.addEventListener("resize", rescale);
  window.addEventListener("load", rescale);
  rescale();
}
