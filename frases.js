/* ==========================================================
   WEARNANII | FRASES PARA PERSONALIZAR
   👉 Aquí editas las frases. Todo lo demás se arma solo.
   Formato de cada frase: ["FRASE EN INGLÉS", "Significado en español"]
   Para agregar una, copia una línea y cambia el texto.
   Para agregar una categoría, copia un bloque completo "Nombre": [ ... ]
   ========================================================== */
const FRASES = {
  "Disciplina": [
    ["DISCIPLINE", "Disciplina"], ["CONSISTENCY", "Consistencia"], ["COMMITMENT", "Compromiso"],
    ["DEDICATION", "Dedicación"], ["FOCUS", "Concentrado"]
  ],
  "Actitud": [
    ["EARN IT", "Gánalo"], ["NO EXCUSES", "No excusas"], ["KEEP GOING", "Avanza"], ["STAY READY", "Mantente listo"]
  ],
  "Identidad": [
    ["FROM WITHIN", "De dentro hacia fuera"], ["WITHIN", "Desde dentro"], ["PURPOSE", "Propósito"],
    ["CHARACTER", "Carácter"], ["FOUNDATION", "Fundación"], ["LEGACY", "Legado"], ["BETTER", "Mejorar"],
    ["CREATE", "Crear"], ["INSPIRE", "Inspira"], ["TRANSFORM", "Transformar"]
  ],
  "Ganar": [
    ["WIN", "Ganar"], ["EARNED", "Ganado"], ["PROVE IT", "Demuestra"], ["HUSTLE", "Esforzarse"],
    ["HUNGRY", "Hambriento"], ["NEVER SETTLE", "Nunca conforme"], ["STAND TALL", "Mantente derecho"],
    ["DOMINATE", "Domina"], ["ONE MORE", "Una más"], ["BUILT TO WIN", "Hecho para ganar"]
  ],
  "Superación": [
    ["LOCK IN", "Concentrado/a"], ["UNBREAKABLE", "Indestructible"], ["BUILT", "Creado"], ["BECOME", "Conviértete"],
    ["EVOLVE", "Evoluciona"], ["ASCEND", "Asciende"], ["PERSIST", "Persiste"], ["PREVAIL", "Prevalece"],
    ["UNSTOPPABLE", "Imparable"], ["RELENTLESS", "Implacable"]
  ],
  "Fe": [
    ["FOR HIS GLORY", "Por su gloria"], ["FAITH", "Fe"], ["GRACE", "Gracia"], ["BLESSED", "Bendecido"],
    ["CALLED", "Llamado"], ["CHOSEN", "Elegido/a"], ["REDEEMED", "Redimido"], ["BELIEVE", "Cree"],
    ["TRUST HIM", "Confía en Él"], ["GOD FIRST", "Dios primero"]
  ]
};

/* ==========================================================
   LÓGICA (normalmente no necesitas editar de aquí hacia abajo)
   ========================================================== */
