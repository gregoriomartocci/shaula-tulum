/* Catálogo de Shaula Tulum.

   La casa hace TRES prendas: la camisa, el pantalón y el conjunto de las
   dos. Lo que cambia entre una pieza y otra no es el molde — es el color.
   Por eso el catálogo no es una lista de productos distintos: son tres
   productos con sus variantes de color, y cada variante trae su propia
   fotografía y su propio video.

   No hay ventas online: esto es un catálogo. La compra se coordina por
   contacto directo. */

export type Categoria = "camisas" | "pantalones" | "conjuntos";

export type Video = {
  src: string;
  /** Primer cuadro del video: se muestra hasta que el visitante lo pide. */
  poster: string;
};

/** Un color de una prenda, con sus propias fotos y videos. */
export type Variante = {
  slug: string;
  nombre: string;
  /** Muestra del color, tomada de la foto. Se usa en el selector. */
  hex: string;
  fotos: string[];
  videos?: Video[];
};

export type Producto = {
  id: string;
  nombre: string;
  /** Cómo se llama la prenda en una línea, para tarjetas y buscadores. */
  subtitulo: string;
  categoria: Categoria;
  /** Color dominante — respaldo cuando falta una foto. */
  tono: string;
  /** Sin precio publicado se muestra "a consultar". Se carga desde el panel. */
  precio?: number;
  tela: string;
  descripcion: string;
  /** Los detalles de confección que se ven en las fotos. */
  detalles: string[];
  cuidado: string;
  talles: string[];
  variantes: Variante[];
  /** Fotos de contexto: looks, percheros, la pila de prendas dobladas. */
  ambiente: string[];
  masVendido?: boolean;
  trending?: boolean;
  nuevo?: boolean;
};

export const CATEGORIAS: { slug: Categoria; nombre: string; descripcion: string }[] = [
  { slug: "camisas",    nombre: "Camisas",    descripcion: "Gasa de algodón, cuello mao o escote cruzado, botón de coco." },
  { slug: "pantalones", nombre: "Pantalones", descripcion: "Pinzas al frente, caída amplia, cintura que no aprieta." },
  { slug: "conjuntos",  nombre: "Conjuntos",  descripcion: "Camisa y pantalón del mismo tono, teñidos en la misma tanda." },
];

/* El catálogo no se ordena por precio — no hay precios publicados — sino
   por prenda (camisa, pantalón, conjunto) o por color. */
export type OrdenSlug = "prenda" | "color";

export const ORDENES: { slug: OrdenSlug; nombre: string }[] = [
  { slug: "prenda", nombre: "Por prenda" },
  { slug: "color",  nombre: "Por color" },
];

/* ══════════════════════════════════════════════════════════════
   Los colores

   Cada `hex` está sacado de la foto de esa prenda, no inventado: es el
   color con el que se pinta la muestra del selector, así el punto que se
   toca y la tela que se ve son el mismo color.
   ══════════════════════════════════════════════════════════════ */

const CAMISA_VARIANTES: Variante[] = [
  {
    slug: "crudo", nombre: "Crudo", hex: "#e7dcc2",
    fotos: ["/media/camisa-crudo-1.jpg", "/media/camisa-crudo-2.jpg"],
    videos: [
      { src: "/media/video-camisa-crudo.mp4", poster: "/media/video-camisa-crudo-poster.jpg" },
      { src: "/media/video-camisa-crudo-2.mp4", poster: "/media/video-camisa-crudo-2-poster.jpg" },
    ],
  },
  {
    slug: "arena", nombre: "Arena", hex: "#a99b87",
    fotos: ["/media/camisa-arena-1.jpg", "/media/camisa-arena-3.jpg", "/media/camisa-arena-2.jpg"],
    videos: [{ src: "/media/video-camisa-arena.mp4", poster: "/media/video-camisa-arena-poster.jpg" }],
  },
  {
    slug: "rosa-tulum", nombre: "Rosa Tulum", hex: "#c3a08e",
    fotos: ["/media/camisa-rosa-1.jpg"],
    videos: [{ src: "/media/video-camisa-rosa.mp4", poster: "/media/video-camisa-rosa-poster.jpg" }],
  },
  {
    slug: "terracota", nombre: "Terracota", hex: "#96493a",
    fotos: ["/media/camisa-terracota-1.jpg", "/media/camisa-terracota-2.jpg"],
    videos: [{ src: "/media/video-camisa-terracota.mp4", poster: "/media/video-camisa-terracota-poster.jpg" }],
  },
  { slug: "mostaza",  nombre: "Mostaza",       hex: "#c69210", fotos: ["/media/camisa-mostaza-1.jpg", "/media/look-atardecer-1.jpg"] },
  { slug: "pistacho", nombre: "Verde Pistacho", hex: "#adae70", fotos: ["/media/camisa-pistacho-1.jpg", "/media/camisa-pistacho-2.jpg", "/media/look-pistacho-5.jpg"] },
  { slug: "salvia",   nombre: "Verde Salvia",   hex: "#7f9188", fotos: ["/media/camisa-salvia-1.jpg", "/media/camisa-salvia-2.jpg"] },
  { slug: "azul",     nombre: "Azul Índigo",    hex: "#5c6e8c", fotos: ["/media/camisa-azul-1.jpg"] },
  {
    slug: "lila", nombre: "Lila", hex: "#a493b4",
    fotos: ["/media/camisa-lila-1.jpg", "/media/camisa-lila-2.jpg"],
    videos: [{ src: "/media/video-camisa-lila.mp4", poster: "/media/video-camisa-lila-poster.jpg" }],
  },
  { slug: "grafito", nombre: "Gris Grafito", hex: "#4e5761", fotos: ["/media/camisa-grafito-1.jpg", "/media/camisa-grafito-2.jpg"] },
  { slug: "negro",   nombre: "Negro",        hex: "#22201e", fotos: ["/media/camisa-negro-1.jpg"] },
];

