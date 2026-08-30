import type { Categoria, OrdenSlug, Producto } from "@/data/productos";

/* Filtrado y orden del catálogo, sin React.

   Vivía adentro de un useMemo en CatalogoCliente, así que no había forma de
   probarlo sin montar el componente. Acá es una función pura: entran productos
   y criterios, salen productos. */

export type RangoSlug = "todos" | "hasta-60" | "60-90" | "desde-90";

export const RANGOS: { slug: RangoSlug; nombre: string; test: (p: Producto) => boolean }[] = [
  { slug: "todos",    nombre: "Cualquier precio", test: () => true },
  { slug: "hasta-60", nombre: "Hasta $60",        test: (p) => p.precio <= 60 },
  { slug: "60-90",    nombre: "$60 a $90",        test: (p) => p.precio > 60 && p.precio <= 90 },
  { slug: "desde-90", nombre: "Más de $90",       test: (p) => p.precio > 90 },
];

/** Un producto "destacado" pesa más si es más vendido que si es nuevo. */
export function pesoDestacado(p: Producto) {
  return (p.masVendido ? 4 : 0) + (p.trending ? 2 : 0) + (p.nuevo ? 1 : 0);
}

export interface Criterios {
  busqueda: string;
  categoria: Categoria | "todas";
  rango: RangoSlug;
  orden: OrdenSlug;
}

/** La búsqueda mira nombre, tela, descripción y colores — no sólo el nombre. */
function coincideBusqueda(p: Producto, q: string) {
  if (!q) return true;
  return [p.nombre, p.tela, p.descripcion, ...p.colores]
    .join(" ").toLowerCase().includes(q);
}

export function filtrarYOrdenar(productos: Producto[], criterios: Criterios): Producto[] {
  const q = criterios.busqueda.trim().toLowerCase();
  const testRango = RANGOS.find((r) => r.slug === criterios.rango)!.test;

  const filtrados = productos.filter((p) => {
    if (criterios.categoria !== "todas" && p.categoria !== criterios.categoria) return false;
    if (!testRango(p)) return false;
    return coincideBusqueda(p, q);
  });

  // Copia antes de ordenar: sort muta, y el array de productos viene del servidor.
  const ordenado = [...filtrados];
  const porNombre = (a: Producto, b: Producto) => a.nombre.localeCompare(b.nombre, "es");

  switch (criterios.orden) {
    case "precio-asc":  ordenado.sort((a, b) => a.precio - b.precio); break;
    case "precio-desc": ordenado.sort((a, b) => b.precio - a.precio); break;
    case "nombre":      ordenado.sort(porNombre); break;
    case "nuevos":      ordenado.sort((a, b) => Number(!!b.nuevo) - Number(!!a.nuevo) || porNombre(a, b)); break;
    default:            ordenado.sort((a, b) => pesoDestacado(b) - pesoDestacado(a) || porNombre(a, b));
  }
  return ordenado;
}

export function hayFiltrosActivos(c: Criterios) {
  return c.busqueda !== "" || c.categoria !== "todas" || c.rango !== "todos";
}
