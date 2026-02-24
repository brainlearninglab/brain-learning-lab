import { SLIDES_EMBED_URL_2 } from "./config.js";

export function initKid(){
  initKidGallery();
  initContactModal();
}

function initKidGallery(){
  const kid2 = document.getElementById("kid2");
  const modal2 = document.getElementById("galleryModal2");
  const modalClose2 = document.getElementById("modalClose2");
  const slidesFrame2 = document.getElementById("slidesFrame2");

  function showModal2(){
    if (!modal2) return;
    modal2.classList.add("show");
    modal2.setAttribute("aria-hidden","false");
    if (slidesFrame2) slidesFrame2.src = SLIDES_EMBED_URL_2;
  }

  function hideModal2(){
    if (!modal2) return;
    modal2.classList.remove("show");
    modal2.setAttribute("aria-hidden","true");
    if (slidesFrame2) slidesFrame2.src = "";
  }

  if (kid2) kid2.addEventListener("click", showModal2);
  if (modalClose2) modalClose2.addEventListener("click", hideModal2);
  if (modal2) modal2.addEventListener("click", (e)=>{ if(e.target===modal2) hideModal2(); });

  document.addEventListener("keydown", (e)=>{ if(e.key==="Escape") hideModal2(); });
}

function initContactModal(){
  const kid3 = document.getElementById("kid3");
  const contactModal = document.getElementById("contactModal");
  const contactClose = document.getElementById("contactClose");

  function showContactModal(){
    if (!contactModal) return;
    contactModal.classList.add("show");
    contactModal.setAttribute("aria-hidden","false");
  }

  function hideContactModal(){
    if (!contactModal) return;
    contactModal.classList.remove("show");
    contactModal.setAttribute("aria-hidden","true");
  }

  if (kid3) kid3.addEventListener("click", showContactModal);
  if (contactClose) contactClose.addEventListener("click", hideContactModal);

  if (contactModal){
    contactModal.addEventListener("click", (e)=>{
      if (e.target === contactModal) hideContactModal();
    });
  }

  document.addEventListener("keydown", (e)=>{
    if(e.key === "Escape") hideContactModal();
  });
}
