/* ==========================================================
   WEARNANII | AQUÍ EDITAS TODA TU INFORMACIÓN
   ========================================================== */

// 👉 Datos de contacto, moneda y opciones de compra
const CONFIG = {
  correo:    "wearnanii@gmail.com",
  telefono:  "+52 220 276 9954",
  instagram: "@wearnanii_",
  ubicacion: "CDMX, MÉXICO",
  moneda:    "MXN",
  local:     "es-MX",

  // Número donde te mandan el recibo
  whatsapp:       "522202769954",      // sin + ni espacios (para el enlace)
  telefonoRecibo: "+52 220 276 9954",  // como se ve en pantalla

  // Opciones de TODAS las prendas (el color va aparte, en círculos)
  opciones: {
    Talla: ["S", "M", "L", "XL"]
  },

  // Texto que aparece en la descripción de TODAS las prendas
  personalizacion: "Personalízala: elige la tipografía y la frase que quieras. ¿Prefieres otro color? También puedes pedirlo; escríbenos por WhatsApp con tu idea.",

  // Material según el tipo de prenda (se detecta por la primera palabra del nombre).
  // Sale en la ventana de compra y en la portada. En una prenda especial puedes poner  material: "..."
  materiales: {
    SUDADERA: "50% poliéster y 50% algodón",
    PLAYERA:  "100% algodón"
  },

  // Colores disponibles (nombre y código de color)
  colores: [
    { nombre: "Negro",       hex: "#1b1b20" },
    { nombre: "Blanco",      hex: "#f4f4f4" },
    { nombre: "Gris",        hex: "#a9a9ae" },
    { nombre: "Rojo",        hex: "#b3121f" },
    { nombre: "Azul fuerte", hex: "#1b1fa6" },
    { nombre: "Azul cielo",  hex: "#8db4ea" }
  ]
};

