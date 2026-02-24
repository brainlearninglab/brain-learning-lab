import { ITEMS, KEY_TO_REGIONS, ROTATE_MS, IDLE_RESUME_MS } from "./config.js";

export function initBrainPanelAutoRotate(){
  const titleEl = document.getElementById("title");
  const descEl  = document.getElementById("desc");
  if (!titleEl || !descEl) return;

  let idx = 0;
  let timer = null;
  let idleResumeTimer = null;
  let playing = false;

  function setActive(key) {
    document.querySelectorAll(".bulb").forEach(b => b.classList.remove("active"));

    const regions = (KEY_TO_REGIONS && KEY_TO_REGIONS[key]) ? KEY_TO_REGIONS[key] : [key];
    regions.forEach(r => {
      document.querySelectorAll(`.bulb[data-region="${r}"]`).forEach(b => b.classList.add("active"));
    });

    let cur = ITEMS.find(x => x.key === key);

    if (!cur && (key === "math2019" || key === "readingTest")) {
      cur = ITEMS.find(x => x.key === "math&reading2019");
    }

    if (cur) {
      titleEl.textContent = cur.title;
      descEl.textContent = cur.desc;
    }
  }

  function renderByIndex(i) { idx = (i + ITEMS.length) % ITEMS.length; setActive(ITEMS[idx].key); }

  function stopAuto() {
    if (timer) clearInterval(timer);
    timer = null;
    if (idleResumeTimer) clearTimeout(idleResumeTimer);
    idleResumeTimer = null;
    playing = false;
  }

  function startAuto() {
    if (timer) clearInterval(timer);
    timer = setInterval(() => renderByIndex(idx + 1), ROTATE_MS);
    playing = true;
    if (idleResumeTimer) clearTimeout(idleResumeTimer);
    idleResumeTimer = null;
  }

  function userSelect(key) {
    const i = ITEMS.findIndex(x => x.key === key);
    if (i >= 0) idx = i;
    setActive(key);
    stopAuto();
    idleResumeTimer = setTimeout(() => {
      if (!playing) startAuto();
    }, IDLE_RESUME_MS);
  }

  document.querySelectorAll(".region-hotspot").forEach(el => {
    el.addEventListener("click", () => userSelect(el.dataset.key));
    el.addEventListener("touchstart", () => userSelect(el.dataset.key), { passive: true });
  });
  document.querySelectorAll(".jump").forEach(btn => btn.addEventListener("click", () => userSelect(btn.dataset.key)));

  renderByIndex(0);
  startAuto();
}
