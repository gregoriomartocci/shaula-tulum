/* Catálogo de Shaula Tulum.
   No hay ventas online: esto es un catálogo. El precio se muestra como
   referencia y la compra se coordina por contacto. */

export type Categoria =
  | "camisas" | "pantalones" | "vestidos" | "tunicas" | "faldas" | "accesorios";

export type Producto = {
  id: string;
  nombre: string;
  categoria: Categoria;
  precio: number;
  /** Color dominante de la prenda — respaldo cuando no hay foto. */
  tono: string;
  /** Foto de la prenda en /public/prendas. Datos de prueba. */
  foto?: string;
  colores: string[];
  tela: string;
  descripcion: string;
  talles: string[];
  masVendido?: boolean;
  trending?: boolean;
  nuevo?: boolean;
};

export const CATEGORIAS: { slug: Categoria; nombre: string; descripcion: string }[] = [
  { slug: "camisas",     nombre: "Camisas",     descripcion: "Lino lavado, cuello suelto, para el calor de verdad." },
  { slug: "pantalones",  nombre: "Pantalones",  descripcion: "Caída amplia, cintura con cordón, cero rigidez." },
  { slug: "vestidos",    nombre: "Vestidos",    descripcion: "Una sola pieza, del mar a la mesa sin cambiarse." },
  { slug: "tunicas",     nombre: "Túnicas",     descripcion: "La prenda más vieja del mundo, y todavía la mejor." },
  { slug: "faldas",      nombre: "Faldas",      descripcion: "Movimiento, largo generoso, nada que apriete." },
  { slug: "accesorios",  nombre: "Accesorios",  descripcion: "Palma tejida, algodón crudo, latón sin pulir." },
];

