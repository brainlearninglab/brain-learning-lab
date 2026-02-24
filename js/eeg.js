// EEG: build waveform path + anchor to logo tail inside scaled page.
export function initEEG(){
  buildEEGPath();
  syncEEGToLogoAnchor();
  window.addEventListener("resize", syncEEGToLogoAnchor);
  window.addEventListener("load", syncEEGToLogoAnchor);
}

function buildEEGPath(){
  const path = document.getElementById("eegPath");
  if(!path) return;

  const W = 1200, H = 220;
  const mid = Math.round(H*0.62);
  const ampBase = H*0.11;

  const pts = [];
  const n = 260;
  for(let i=0;i<=n;i++){
    const x = (i/n)*W;
    const t = (i/n) * Math.PI * 8;
    const a = ampBase*(0.55 + 0.45*Math.sin(i*0.27));
    const y = mid
      + a*Math.sin(t)
      + (ampBase*0.35)*Math.sin(t*2.2 + 1.3)
      + (ampBase*0.18)*Math.sin(t*5.1 + 0.7);
    pts.push([x,y]);
  }

  let d = `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;
  for(let i=1;i<pts.length;i++){
    const [x,y]=pts[i];
    const [px,py]=pts[i-1];
    const cx = ((px+x)/2).toFixed(2);
    const cy = ((py+y)/2).toFixed(2);
    d += ` Q ${px.toFixed(2)} ${py.toFixed(2)} ${cx} ${cy}`;
  }
  path.setAttribute("d", d);
}

function syncEEGToLogoAnchor(){
  const anchor = document.querySelector(".logoTailAnchor");
  const eeg = document.querySelector(".logoEEG");
  const page = document.getElementById("page");
  if(!anchor || !eeg || !page) return;

  const scale = window.__PAGE_SCALE__ || 1;

  // Page rect in viewport coords
  const pageRect = page.getBoundingClientRect();
  const aRect = anchor.getBoundingClientRect();

  // Convert viewport coords to unscaled page coords
  const leftInPage = (aRect.left - pageRect.left) / scale;
  const bottomInPage = (pageRect.bottom - aRect.bottom) / scale;

  eeg.style.left = `${Math.round(leftInPage)}px`;
  eeg.style.bottom = `${Math.round(bottomInPage)}px`;
}
