/* Los datos de la casa, en un solo lugar.

   Los usan el <head> de cada página, el sitemap, el robots.txt y los datos
   estructurados que lee Google. Estaban repetidos en cuatro archivos: si
   mañana cambia el dominio o el Instagram, se cambia acá y listo. */

/* En Vercel la plataforma inyecta el dominio de producción — y cuando se
   conecte un dominio propio, éste pasa a ser ése solo. En local cae al
   puerto de desarrollo. */
export const BASE =
  process.env.NEXT_PUBLIC_SITIO ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3300");

export const SITIO = {
  nombre: "Shaula Tulum",
  /* La frase que aparece bajo el título en Google. Dice qué se vende, de
     qué está hecho y dónde: las tres cosas que alguien escribe al buscar. */
  descripcion:
    "Camisas y pantalones de gasa de algodón, hechos y teñidos a mano en Tulum. " +
    "16 colores en tandas cortas. Envíos a todo México.",
  lema: "Ropa artesanal mexicana de gasa de algodón",
  instagram: "https://www.instagram.com/shaula_tulum/",
  ciudad: "Tulum",
  region: "Quintana Roo",
  pais: "MX",
  idioma: "es-MX",
  /* Imagen para cuando alguien comparte el enlace por WhatsApp o lo pega
     en Instagram: el perchero con todos los tonos, en 1200×630. */
  og: "/og.jpg",
} as const;

export function url(ruta = "/") {
  return new URL(ruta, BASE).toString();
}

/* ══════════════════════════════════════════════════════════════
   WhatsApp

   En México la venta chica se cierra por WhatsApp, no por formulario de
   correo. Pero el número va en una variable de entorno, no en el código:
   mientras no esté cargado, el sitio NO muestra ningún botón de WhatsApp
   y sigue funcionando con el correo. Un número de ejemplo publicado es
   peor que no tener botón — manda a la gente a un chat que no existe.

   Se carga en Vercel (Settings → Environment Variables) como
   NEXT_PUBLIC_WHATSAPP, con código de país y sin signos: 5219841234567.
   ══════════════════════════════════════════════════════════════ */
export const WHATSAPP = (process.env.NEXT_PUBLIC_WHATSAPP ?? "").replace(/\D/g, "");

/** Diez dígitos es el mínimo de un número real con código de país. */
export const hayWhatsApp = WHATSAPP.length >= 10;

export function enlaceWhatsApp(mensaje: string) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
}

/** Cómo se muestra escrito: +52 984 123 4567

    México se escribe +52 y nadie pone el 1 de en medio, aunque wa.me lo
    necesite para enrutar a un celular. Se marca igual: el enlace usa el
    número completo, y acá se muestra como lo escribe la gente. */
export function whatsappLegible() {
  const n = WHATSAPP;
  if (n.length < 10) return "";
  let pais = n.slice(0, n.length - 10);
  if (pais === "521") pais = "52";
  const resto = n.slice(-10);
  return `+${pais} ${resto.slice(0, 3)} ${resto.slice(3, 6)} ${resto.slice(6)}`;
}

/* El correo también sale de acá: hoy es de ejemplo y hay que reemplazarlo
   por el real de la marca. */
export const CORREO = process.env.NEXT_PUBLIC_CORREO ?? "hola@shaulatulum.mx";
