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
    : "http://localhost:3200");

export const SITIO = {
  nombre: "Shaula Tulum",
  /* La frase que aparece bajo el título en Google. Dice qué se vende, de
     qué está hecho y dónde: las tres cosas que alguien escribe al buscar. */
  descripcion:
    "Camisas, pantalones y conjuntos de gasa de algodón, hechos y teñidos a mano en Tulum. " +
    "22 colores en tandas cortas. Envíos a todo México.",
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