export const PRODUCTOS: Producto[] = [
  {
    id: "camisa-sian-kaan",
    nombre: "Camisa Sian Ka'an",
    categoria: "camisas", precio: 74, tono: "#EFE7D8", foto: "/prendas/S4f4apZd-hA.jpg",
    colores: ["Crudo", "Arena", "Verde cenote"],
    tela: "Lino belga 100%, lavado en piedra",
    descripcion: "El lino se ablanda con cada lavada en vez de gastarse. Esta camisa se compra una vez y se usa diez veranos: cuello sin entretela, botones de coco, y un corte que deja pasar el aire por donde tiene que pasar.",
    talles: ["XS", "S", "M", "L", "XL"],
    masVendido: true, trending: true,
  },
  {
    id: "camisa-muyil",
    nombre: "Camisa Muyil",
    categoria: "camisas", precio: 68, tono: "#DCD3C0", foto: "/prendas/lziP7ZPtghg.jpg",
    colores: ["Arena", "Blanco cal"],
    tela: "Lino y algodón orgánico",
    descripcion: "Manga corta, hombro caído, un bolsillo al pecho. La camisa que te ponés arriba del traje de baño y seguís vestido para cenar.",
    talles: ["S", "M", "L", "XL"],
    masVendido: true,
  },
  {
    id: "camisa-holbox",
    nombre: "Camisa Holbox",
    categoria: "camisas", precio: 82, tono: "#C9D6D2", foto: "/prendas/maHb1ki_X3o.jpg",
    colores: ["Verde agua", "Crudo"],
    tela: "Ramio y lino",
    descripcion: "Cuello mao, sin botones hasta abajo — se pasa por la cabeza. El ramio le da una caída más seca que el lino solo, así no se pega al cuerpo con humedad.",
    talles: ["S", "M", "L"],
    nuevo: true, trending: true,
  },
  {
    id: "camisa-coba",
    nombre: "Camisa Cobá",
    categoria: "camisas", precio: 79, tono: "#B9A88C", foto: "/prendas/SVMaSpddK7o.jpg",
    colores: ["Henequén", "Tabaco"],
    tela: "Lino grueso tejido a mano",
    descripcion: "Tejida en telar de pedal en Yucatán. Cada pieza tiene la trama levemente distinta — no es un defecto, es la única prueba de que no salió de una máquina.",
    talles: ["M", "L", "XL"],
  },
  {
    id: "pantalon-cenote",
    nombre: "Pantalón Cenote",
    categoria: "pantalones", precio: 88, tono: "#E3D9C6", foto: "/prendas/JyGAXGfv3eo.jpg",
    colores: ["Arena", "Negro humo", "Crudo"],
    tela: "Lino lavado 100%",
    descripcion: "Cintura con cordón de algodón, pierna ancha, tobillo al aire. Se dobla en cuatro y entra en cualquier bolso sin quedar arrugado de forma fea — el lino se arruga lindo, esa es la gracia.",
    talles: ["XS", "S", "M", "L", "XL"],
    masVendido: true,
  },
  {
    id: "pantalon-akumal",
    nombre: "Pantalón Akumal",
    categoria: "pantalones", precio: 96, tono: "#CFC4AE", foto: "/prendas/JODDyeaBU6s.jpg",
    colores: ["Arena tostada", "Blanco cal"],
    tela: "Lino irlandés",
    descripcion: "Corte más recto, pinzas al frente, bolsillo italiano. El único pantalón de la casa que aguanta una reunión y una playa el mismo día.",
    talles: ["S", "M", "L", "XL"],
    trending: true,
  },
  {
    id: "pantalon-bacalar",
    nombre: "Pantalón Bacalar",
    categoria: "pantalones", precio: 72, tono: "#A8B5AE", foto: "/prendas/VXVliw58qNg.jpg",
    colores: ["Verde laguna", "Arena"],
    tela: "Algodón crudo lavado",
    descripcion: "El más liviano del catálogo. Pensado para el mediodía, cuando cualquier cosa que no respire deja de ser ropa y pasa a ser un problema.",
    talles: ["S", "M", "L"],
    nuevo: true,
  },
  {
    id: "vestido-tulum",
    nombre: "Vestido Tulum",
    categoria: "vestidos", precio: 118, tono: "#F2EADC", foto: "/prendas/dziVRZYOFpI.jpg",
    colores: ["Blanco cal", "Arena"],
    tela: "Lino belga 100%",
    descripcion: "Largo hasta el tobillo, tirante ancho, espalda descubierta. La prenda que da nombre a la casa: una sola pieza, cero decisiones, andá.",
    talles: ["XS", "S", "M", "L"],
    masVendido: true, trending: true,
  },
  {
    id: "vestido-xcacel",
    nombre: "Vestido Xcacel",
    categoria: "vestidos", precio: 104, tono: "#DDD0BA", foto: "/prendas/ejqLADn6aOI.jpg",
    colores: ["Arena", "Terracota suave"],
    tela: "Lino y viscosa de bambú",
    descripcion: "Corte camisero, cinto del mismo género, botones hasta la mitad. El bambú le suma caída sin quitarle la textura del lino.",
    talles: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "vestido-yalku",
    nombre: "Vestido Yal-kú",
    categoria: "vestidos", precio: 132, tono: "#9FB5B0", foto: "/prendas/hElEUd24xQo.jpg",
    colores: ["Verde cenote", "Crudo"],
    tela: "Lino tejido a mano",
    descripcion: "Manga japonesa, largo midi, un solo bolsillo escondido en la costura. Teñido con añil natural en tandas de veinte piezas, así que ningún verde es idéntico a otro.",
    talles: ["S", "M", "L"],
    nuevo: true,
  },
  {
    id: "tunica-chichen",
    nombre: "Túnica Chichén",
    categoria: "tunicas", precio: 92, tono: "#EDE4D2", foto: "/prendas/CXeCybhbBvY.jpg",
    colores: ["Crudo", "Arena"],
    tela: "Lino grueso 100%",
    descripcion: "Cuello en V abierto, largo hasta la rodilla, aberturas laterales altas. La forma más antigua de vestirse que sigue funcionando: un rectángulo de tela que sabe dónde caer.",
    talles: ["Único"],
    masVendido: true,
  },
  {
    id: "tunica-uxmal",
    nombre: "Túnica Uxmal",
    categoria: "tunicas", precio: 86, tono: "#C4B69C", foto: "/prendas/lqgOR1i-C3w.jpg",
    colores: ["Henequén", "Blanco cal"],
    tela: "Algodón de telar yucateco",
    descripcion: "Bordado a mano en el escote, hecho por artesanas de Tixkokob. Cada bordado lleva entre cuatro y seis horas — es lo que separa esto de una prenda de vitrina.",
    talles: ["S/M", "L/XL"],
    trending: true,
  },
  {
    id: "tunica-ekbalam",
    nombre: "Túnica Ek Balam",
    categoria: "tunicas", precio: 78, tono: "#D6CCBC", foto: "/prendas/cYRsB4liZPs.jpg",
    colores: ["Arena", "Negro humo"],
    tela: "Lino liviano",
    descripcion: "La versión corta, para arriba de un pantalón o de un traje de baño. Sin botones, sin cierre, sin nada que se pueda romper.",
    talles: ["XS", "S", "M", "L"],
  },
  {
    id: "falda-punta-allen",
    nombre: "Falda Punta Allen",
    categoria: "faldas", precio: 84, tono: "#E7DECB", foto: "/prendas/9-xnHXRylvQ.jpg",
    colores: ["Arena", "Crudo"],
    tela: "Lino lavado 100%",
    descripcion: "Largo hasta el tobillo, cintura elástica cubierta, dos bolsillos profundos de verdad. Se camina, se sienta en la arena y se sacude.",
    talles: ["XS", "S", "M", "L"],
    masVendido: true,
  },
  {
    id: "falda-zamas",
    nombre: "Falda Zamás",
    categoria: "faldas", precio: 76, tono: "#BFC9C0", foto: "/prendas/I12enD_yuEs.jpg",
    colores: ["Verde laguna", "Blanco cal"],
    tela: "Ramio y algodón",
    descripcion: "Cruzada, se ata al costado. Un solo talle que se ajusta al cuerpo en vez de al revés.",
    talles: ["Único"],
    nuevo: true, trending: true,
  },
  {
    id: "sombrero-coba",
    nombre: "Sombrero Cobá",
    categoria: "accesorios", precio: 58, tono: "#D8C9A6", foto: "/prendas/j2xVSId3nWI.jpg",
    colores: ["Palma natural"],
    tela: "Palma jipijapa tejida a mano",
    descripcion: "Tejido en Bécal, donde lo hacen dentro de cuevas para que la humedad mantenga la fibra flexible. Se enrolla, viaja en el bolso y vuelve a su forma.",
    talles: ["55", "57", "59", "61"],
    masVendido: true, trending: true,
  },
  {
    id: "bolso-sisal",
    nombre: "Bolso Sisal",
    categoria: "accesorios", precio: 64, tono: "#C7B896", foto: "/prendas/HbiRi1Owk9k.jpg",
    colores: ["Henequén natural"],
    tela: "Fibra de henequén y cuero vegetal",
    descripcion: "El henequén fue la fibra que hizo rica a Yucatán durante un siglo. Este bolso está hecho con la misma planta, por la misma gente, en el mismo lugar.",
    talles: ["Único"],
  },
  {
    id: "panuelo-akbal",
    nombre: "Pañuelo Akbal",
    categoria: "accesorios", precio: 38, tono: "#A9BDB7", foto: "/prendas/N_wGDmRL4hQ.jpg",
    colores: ["Verde cenote", "Arena", "Crudo"],
    tela: "Lino liviano teñido a mano",
    descripcion: "Noventa por noventa. Al cuello, en la cabeza, atado al bolso o como mantel de picnic. El accesorio más barato y el que más se usa.",
    talles: ["Único"],
    nuevo: true,
  },
  {
    id: "cinto-henequen",
    nombre: "Cinto Henequén",
    categoria: "accesorios", precio: 46, tono: "#B5A182", foto: "/prendas/HbiRi1Owk9k.jpg",
    colores: ["Natural", "Tabaco"],
    tela: "Trenzado de henequén con hebilla de latón",
    descripcion: "Latón sin lacar: se va oxidando y se pone más lindo. Si lo querés brillante otra vez, se limpia con limón.",
    talles: ["S", "M", "L"],
  },
  {
    id: "camisa-tulum-noche",
    nombre: "Camisa Tulum Noche",
    categoria: "camisas", precio: 89, tono: "#3E4340", foto: "/prendas/kXsBsAp5Q0Y.jpg",
    colores: ["Negro humo", "Verde cenote"],
    tela: "Lino belga teñido en prenda",
    descripcion: "La única pieza oscura de la casa. Mismo corte que la Sian Ka'an, teñida después de confeccionada para que el color quede parejo hasta en las costuras.",
    talles: ["S", "M", "L", "XL"],
    trending: true,
  },
  {
    id: "pantalon-corto-sac",
    nombre: "Pantalón Corto Sac",
    categoria: "pantalones", precio: 58, tono: "#EAE0CC", foto: "/prendas/CIPgEBCE1oI.jpg",
    colores: ["Crudo", "Arena", "Verde laguna"],
    tela: "Lino lavado 100%",
    descripcion: "Largo arriba de la rodilla, cordón de algodón, dos bolsillos. Lo más simple del catálogo y probablemente lo que más te vas a poner.",
    talles: ["XS", "S", "M", "L", "XL"],
    masVendido: true,
  },
  {
    id: "vestido-corto-nohoch",
    nombre: "Vestido Corto Nohoch",
    categoria: "vestidos", precio: 88, tono: "#E0D4BE", foto: "/prendas/PJ6AlcNyscg.jpg",
    colores: ["Arena", "Blanco cal"],
    tela: "Lino y algodón orgánico",
    descripcion: "Corte recto, sin cintura marcada, largo arriba de la rodilla. Diseñado para que no haya que pensarlo: se pone y se sale.",
    talles: ["XS", "S", "M", "L"],
    nuevo: true,
  },
  {
    id: "tunica-larga-kaan",
    nombre: "Túnica Larga Ka'an",
    categoria: "tunicas", precio: 108, tono: "#F0E8D9", foto: "/prendas/nAJEr8KlUnE.jpg",
    colores: ["Blanco cal", "Crudo"],
    tela: "Lino belga liviano",
    descripcion: "Hasta el tobillo, translúcida al sol. Pensada como salida de baño pero termina usándose todo el día, que es el mejor destino que puede tener una prenda.",
    talles: ["S/M", "L/XL"],
    trending: true,
  },
  {
    id: "falda-corta-tankah",
    nombre: "Falda Corta Tankah",
    categoria: "faldas", precio: 62, tono: "#D3C6AF", foto: "/prendas/8p6s8h6BNjg.jpg",
    colores: ["Arena", "Henequén"],
    tela: "Lino lavado",
    descripcion: "Cintura alta, largo midi corto, un tajo lateral discreto. La que entra en el bolso sin ocupar nada.",
    talles: ["XS", "S", "M", "L"],
  },
];

export const ORDENES = [
  { slug: "destacados",   nombre: "Destacados" },
  { slug: "precio-asc",   nombre: "Precio: menor a mayor" },
  { slug: "precio-desc",  nombre: "Precio: mayor a menor" },
  { slug: "nombre",       nombre: "Nombre A–Z" },
  { slug: "nuevos",       nombre: "Novedades primero" },
] as const;

export type OrdenSlug = (typeof ORDENES)[number]["slug"];
