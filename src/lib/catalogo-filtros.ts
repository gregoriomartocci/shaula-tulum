import type { Categoria, OrdenSlug, Producto, Variante } from "@/data/productos";

/* Filtrado y orden del catálogo, sin React.

   El catálogo no lista tres productos: lista cada COLOR de cada producto,
   porque eso es lo que un visitante viene a mirar. Una ficha es entonces
   el par (prenda, color) — la camisa lila, el pantalón olivo — y este
   archivo la arma, la filtra y la ordena.

   Vive fuera del componente para poder probarlo sin montar React: entran
   productos y criterios, salen fichas. */

/** Un color de una prenda, listo para mostrar como tarjeta. */
export interface Ficha {
  producto: Producto;
  variante: Variante;
  /** Clave estable para React y para la URL: "camisa-lila". */
  clave: string;
}

export interface Criterios {
  busqueda: string;
  categoria: Categoria | "todas";
  orden: OrdenSlug;
}

/** El orden natural de las prendas: como se viste uno, de arriba abajo. */
const ORDEN_PRENDA: Categoria[] = ["camisas", "pantalones"];

export function fichas(productos: Producto[]): Ficha[] {
  return productos.flatMap((producto) =>
    producto.variantes.map((variante) => ({
      producto,
      variante,
      clave: `${producto.id}-${variante.slug}`,
    })),
  );
}

/* La búsqueda mira el color de ESTA ficha, el nombre de la prenda, la tela
   y la descripción — alguien que escribe "algodón", "lila" o "pantalón"
   tiene que encontrar algo.

   Ojo con lo que NO mira: los otros colores de la misma prenda. Si los
   mirara, buscar "lila" traería las once camisas (todas comparten la lista
   de colores) en vez de la camisa lila, que es justamente la tarjeta que
   la persona está buscando. */
function coincide(f: Ficha, q: string) {
  if (!q) return true;
  return [
    f.variante.nombre,
    f.producto.nombre,
    f.producto.subtitulo,
    f.producto.tela,
    f.producto.descripcion,
  ].join(" ").toLowerCase().includes(q);
}

export function filtrarYOrdenar(productos: Producto[], criterios: Criterios): Ficha[] {
  const q = criterios.busqueda.trim().toLowerCase();

  const filtradas = fichas(productos).filter((f) => {
    if (criterios.categoria !== "todas" && f.producto.categoria !== criterios.categoria) return false;
    return coincide(f, q);
  });

  const porColor = (a: Ficha, b: Ficha) =>
    a.variante.nombre.localeCompare(b.variante.nombre, "es");

  // Copia antes de ordenar: sort muta, y el array viene del servidor.
  const ordenadas = [...filtradas];
  if (criterios.orden === "color") {
    ordenadas.sort((a, b) => porColor(a, b) || ORDEN_PRENDA.indexOf(a.producto.categoria) - ORDEN_PRENDA.indexOf(b.producto.categoria));
  } else {
    // Por prenda: respeta el orden en que vienen los colores de cada
    // prenda (que es el orden pensado en el archivo de datos).
    ordenadas.sort(
      (a, b) =>
        ORDEN_PRENDA.indexOf(a.producto.categoria) - ORDEN_PRENDA.indexOf(b.producto.categoria) ||
        a.producto.variantes.indexOf(a.variante) - b.producto.variantes.indexOf(b.variante),
    );
  }
  return ordenadas;
}

export function hayFiltrosActivos(c: Criterios) {
  return c.busqueda !== "" || c.categoria !== "todas" || c.orden !== "prenda";
}

/** Cuántos colores hay de cada prenda, para los contadores del catálogo. */
export function contarPorCategoria(productos: Producto[]) {
  const cuenta = new Map<Categoria, number>();
  for (const p of productos) {
    cuenta.set(p.categoria, (cuenta.get(p.categoria) ?? 0) + p.variantes.length);
  }
  return cuenta;
}
