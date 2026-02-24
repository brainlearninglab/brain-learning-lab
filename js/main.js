import { installPageScale } from "./scale.js";
import { initBrainPanelAutoRotate } from "./brain.js";
import { initEEG } from "./eeg.js";
import { initKid } from "./kid.js";
import { initPanel } from "./panel.js";

document.addEventListener("DOMContentLoaded", () => {
  installPageScale({ safe: 80, topBias: 0, maxScale: 1 });
  initPanel();
  initBrainPanelAutoRotate();
  initKid();
  initEEG();
});
