/* Identificador de producto a partir del nombre.

   Va en la URL (/catalogo/camisa-sian-kaan), así que tiene que sobrevivir a
   acentos, eñes, apóstrofes y espacios sin dejar caracteres que rompan el
   enlace. Se corta a 60 para que no crezca sin límite. */
export function aSlug(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
}