// 👉 Tus prendas: copia un bloque { ... }, pégalo y cambia los datos.
//    imagen:      foto de FRENTE (carpeta img/prendas/)
//    imagen2:     foto de ESPALDA (se ve en la ventana de compra y al pasar el mouse en el catálogo)
//    destacado:   foto transparente (frente y espalda juntos) para la portada (img/prendas/hero/)
//    vistaInicial: "espalda"   (opcional) en el catálogo se ve primero la espalda; al pasar el mouse, el frente
//    linkCredito: link de pago con tarjeta de crédito
//    linkDebito:  link de pago con tarjeta de débito
//    Opcional en una prenda: opciones: { Talla: ["Única"] }, colores: false
const PRODUCTOS = [
  {
    id: 1,
    nombre: "PLAYERA MANGA LARGA FROM WITHIN",
    precio: 350,
    imagen: "img/prendas/manga-larga_foundation_frente.webp",
    imagen2: "img/prendas/manga-larga_foundation_atras.webp",
    vistaInicial: "espalda",
    descripcion: "Sudadera negra de algodón pesado con logo grabado.",
    destacado: "img/prendas/hero/fw-manga-larga.webp",
    linkCredito: "https://TU-LINK-DE-PAGO-1",
    linkDebito:  "https://TU-LINK-DE-PAGO-1"
  },
  {
    id: 2,
    nombre: "SUDADERA CON GORRO FROM WITHIN",
    precio: 450,
    imagen: "img/prendas/sudadera_foundation_frente.webp",
    imagen2: "img/prendas/sudadera_foundation_atras.webp",
    descripcion: "Corte amplio, capucha doble y bolsillo frontal.",
    destacado: "img/prendas/hero/fw-sudadera.webp",
    linkCredito: "https://TU-LINK-DE-PAGO-2",
    linkDebito:  "https://TU-LINK-DE-PAGO-2"
  },
  {
    id: 3,
    nombre: "PLAYERA MANGA LARGA DISCIPLINA",
    precio: 370,
    imagen: "img/prendas/manga-larga_discipline-fade_frente.webp",
    imagen2: "img/prendas/manga-larga_discipline-fade_atras.webp",
    vistaInicial: "espalda",
    descripcion: "Playera básica de algodón suave, estampado discreto.",
    destacado: "img/prendas/hero/disc-manga-larga.webp",
    linkCredito: "https://TU-LINK-DE-PAGO-3",
    linkDebito:  "https://TU-LINK-DE-PAGO-3"
  },
  {
    id: 4,
    nombre: "SUDADERA SIN GORRO DISCIPLINA",
    precio: 500,
    imagen: "img/prendas/manga-larga_discipline-fade_frente.webp",
    imagen2: "img/prendas/manga-larga_discipline-fade_atras.webp",
    descripcion: "Sudadera sin capucha, corte clásico y cómodo.",
    sinVitrina: true,   // true = no sale en la vitrina de la portada, solo en el catálogo
    linkCredito: "https://TU-LINK-DE-PAGO-4",
    linkDebito:  "https://TU-LINK-DE-PAGO-4"
  },
  {
    id: 5,
    nombre: "PLAYERA MANGA CORTA DISCIPLINA",
    precio: 350,
    imagen: "img/prendas/playera_discipline_frente.webp",
    imagen2: "img/prendas/playera_discipline_atras.webp",
    vistaInicial: "espalda",
    descripcion: "Pantalón jogger con cintura ajustable.",
    destacado: "img/prendas/hero/disc-playera.webp",
    linkCredito: "https://TU-LINK-DE-PAGO-5",
    linkDebito:  "https://TU-LINK-DE-PAGO-5"
  },
  {
    id: 6,
    nombre: "SUDADERA SIN GORRO GOD FIRST",
    precio: 500,
    imagen: "img/prendas/manga-larga_god-first_frente.webp",
    imagen2: "img/prendas/manga-larga_god-first_atras.webp",
    descripcion: "Sudadera sin capucha, corte clásico y cómodo.",
    destacado: "img/prendas/hero/gf-manga-larga.webp",
    opciones: { Talla: ["Única"] },
    linkCredito: "https://TU-LINK-DE-PAGO-6",
    linkDebito:  "https://TU-LINK-DE-PAGO-6"
  },
  {
    id: 7,
    nombre: "SUDADERA CON GORRO DISCIPLINA",
    precio: 550,
    imagen: "img/prendas/sudadera_discipline_frente.webp",
    imagen2: "img/prendas/sudadera_discipline_atras.webp",
    descripcion: "Corte amplio, capucha doble y bolsillo frontal.",
    sinVitrina: true,   // true = no sale en la vitrina de la portada, solo en el catálogo
    linkCredito: "https://TU-LINK-DE-PAGO-7",
    linkDebito:  "https://TU-LINK-DE-PAGO-7"
  },
  {
    id: 8,
    nombre: "PLAYERA MANGA CORTA FROM WITHIN",
    precio: 300,
    imagen: "img/prendas/playera_foundation_frente.webp",
    imagen2: "img/prendas/playera_foundation_atras.webp",
    vistaInicial: "espalda",
    descripcion: "Playera de algodón suave, estampado discreto.",
    sinVitrina: true,   // true = no sale en la vitrina de la portada, solo en el catálogo
    linkCredito: "https://TU-LINK-DE-PAGO-8",
    linkDebito:  "https://TU-LINK-DE-PAGO-8"
  },
  {
    id: 9,
    nombre: "SUDADERA SIN GORRO FROM WITHIN",
    precio: 430,
    imagen: "img/prendas/manga-larga_foundation_frente.webp",
    imagen2: "img/prendas/manga-larga_foundation_atras.webp",
    descripcion: "Sudadera sin capucha, corte clásico y cómodo.",
    sinVitrina: true,   // true = no sale en la vitrina de la portada, solo en el catálogo
    linkCredito: "https://TU-LINK-DE-PAGO-9",
    linkDebito:  "https://TU-LINK-DE-PAGO-9"
  },
  {
    id: 10,
    nombre: "PLAYERA MANGA LARGA GOD FIRST",
    precio: 370,
    imagen: "img/prendas/manga-larga_god-first_frente.webp",
    imagen2: "img/prendas/manga-larga_god-first_atras.webp",
    vistaInicial: "espalda",
    descripcion: "Manga larga de algodón con la cruz en la espalda.",
    sinVitrina: true,   // true = no sale en la vitrina de la portada, solo en el catálogo
    linkCredito: "https://TU-LINK-DE-PAGO-10",
    linkDebito:  "https://TU-LINK-DE-PAGO-10"
  },
  {
    id: 11,
    nombre: "SUDADERA CON GORRO GOD FIRST",
    precio: 550,
    imagen: "img/prendas/sudadera_god-first_frente.webp",
    imagen2: "img/prendas/sudadera_god-first_atras.webp",
    vistaInicial: "espalda",
    descripcion: "Capucha doble y bolsillo frontal, con GOD FIRST en la espalda.",
    sinVitrina: true,   // true = no sale en la vitrina de la portada, solo en el catálogo
    linkCredito: "https://TU-LINK-DE-PAGO-11",
    linkDebito:  "https://TU-LINK-DE-PAGO-11"
  },
  {
    id: 12,
    nombre: "PLAYERA MANGA CORTA GOD FIRST",
    precio: 350,
    imagen: "img/prendas/playera_god-first_frente.webp",
    imagen2: "img/prendas/playera_god-first_atras.webp",
    descripcion: "Playera de algodón suave, corte clásico y cómodo.",
    destacado: "img/prendas/hero/gf-playera.webp",
    linkCredito: "https://TU-LINK-DE-PAGO-12",
    linkDebito:  "https://TU-LINK-DE-PAGO-12"
  }
];
