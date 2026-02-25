import { initBrainPanelAutoRotate } from "./brain.js";
import { initEEG } from "./eeg.js";
import { initKid } from "./kid.js";
import { initPanel } from "./panel.js";

document.addEventListener("DOMContentLoaded", () => {
  initPanel();
  initBrainPanelAutoRotate();
  initKid();
  initEEG();
});
