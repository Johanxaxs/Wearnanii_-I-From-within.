/* ==========================================================
   WEARNANII | LÓGICA (normalmente no necesitas editar aquí)
   Los datos se cambian en datos.js
   ========================================================== */
if (typeof CONFIG === "undefined" || typeof PRODUCTOS === "undefined") {
  alert("datos.js tiene un error de escritura. Ábrelo en VS Code y revisa las líneas con rayas rojas.");
}

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
// Precios siempre en pesos mexicanos: $1,290 MXN (sin centavos si el precio es entero)
const dinero = n => new Intl.NumberFormat(CONFIG.local, { style: "currency", currency: CONFIG.moneda, currencyDisplay: "narrowSymbol", minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 }).format(n) + " " + CONFIG.moneda;

// Material de cada prenda: lo dice CONFIG.materiales según la primera palabra del nombre (o p.material en una prenda)
const material = p => p.material || Object.entries(CONFIG.materiales || {}).find(([tipo]) => p.nombre.toUpperCase().startsWith(tipo))?.[1] || "";

/* 1. Datos de contacto (desde CONFIG) */
$$("[data-cfg]").forEach(el => (el.textContent = CONFIG[el.dataset.cfg]));

// Enlaces de contacto (correo, teléfono e Instagram abren directo)
$("#lCorreo").href = "mailto:" + CONFIG.correo;
$("#lTel").href = "tel:" + CONFIG.telefono.replace(/[^\d+]/g, "");
$("#lIg").href = "https://instagram.com/" + (CONFIG.instagram || "").replace("@", "");

/* 2. Catálogo (desde PRODUCTOS) */
// 👉 Texto del bloque que va dentro de la cuadrícula
// (déjalo vacío "" para que no salga título; solo se ve el texto de abajo, en grande)
const TITULO_CATALOGO = "";
const TEXTO_CATALOGO  = "Piezas hechas desde dentro. Disciplina, propósito y pasión en cada prenda.";
// 👉 Frases de la cinta que se mueve arriba del catálogo
const CINTA = ["Nuevas prendas", "From within", "Disciplina", "God first", "Personaliza tu prenda"];

const grid = $("#grid");
grid.innerHTML = PRODUCTOS.map((p, i) => { const [f1, f2] = p.vistaInicial === "espalda" && p.imagen2 ? [p.imagen2, p.imagen] : [p.imagen, p.imagen2]; return `
  ${i === 1 ? `<div class="grid__intro grid__lema rv">${TITULO_CATALOGO ? `<h3>${TITULO_CATALOGO}</h3>` : ""}<p>${TEXTO_CATALOGO}</p></div>` : ""}
  <article class="card rv">
    <div class="card__img">
      ${p.etiqueta ? `<span class="card__tag">${p.etiqueta}</span>` : ""}
      <div${f1 ? "" : ' class="sin-foto"'} style="background-image:url('${f1}')"></div>
      ${f2 ? `<div class="card__alt" style="background-image:url('${f2}')"></div>` : ""}
      <button class="card__btn" data-id="${p.id}">Comprar ahora</button>
    </div>
    <div class="card__info"><span>${p.nombre}</span><span>${dinero(p.precio)}</span></div>
  </article>`; }).join("") + `
  <a class="grid__intro grid__fin rv" href="https://instagram.com/${(CONFIG.instagram || "").replace("@", "")}" target="_blank" rel="noopener">
    <h3>Síguenos</h3><p>${CONFIG.instagram}</p>
  </a>`;

// Cinta de texto en movimiento (se repite para que no se corte)
const cinta = $("#cinta");
if (cinta) {
  const grupo = Array(4).fill(CINTA).flat().map(t => `<span>${t}</span>`).join("");
  cinta.innerHTML = grupo + grupo;
}

/* 3. Cortina de entrada */
addEventListener("load", () => setTimeout(() => $("#loader").classList.add("fuera"), 700));

/* 4. Scroll: menú, parallax de la portada y enlace activo */
const nav = $("#nav"), bg = $(".hero__bg");
addEventListener("scroll", () => {
  nav.classList.toggle("scroll", scrollY > 60);
  const max = document.documentElement.scrollHeight - innerHeight;
  $("#progreso").style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;   // barra de avance
  $("#arriba").classList.toggle("visible", scrollY > 900);
  if (bg && scrollY < innerHeight) bg.style.translate = `0 ${scrollY * 0.25}px`;
}, { passive: true });

const enlaces = $$(".nav nav a");
const vigila = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) enlaces.forEach(a => { const on = a.hash === "#" + e.target.id; a.classList.toggle("activo", on); on ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current"); });
}), { rootMargin: "-50% 0px -50% 0px" });
$$("main section[id]").forEach(s => vigila.observe(s));

/* 5. Aparición al hacer scroll (clase .rv) */
const revela = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("ver"); revela.unobserve(e.target); }
}), { threshold: 0.15 });
$$(".rv").forEach((el, i) => { el.style.transitionDelay = (i % 3) * 0.1 + "s"; revela.observe(el); });

/* 6. Ventana de compra */
const modal = $("#modal");
let actual = null, elegido = {}, previo = null, vistas = [];

// Mensaje de WhatsApp con la prenda, talla y color elegidos
const enlaceWhats = () => {
  const detalle = Object.entries(elegido).map(([k, v]) => `${k}: ${v}`).join(", ");
  const msg = `Hola, ya hice mi compra: ${actual.nombre} (${detalle}) por ${dinero(actual.precio)}. Aquí está mi recibo.`;
  $("#mWhats").href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
};