(() => {
  // Estilos del panel (usan los mismos colores de la página)
  const css = `
  .frases{position:fixed;inset:0;z-index:90;display:grid;place-items:center;background:rgba(0,0,0,.6);backdrop-filter:blur(6px);opacity:0;visibility:hidden;transition:opacity .5s var(--ease),visibility .5s}
  .frases.abierto{opacity:1;visibility:visible}
  .frases__box{position:relative;width:min(680px,92%);max-height:88vh;overflow:auto;padding:2.5rem;background:var(--blanco);transform:translateY(40px) scale(.97);transition:transform .7s var(--ease)}
  .frases.abierto .frases__box{transform:none}
  .frases__box h3{font-weight:300;font-size:1.4rem;letter-spacing:.25em;text-transform:uppercase}
  .frases__box p{color:var(--gris);font-size:.9rem;margin:.3rem 0 1.4rem}
  .frases__box h4{margin:1.8rem 0 .8rem;font-weight:400;font-size:.7rem;letter-spacing:.3em;text-transform:uppercase;color:var(--gris)}
  .frases__lista{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:.5rem}
  .frase-op{display:flex;flex-direction:column;align-items:flex-start;padding:.7rem .9rem;border:1px solid var(--linea);background:none;font:inherit;text-align:left;cursor:pointer;transition:all .4s var(--ease)}
  .frase-op b{font-weight:500;font-size:.78rem;letter-spacing:.14em}
  .frase-op span{font-size:.75rem;color:var(--gris)}
  .frase-op:hover{border-color:var(--negro)}
  .frase-op.activo{background:var(--negro);border-color:var(--negro);color:#fff}
  .frase-op.activo span{color:#bbb}
  .frases__propia{display:flex;gap:.6rem}
  .frases__propia input{flex:1;border:1px solid var(--linea);padding:.8rem 1rem}
  .frases__propia .btn{padding:.8rem 1.6rem}
  .frases__x{position:absolute;top:.6rem;right:1.2rem;border:0;background:none;font-size:2rem;cursor:pointer;color:var(--negro)}
  .frases__quitar,.ver-frases{border:0;background:none;color:inherit;font:inherit;font-size:.8rem;letter-spacing:.15em;text-decoration:underline;text-underline-offset:4px;cursor:pointer}
  .frases__quitar{margin-top:2rem}
  .ver-frases{margin:.3rem 0 1rem}`;
  document.head.insertAdjacentHTML("beforeend", `<style>${css}</style>`);

  // Panel de frases
  const panel = document.createElement("div");
  panel.className = "frases";
  panel.innerHTML = `
    <div class="frases__box" role="dialog" aria-modal="true">
      <button type="button" class="frases__x" aria-label="Cerrar">&times;</button>
      <h3>Frases</h3>
      <p>Elige una frase para tu prenda o escribe la tuya.</p>
      <div class="frases__propia">
        <input id="fPropia" placeholder="Escribe tu propia frase" maxlength="40">
        <button type="button" class="btn btn--line" id="fUsar">Usar</button>
      </div>
      ${Object.entries(FRASES).map(([cat, lista]) => `
        <h4>${cat}</h4>
        <div class="frases__lista">
          ${lista.map(([en, es]) => `<button type="button" class="frase-op" data-en="${en}"><b>${en}</b><span>${es}</span></button>`).join("")}
        </div>`).join("")}
      <button type="button" class="frases__quitar" id="fQuitar">Sin frase</button>
    </div>`;
  document.body.appendChild(panel);

  const abrirPanel = () => panel.classList.add("abierto");
  const cerrarPanel = () => panel.classList.remove("abierto");

  // Guarda la frase elegida (aparece en el mensaje de WhatsApp)
  const poner = texto => {
    if (texto) elegido.Frase = texto; else delete elegido.Frase;
    $("#mFrase").textContent = texto || "Ninguna";
    $$(".frase-op", panel).forEach(b => b.classList.toggle("activo", b.dataset.en === texto));
    enlaceWhats();
    setTimeout(cerrarPanel, 250);
  };

  panel.addEventListener("click", e => {
    const b = e.target.closest(".frase-op");
    if (b) poner(b.dataset.en);
    if (e.target === panel || e.target.closest(".frases__x")) cerrarPanel();
  });
  $("#fQuitar").onclick = () => poner("");
  $("#fUsar").onclick = () => { const t = $("#fPropia").value.trim(); if (t) poner(t.toUpperCase()); };
  $("#fPropia").addEventListener("keydown", e => e.key === "Enter" && $("#fUsar").click());

  // Escape cierra primero el panel (y no la ventana de compra)
  addEventListener("keydown", e => {
    if (e.key === "Escape" && panel.classList.contains("abierto")) { cerrarPanel(); e.stopPropagation(); }
  }, true);

  // Al abrir una prenda, agrega "Frase: Ninguna / Ver frases" en la ventana de compra
  grid.addEventListener("click", e => {
    if (!e.target.closest(".card__btn")) return;
    $$(".frase-op", panel).forEach(b => b.classList.remove("activo"));
    $("#fPropia").value = "";
    $("#mOpciones").insertAdjacentHTML("beforeend",
      `<div><p class="pagar">Frase: <span id="mFrase">Ninguna</span></p>
       <button type="button" class="ver-frases" id="verFrases">Ver frases</button></div>`);
    $("#verFrases").onclick = abrirPanel;
  });
})();