/* El pantalón tiene cinco tonos, no seis: las tres fotos de arena clara
   (frente, cintura y bolsillo trasero) son de la MISMA prenda, así que van
   juntas en Crudo en vez de inventar un color más. */
const PANTALON_VARIANTES: Variante[] = [
  {
    slug: "crudo", nombre: "Crudo", hex: "#ded0b0",
    fotos: ["/media/pantalon-crudo-1.jpg", "/media/pantalon-arena-1.jpg", "/media/pantalon-crudo-2.jpg"],
  },
  { slug: "camel",     nombre: "Camel",       hex: "#b49873", fotos: ["/media/pantalon-camel-1.jpg", "/media/pantalones-grupo-2.jpg"] },
  { slug: "terracota", nombre: "Terracota",   hex: "#9a4b3e", fotos: ["/media/pantalon-terracota-1.jpg", "/media/pantalones-grupo-1.jpg"] },
  { slug: "olivo",     nombre: "Verde Olivo", hex: "#5f6b4e", fotos: ["/media/pantalon-olivo-1.jpg", "/media/pantalones-grupo-1.jpg"] },
  { slug: "negro",     nombre: "Negro",       hex: "#1e1d1c", fotos: ["/media/pantalon-negro-1.jpg", "/media/pantalones-grupo-1.jpg", "/media/pantalones-grupo-2.jpg"] },
];

/* El conjunto no es una prenda nueva: es la camisa y el pantalón del mismo
   tono, teñidos juntos. Por eso sus fotos son las de las dos piezas. */
const CONJUNTO_VARIANTES: Variante[] = [
  {
    slug: "pistacho", nombre: "Verde Pistacho", hex: "#adae70",
    fotos: [
      "/media/look-pistacho-5.jpg", "/media/look-pistacho-2.jpg", "/media/look-pistacho-3.jpg",
      "/media/look-pistacho-4.jpg", "/media/look-pistacho-1.jpg", "/media/camisa-pistacho-1.jpg",
    ],
  },
  {
    slug: "crudo", nombre: "Crudo", hex: "#e7dcc2",
    fotos: [
      "/media/camisa-crudo-1.jpg", "/media/pantalon-crudo-1.jpg",
      "/media/pantalon-crudo-2.jpg", "/media/look-atardecer-1.jpg",
    ],
    videos: [{ src: "/media/video-camisa-crudo.mp4", poster: "/media/video-camisa-crudo-poster.jpg" }],
  },
  {
    slug: "arena", nombre: "Arena", hex: "#c0b096",
    fotos: [
      "/media/look-arena-1.jpg", "/media/camisa-arena-3.jpg",
      "/media/pantalon-camel-1.jpg", "/media/camisa-arena-1.jpg",
    ],
    videos: [{ src: "/media/video-camisa-arena.mp4", poster: "/media/video-camisa-arena-poster.jpg" }],
  },
  {
    slug: "terracota", nombre: "Terracota", hex: "#96493a",
    fotos: [
      "/media/camisa-terracota-1.jpg", "/media/pantalon-terracota-1.jpg", "/media/camisa-terracota-2.jpg",
    ],
    videos: [{ src: "/media/video-camisa-terracota.mp4", poster: "/media/video-camisa-terracota-poster.jpg" }],
  },
  {
    slug: "olivo", nombre: "Verde Olivo", hex: "#5f6b4e",
    fotos: ["/media/camisa-salvia-2.jpg", "/media/pantalon-olivo-1.jpg", "/media/camisas-dobladas-2.jpg"],
  },
  {
    slug: "negro", nombre: "Negro", hex: "#22201e",
    fotos: ["/media/camisa-negro-1.jpg", "/media/pantalon-negro-1.jpg", "/media/camisas-dobladas-2.jpg"],
  },
];