const abrirCompra = id => {
  previo = document.activeElement;
  actual = PRODUCTOS.find(p => p.id == id);
  // Vistas de la prenda: Frente y Espalda (si la prenda tiene imagen2)
  vistas = [["Frente", actual.imagen], ["Espalda", actual.imagen2]].filter(v => v[1]);
  $("#mVistas").innerHTML = vistas.length > 1 ? vistas.map((v, k) => `<button type="button" class="vista${k ? "" : " activo"}" data-k="${k}">${v[0]}</button>`).join("") : "";
  if (actual.imagen2) new Image().src = actual.imagen2;   // la precarga para que el cambio sea instantáneo
  $("#mImg").style.backgroundImage = `url('${actual.imagen}')`;
  $("#mNombre").textContent = actual.nombre;
  $("#mPrecio").textContent = dinero(actual.precio);
  $("#mDesc").textContent = actual.descripcion + " " + (CONFIG.personalizacion || "");
  $("#mMaterial").textContent = material(actual) ? "Material: " + material(actual) : "";

  // Opciones (talla...): la primera queda elegida por defecto
  elegido = {};
  const ops = actual.opciones || CONFIG.opciones || {};
  let html = Object.entries(ops).map(([nombre, valores]) => {
    elegido[nombre] = valores[0];
    return `<div><p class="pagar">${nombre}</p><div class="chips" data-op="${nombre}">` +
      valores.map((v, i) => `<button type="button" class="chip${i ? "" : " activo"}">${v}</button>`).join("") +
      `</div></div>`;
  }).join("");

  // Colores: círculos pequeños, el nombre aparece al elegir
  const cols = actual.colores === undefined ? CONFIG.colores : actual.colores;
  if (cols && cols.length) {
    elegido.Color = cols[0].nombre;
    html += `<div><p class="pagar">Color: <span id="mColor">${cols[0].nombre}</span></p><div class="colores">` +
      cols.map((c, i) => `<button type="button" class="color${i ? "" : " activo"}" style="--c:${c.hex}" title="${c.nombre}" aria-label="${c.nombre}" data-nombre="${c.nombre}"></button>`).join("") +
      `</div></div>`;
  }
  $("#mOpciones").innerHTML = html;
  enlaceWhats();

  modal.classList.add("abierto");
  modal.setAttribute("aria-hidden", "false");
  $("#cerrar").focus({ preventScroll: true });
  document.body.style.overflow = "hidden";
};

grid.addEventListener("click", e => {
  const btn = e.target.closest(".card__btn");
  if (!btn) return;
  try { abrirCompra(btn.dataset.id); }
  catch (err) { alert("No se pudo abrir la compra: " + err.message + "\nRevisa datos.js e index.html"); }
});

$("#mVistas").addEventListener("click", e => {
  const b = e.target.closest(".vista");
  if (!b) return;
  $("#mImg").style.backgroundImage = `url('${vistas[+b.dataset.k][1]}')`;
  $$(".vista", $("#mVistas")).forEach(x => x.classList.toggle("activo", x === b));
});

$("#mOpciones").addEventListener("click", e => {
  const chip = e.target.closest(".chip");
  if (chip) {
    const grupo = chip.parentElement;
    $$(".chip", grupo).forEach(c => c.classList.toggle("activo", c === chip));
    elegido[grupo.dataset.op] = chip.textContent;
  }
  const col = e.target.closest(".color");
  if (col) {
    $$(".color", $("#mOpciones")).forEach(c => c.classList.toggle("activo", c === col));
    elegido.Color = col.dataset.nombre;
    $("#mColor").textContent = col.dataset.nombre;
  }
  enlaceWhats();
});

const cerrar = () => {
  if (!modal.classList.contains("abierto")) return;
  modal.classList.remove("abierto");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  previo && previo.focus && previo.focus({ preventScroll: true });   // devuelve el foco a donde estabas
};
// El teclado (Tab) se queda dentro de la ventana mientras está abierta
modal.addEventListener("keydown", e => {
  if (e.key !== "Tab") return;
  const f = $$("button, a[href]", modal).filter(x => x.offsetParent !== null);
  if (!f.length) return;
  const a = f[0], z = f[f.length - 1];
  if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
  else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
});
$("#cerrar").onclick = cerrar;
modal.addEventListener("click", e => e.target === modal && cerrar());
addEventListener("keydown", e => e.key === "Escape" && cerrar());

// Crédito o débito: abre el link de pago en OTRA pestaña
$$("[data-tipo]", modal).forEach(btn => btn.onclick = () => {
  const url = actual["link" + btn.dataset.tipo];
  if (!url || url.includes("TU-LINK")) return alert("Falta poner el link de pago de esta prenda en datos.js");
  window.open(url, "_blank", "noopener");
});

/* 8. Detalles creativos */
$("#arriba").onclick = () => scrollTo({ top: 0 });
// Portada: la prenda y la palabra de fondo se mueven en sentido contrario con el mouse (solo computadora)
if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
  let raf = 0;
  addEventListener("pointermove", e => {
    const v = e.target.closest && e.target.closest(".vit");
    if (!v || raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      const r = v.getBoundingClientRect();
      v.style.setProperty("--mx", ((e.clientX - r.left) / r.width - .5).toFixed(3));
      v.style.setProperty("--my", ((e.clientY - r.top) / r.height - .5).toFixed(3));
    });
  }, { passive: true });
}

/* 7. Formulario de contacto: abre tu correo con el mensaje listo */
$("#form").addEventListener("submit", e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const asunto = encodeURIComponent("Contacto Wearnanii: " + f.get("nombre"));
  const cuerpo = encodeURIComponent(f.get("mensaje") + "\n\n" + f.get("email"));
  location.href = `mailto:${CONFIG.correo}?subject=${asunto}&body=${cuerpo}`;
});
