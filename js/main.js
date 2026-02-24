import { installPageScale } from "./scale.js";
import { initBrainPanelAutoRotate } from "./brain.js";
import { initEEG } from "./eeg.js";
import { initKid } from "./kid.js";
import { initPanel } from "./panel.js";

document.addEventListener("DOMContentLoaded", () => {
  installPageScale({ baseWidth: 1200, minScale: 0.65 });
  initPanel();
  initBrainPanelAutoRotate();
  initKid();
  initEEG();
});