export const PRODUCTOS: Producto[] = [
  {
    id: "camisa",
    nombre: "Camisa Shaula",
    subtitulo: "Gasa de algodón, cuello mao",
    categoria: "camisas",
    tono: "#e7dcc2",
    tela: "Gasa de algodón lavada",
    descripcion:
      "La camisa de la casa, en once colores. Gasa de algodón lavada: liviana, con esa arruga suave que no se plancha porque es la tela, no un descuido. Cuello mao sin entretela — se para solo lo justo — y botones de coco cosidos uno por uno. El corte es holgado en el cuerpo y la manga se arremanga sola.",
    detalles: [
      "Cuello mao, sin entretela",
      "Botones de coco, cosidos a mano",
      "Manga larga con puño abotonado",
      "Corte holgado, hombro caído",
      "Etiqueta tejida en el cuello",
    ],
    cuidado: "Lavado a mano o a máquina en frío, con jabón neutro. Secar a la sombra. No necesita plancha: la arruga es de la tela.",
    talles: ["S", "M", "L", "XL"],
    variantes: CAMISA_VARIANTES,
    ambiente: [
      "/media/camisas-percha-1.jpg", "/media/camisas-percha-2.jpg",
      "/media/camisas-dobladas-1.jpg", "/media/camisas-dobladas-4.jpg",
      "/media/camisas-dobladas-3.jpg", "/media/camisas-dobladas-5.jpg",
      "/media/camisas-dobladas-2.jpg",
    ],
    masVendido: true,
    trending: true,
  },
  {
    id: "pantalon",
    nombre: "Pantalón Shaula",
    subtitulo: "Pinzas al frente, caída amplia",
    categoria: "pantalones",
    tono: "#cdbe9d",
    tela: "Algodón lavado, textura de arena",
    descripcion:
      "Pantalón de pinzas, ancho de pierna y liviano. La pinza le da caída sin volumen: cae recto desde la cadera en vez de pegarse. Pretina con botón de coco, presillas y bolsillos a los costados. Es el pantalón para el calor que igual se puede usar a la noche.",
    detalles: [
      "Pinzas al frente, caída recta",
      "Pretina con botón de coco y presillas",
      "Bolsillos laterales y bolsillo trasero ribeteado",
      "Tiro medio, pierna amplia",
      "Algodón lavado, sin rigidez",
    ],
    cuidado: "Lavado en frío, secado a la sombra. Se ablanda con cada lavada.",
    talles: ["S", "M", "L", "XL"],
    variantes: PANTALON_VARIANTES,
    ambiente: ["/media/pantalones-grupo-1.jpg", "/media/pantalones-grupo-2.jpg", "/media/look-arena-1.jpg", "/media/pantalon-crudo-2.jpg"],
    masVendido: true,
  },
  {
    id: "conjunto",
    nombre: "Conjunto Shaula",
    subtitulo: "Camisa y pantalón, mismo tono",
    categoria: "conjuntos",
    tono: "#adae70",
    tela: "Gasa y algodón lavado, teñidos en la misma tanda",
    descripcion:
      "La camisa y el pantalón del mismo color, teñidos en la misma tanda. Eso último importa: el teñido es artesanal y dos tandas distintas del mismo tono nunca dan exactamente igual. Comprados juntos, coinciden. Se usa como un traje liviano, o cada pieza por su lado.",
    detalles: [
      "Camisa y pantalón teñidos juntos: el tono coincide",
      "Se puede pedir cada pieza en talle distinto",
      "Los mismos botones de coco en las dos prendas",
      "Seis tonos disponibles como conjunto",
    ],
    cuidado: "Lavar las dos piezas juntas y en frío, para que envejezcan parejo.",
    talles: ["S", "M", "L", "XL"],
    variantes: CONJUNTO_VARIANTES,
    ambiente: [
      "/media/look-pistacho-2.jpg", "/media/look-pistacho-3.jpg",
      "/media/look-atardecer-1.jpg", "/media/look-arena-1.jpg",
    ],
    nuevo: true,
    trending: true,
  },
];

/** Los nombres de color de una prenda — para búsquedas y tarjetas. */
export function coloresDe(p: Producto): string[] {
  return p.variantes.map((v) => v.nombre);
}

/** La primera foto de la prenda: la que representa al producto. */
export function fotoPrincipal(p: Producto): string | undefined {
  return p.variantes[0]?.fotos[0];
}

/** Todos los videos de una prenda, sin repetir. */
export function videosDe(p: Producto): Video[] {
  const vistos = new Set<string>();
  return p.variantes.flatMap((v) => v.videos ?? []).filter((v) => {
    if (vistos.has(v.src)) return false;
    vistos.add(v.src);
    return true;
  });
}
