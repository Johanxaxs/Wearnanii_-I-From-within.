/* ==========================================================
   WEARNANII | VITRINA DE PRENDAS (cambia de prenda y de fondo)
   Usa las prendas de datos.js. "Comprar ahora" abre la ventana
   de compra de esa prenda (talla, color, frase y pago).
   ========================================================== */

// 👉 Colores de fondo, en orden (se repiten si hay más prendas).
//    Para una prenda en especial, agrega  fondo: "#7d1220"  en su bloque de datos.js
const FONDOS = ["#0b0b0b", "#3a3a3c", "#a8a8a8", "#1f1f22", "#6b6b6e", "#bebebe"];

// 👉 Frase al pie de la vitrina
const FRASE_VITRINA = "Todo comienza desde dentro.";

// 👉 Segundos entre cambios automáticos (0 = no cambia solo)
const SEGUNDOS = 6;

// 👉 true  = la vitrina es la PORTADA (reemplaza la imagen de portada; el menú "Inicio" lleva aquí)
//    false = la vitrina va debajo de la portada original, antes del catálogo
const COMO_PORTADA = true;

/* ==========================================================
   LÓGICA (normalmente no necesitas editar de aquí hacia abajo)
   ========================================================== */
(() => {
  const lista = PRODUCTOS.filter(p => !p.sinVitrina), total = lista.length;

  // Estilos (todas las clases empiezan con "vit")
  const css = `
  .vit{position:relative;min-height:100vh;padding:7rem 5% 6rem;display:grid;grid-template-columns:1fr 1.3fr 1fr;align-items:center;gap:2rem;overflow:hidden;background:var(--bg);color:var(--tx);transition:background-color 1.2s var(--ease),color .8s var(--ease)}
  .vit button{font:inherit}
  .nav.sobre-claro:not(.scroll){color:var(--negro)}
  .vit__tx{transition:opacity .5s var(--ease),transform .5s var(--ease)}
  .vit__prenda{position:relative;display:grid;justify-items:center;transition:opacity .5s var(--ease),transform .6s var(--ease)}
  .vit.sale .vit__tx{opacity:0;transform:translateY(16px)}
  .vit.sale .vit__prenda{opacity:0;transform:translateX(calc(var(--dir,1) * -90px)) scale(.92)}
  .vit.pre .vit__tx{opacity:0;transform:translateY(16px);transition:none}
  .vit.pre .vit__prenda{opacity:0;transform:translateX(calc(var(--dir,1) * 90px)) scale(.92);transition:none}
  .vit__img{width:100%;height:min(56vh,520px);background:center / contain no-repeat;animation:flota 5s ease-in-out infinite}
  .vit__sombra{width:55%;height:22px;margin-top:1rem;border-radius:50%;background:rgba(0,0,0,.35);filter:blur(12px);animation:sombra 5s ease-in-out infinite}
  .vit__ctl{display:flex;align-items:center;gap:.6rem;margin-bottom:2rem}
  .vit__flecha{width:42px;height:42px;display:grid;place-items:center;border:1px solid currentColor;border-radius:50%;background:none;color:inherit;cursor:pointer;opacity:.75;transition:opacity .4s,transform .4s var(--ease)}
  .vit__flecha:hover{opacity:1;transform:scale(1.08)}
  .vit__cont{margin-left:.8rem;font-size:.75rem;letter-spacing:.3em;opacity:.7}
  .vit__nombre{font-weight:300;font-size:clamp(1.8rem,3.4vw,3rem);line-height:1.15;letter-spacing:.12em;text-transform:uppercase;margin-bottom:1.2rem}
  .vit__desc{max-width:34ch;opacity:.75;margin-bottom:2.2rem}
  .vit__der{text-align:right;justify-self:end}
  .vit__precio{font-weight:300;font-size:clamp(2.2rem,4vw,3.5rem);letter-spacing:.08em}
  .vit__tallas{margin:.6rem 0 1rem;font-size:.8rem;letter-spacing:.2em;text-transform:uppercase;opacity:.7}
  .vit__pts{display:flex;gap:.45rem;justify-content:flex-end}
  .vit__pts i{width:14px;height:14px;border-radius:50%;background:var(--c);border:1px solid rgba(128,128,128,.5)}
  .vit__sig{position:absolute;right:4%;bottom:2.5rem;width:92px;height:110px;border:1px solid rgba(128,128,128,.4);background:rgba(128,128,128,.12) center / contain no-repeat;cursor:pointer;transition:transform .5s var(--ease)}
  .vit__sig:hover{transform:translateY(-6px)}
  .vit__frase{position:absolute;left:0;right:0;bottom:2.2rem;text-align:center;font-size:.75rem;letter-spacing:.4em;text-transform:uppercase;opacity:.6}
  @keyframes flota{50%{transform:translateY(-14px)}}
  @keyframes sombra{50%{transform:scaleX(.82);opacity:.55}}
  @media(max-width:900px){
    .vit{grid-template-columns:1fr;gap:1.5rem;min-height:auto;padding:6rem 6% 7rem}
    .vit__prenda{order:-1}
    .vit__img{height:44vh}
    .vit__der{text-align:left;justify-self:start}
    .vit__pts{justify-content:flex-start}
    .vit__sig{width:64px;height:78px;bottom:1.5rem}
    .vit__frase{display:none}
  }`;
  document.head.insertAdjacentHTML("beforeend", `<style>${css}</style>`);

  // Estructura de la vitrina (se coloca justo antes del catálogo)
  const flecha = d => `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5"><path d="${d}"/></svg>`;
  const sec = document.createElement("section");
  sec.className = "vit";
  sec.id = COMO_PORTADA ? "inicio" : "destacados";
  sec.innerHTML = `
    <div class="vit__izq vit__tx">
      <div class="vit__ctl">
        <button type="button" class="vit__flecha" data-d="-1" aria-label="Prenda anterior">${flecha("M15 5l-7 7 7 7")}</button>
        <button type="button" class="vit__flecha" data-d="1" aria-label="Prenda siguiente">${flecha("M9 5l7 7-7 7")}</button>
        <span class="vit__cont"></span>
      </div>
      <h2 class="vit__nombre"></h2>
      <p class="vit__desc"></p>
      <p class="vit__mat"></p>
      <button type="button" class="btn vit__btn">Comprar ahora</button>
    </div>
    <div class="vit__prenda"><div class="vit__img"></div><div class="vit__sombra"></div></div>
    <div class="vit__der vit__tx">
      <p class="vit__precio"></p>
      <p class="vit__tallas"></p>
      <div class="vit__pts"></div>
    </div>
    <button type="button" class="vit__sig" aria-label="Ver la siguiente prenda"></button>
    <p class="vit__frase">${FRASE_VITRINA}</p>`;

  const q = s => $(s, sec);
  let i = 0, ocupado = false, pausa = false, timer;

  const fondo = k => lista[k].fondo || FONDOS[k % FONDOS.length];
  const foto = k => lista[k].destacado || lista[k].imagen;
  const esClaro = hex => {
    const n = parseInt(hex.slice(1), 16);
    return (((n >> 16) * 299) + (((n >> 8) & 255) * 587) + ((n & 255) * 114)) / 1000 > 150;
  };

  // Fondo y color del texto según la prenda (el texto se adapta solo)
  const pintarFondo = () => {
    const f = fondo(i);
    sec.style.setProperty("--bg", f);
    sec.style.setProperty("--tx", esClaro(f) ? "#000" : "#fff");
    sec.style.setProperty("--glow", esClaro(f) ? "12%" : "30%");   // halo para que la prenda negra se vea en fondos oscuros
    $("#nav").classList.toggle("sobre-claro", esClaro(f));
  };

  // Pone la foto de portada (sin fondo). Si no la encuentra (por ejemplo, falta la carpeta img/prendas/hero),
  // usa la foto de frente de la prenda para que la portada nunca se quede vacía.
  const ponerFoto = (el, k) => {
    const p = lista[k];
    el.dataset.k = k;
    el.style.backgroundImage = `url('${foto(k)}')`;
    if (p.destacado && p.imagen) {
      const t = new Image();
      t.onerror = () => { if (el.dataset.k == k) el.style.backgroundImage = `url('${p.imagen}')`; };
      t.src = p.destacado;
    }
  };

  // Textos, precio, foto y miniatura de la siguiente prenda
  const pintar = () => {
    const p = lista[i];
    const tallas = (p.opciones || CONFIG.opciones || {}).Talla;
    const cols = p.colores === undefined ? CONFIG.colores : p.colores;
    q(".vit__nombre").textContent = p.nombre;
    q(".vit__desc").textContent = p.descripcion;
    q(".vit__mat").textContent = material(p) ? "Material: " + material(p) : "";
    q(".vit__precio").textContent = dinero(p.precio);
    q(".vit__tallas").textContent = tallas ? "Tallas " + tallas.join(", ") : "";
    q(".vit__pts").innerHTML = (cols || []).map(c => `<i style="--c:${c.hex}" title="${c.nombre}"></i>`).join("");
    q(".vit__cont").textContent = `${i + 1} / ${total}`;
    ponerFoto(q(".vit__img"), i);
    ponerFoto(q(".vit__sig"), (i + 1) % total);
  };

  // Cambio de prenda: la actual sale, el fondo cambia y entra la nueva
  const ir = (n, dir = 1) => {
    if (ocupado) return;
    ocupado = true;
    sec.style.setProperty("--dir", dir);
    sec.classList.add("sale");
    i = (n + total) % total;
    pintarFondo();
    setTimeout(() => {
      pintar();
      sec.classList.replace("sale", "pre");
      requestAnimationFrame(() => requestAnimationFrame(() => { sec.classList.remove("pre"); ocupado = false; }));
    }, 520);
  };

  // Cambio automático (se pausa con el mouse encima o con la compra abierta)
  const reiniciar = () => {
    clearInterval(timer);
    if (SEGUNDOS && !matchMedia("(prefers-reduced-motion: reduce)").matches)
      timer = setInterval(() => { if (!pausa && !modal.classList.contains("abierto")) ir(i + 1); }, SEGUNDOS * 1000);
  };

  sec.addEventListener("click", e => {
    const f = e.target.closest(".vit__flecha");
    if (f) { ir(i + +f.dataset.d, +f.dataset.d); reiniciar(); }
    if (e.target.closest(".vit__sig")) { ir(i + 1); reiniciar(); }
    // Comprar ahora: abre la compra de esta prenda (la misma del catálogo)
    if (e.target.closest(".vit__btn")) $(`.card__btn[data-id="${lista[i].id}"]`).click();
  });
  sec.addEventListener("mouseenter", () => (pausa = true));
  sec.addEventListener("mouseleave", () => (pausa = false));

  // Deslizar con el dedo en el celular
  let x0 = 0;
  sec.addEventListener("touchstart", e => (x0 = e.touches[0].clientX), { passive: true });
  sec.addEventListener("touchend", e => {
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) { ir(i + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1); reiniciar(); }
  });

  pintarFondo();
  pintar();
  if (COMO_PORTADA) {
    $(".hero")?.remove();                 // quita la portada anterior
    $("main").prepend(sec);
    sec.classList.add("pre");             // entra cuando se levanta la cortina negra
    addEventListener("load", () => setTimeout(() => sec.classList.remove("pre"), 900));
  } else {
    $("#catalogo").before(sec);
  }
  vigila.observe(sec);                    // marca "Inicio" en el menú al estar aquí
  reiniciar();
})();
