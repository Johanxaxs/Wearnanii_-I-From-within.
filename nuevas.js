/* ==========================================================
   WEARNANII | SECCIÓN "NUEVAS PRENDAS"
   Va debajo de la portada. La foto es el fondo de TODA la sección
   (las sudaderas y el negro son una sola imagen); el título y las
   tarjetas para comprar van encima, a la izquierda.
   ========================================================== */

// 
const NUEVAS = [7, 11, 12, 5];
const FOTO_NUEVAS = "img/nuevas-fondo.jpg";
const FOTO_GRIS = "img/sudadera_gris.webp";
const FUENTE_TITULO = "Bodoni Moda";
const FONDO_NUEVAS = "#0e0e0e";
/* ==========================================================
   ========================================================== */
(() => {
  // Carga la fuente del título
  document.head.insertAdjacentHTML("beforeend",
    `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${FUENTE_TITULO.replace(/ /g, "+")}&display=swap">`);

  const css = `
  .nue{--titulo:"${FUENTE_TITULO}",Didot,"Bodoni 72",Georgia,serif;position:relative;overflow:hidden;min-height:calc(100vw / var(--ar,1.427));padding:7rem 5%;background:${FONDO_NUEVAS};color:#f4f4f1}
  .nue__fondo{position:absolute;top:-14px;left:0;right:0;aspect-ratio:var(--ar,1.427);background:center / 100% 100% no-repeat;animation:nueDeriva 9s ease-in-out infinite;pointer-events:none}
  .nue__fondo.vacia{display:grid;place-items:center end;padding-right:12%;font-size:.8rem;letter-spacing:.2em;text-transform:uppercase;color:#777}
  .nue__tit,.nue__cards{position:relative;width:40%}
  .nue__tit h2{font-family:var(--titulo);font-weight:400;font-size:clamp(2.8rem,5.4vw,6rem);line-height:.95;letter-spacing:.02em;text-transform:uppercase}
  .nue__tit .linea{margin:2rem 0 0}
  .nue__cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1.2rem;margin-top:3rem}
  .nue__card{background:#ecece8;color:#0b0b0b;overflow:hidden;cursor:pointer}
  .nue__img{position:relative;aspect-ratio:1 / 1.1;overflow:hidden;background:linear-gradient(160deg,#dcdcd7,#c3c3be)}
  .nue__img div{position:absolute;inset:0;background:center 46% / auto 114% no-repeat;transition:transform .7s var(--ease),opacity .5s var(--ease)}
  .nue__alt{opacity:0}
  @media(hover:hover) and (pointer:fine){.nue__card:hover .nue__img div{transform:scale(1.06)}.nue__card:hover .nue__alt{opacity:1}}
  .nue__info{padding:1.1rem 1.2rem 1.4rem}
  .nue__nom{font-size:.85rem;letter-spacing:.18em;text-transform:uppercase}
  .nue__pre{margin:.2rem 0 1.1rem;color:#5f5f5f;letter-spacing:.1em}
  .nue__info .btn{display:block;width:100%;padding:.9rem 1rem;text-align:center;transition:color .5s var(--ease),transform .16s var(--ease)}
  .nue__info .btn:active{transform:scale(.97)}
  .nue__gris{position:absolute;right:0;top:60%;width:78%;z-index:1;pointer-events:none}
  .nue__gris img{display:block;width:100%;height:auto}
  .nue__tit,.nue__cards{z-index:2}
  .nue__fondo::after{content:"";position:absolute;left:0;right:0;bottom:0;height:7%;background:linear-gradient(180deg,transparent,${FONDO_NUEVAS})}
  @keyframes nueDeriva{50%{transform:translateY(12px)}}
  @media(min-width:901px) and (max-width:1100px){.nue__cards{grid-template-columns:1fr}}
  @media(max-width:900px){
    .nue{display:flex;flex-direction:column;min-height:0;padding:5rem 6%}
    .nue__tit,.nue__cards{width:100%}
    .nue__tit{order:1}
    .nue__fondo{order:2;position:relative;top:0;margin:1.5rem -6% 0;aspect-ratio:1 / 1;background-size:188% auto;background-position:90% 17%;animation:none;-webkit-mask-image:linear-gradient(180deg,#000 70%,transparent);mask-image:linear-gradient(180deg,#000 70%,transparent)}
    .nue__cards{order:3;margin-top:1rem}
    .nue__gris{order:4;position:relative;right:auto;top:auto !important;width:auto;margin:1rem -6% -5rem;overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 22%);mask-image:linear-gradient(90deg,transparent,#000 22%)}
    .nue__gris img{width:160%;max-width:none;margin-left:-60%}
    .nue__fondo::after{display:none}
  }
  @media(max-width:520px){.nue__cards{grid-template-columns:1fr}}`;
  document.head.insertAdjacentHTML("beforeend", `<style>${css}</style>`);

  const prendas = NUEVAS.map(id => PRODUCTOS.find(p => p.id == id)).filter(Boolean);

  const sec = document.createElement("section");
  sec.className = "nue";
  sec.innerHTML = `
    <div class="nue__fondo"></div>
    <div class="nue__tit rv"><h2>Nuevas<br>prendas</h2><div class="linea"></div></div>
    <div class="nue__cards">
      ${prendas.map(p => `
        <article class="nue__card rv" data-id="${p.id}">
          <div class="nue__img">
            <div style="background-image:url('${p.imagen2 || p.imagen}')"></div>
            ${p.imagen2 ? `<div class="nue__alt" style="background-image:url('${p.imagen}')"></div>` : ""}
          </div>
          <div class="nue__info">
            <p class="nue__nom">${p.nombre}</p>
            <p class="nue__pre">${dinero(p.precio)}</p>
            <button type="button" class="btn btn--dark">Comprar ahora</button>
          </div>
        </article>`).join("")}
    </div>
    <div class="nue__gris"><img src="${FOTO_GRIS}" alt="Sudadera God First"></div>`;

  ($(".frase") || $("#catalogo")).before(sec);

  
  const fondo = $(".nue__fondo", sec), prueba = new Image();
  prueba.onload = () => {
sec.style.setProperty("--ar", prueba.naturalWidth / prueba.naturalHeight);
    fondo.style.backgroundImage = `url('${FOTO_NUEVAS}')`
    fondo.style.backgroundPosition = "right center";
    fondo.style.backgroundRepeat = "no-repeat";
    fondo.style.backgroundSize = "cover";
  };
  prueba.onerror = () => { fondo.classList.add("vacia"); fondo.textContent = `Aquí va tu foto (${FOTO_NUEVAS})`; };
  // Sudadera gris: en escritorio se pone en el espacio vacío de la derecha, debajo de la foto negra
  const gris = $(".nue__gris", sec);
  const acomodaGris = () => {
    if (matchMedia("(max-width:900px)").matches) { gris.style.top = ""; sec.style.minHeight = ""; return; }
    const gh = gris.offsetHeight, top = Math.round(fondo.offsetTop + fondo.offsetHeight - gh * 0.11);
    gris.style.top = top + "px";
    sec.style.minHeight = (top + gh) + "px";
  };
  $("img", gris).addEventListener("load", acomodaGris);
  prueba.addEventListener("load", () => requestAnimationFrame(acomodaGris));
  addEventListener("resize", acomodaGris);
  prueba.src = FOTO_NUEVAS;

  
  $(".nue__cards", sec).addEventListener("click", e => {
    const c = e.target.closest(".nue__card");
    if (c) $(`.card__btn[data-id="${c.dataset.id}"]`).click();
  });

  // Aparición al hacer scroll
  $$(".rv", sec).forEach((el, i) => { el.style.transitionDelay = (i % 3) * 0.1 + "s"; revela.observe(el); });
})();
