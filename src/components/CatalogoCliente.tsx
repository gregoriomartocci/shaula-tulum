"use client";

import { useMemo, useState } from "react";
import ProductoCard from "./ProductoCard";
import {
  CATEGORIAS, ORDENES,
  type Categoria, type OrdenSlug, type Producto,
} from "@/data/productos";

type RangoSlug = "todos" | "hasta-60" | "60-90" | "desde-90";

const RANGOS: { slug: RangoSlug; nombre: string; test: (p: Producto) => boolean }[] = [
  { slug: "todos",    nombre: "Cualquier precio", test: () => true },
  { slug: "hasta-60", nombre: "Hasta $60",        test: (p) => p.precio <= 60 },
  { slug: "60-90",    nombre: "$60 a $90",        test: (p) => p.precio > 60 && p.precio <= 90 },
  { slug: "desde-90", nombre: "Más de $90",       test: (p) => p.precio > 90 },
];

function pesoDestacado(p: Producto) {
  return (p.masVendido ? 4 : 0) + (p.trending ? 2 : 0) + (p.nuevo ? 1 : 0);
}

/* Los dos <select> comparten forma: la flecha va dibujada en el fondo para
   no depender del control nativo, que en iOS se ve distinto. */
const SELECT =
  "appearance-none rounded-full border border-arena-hondo bg-cal py-2 pl-3.5 pr-8 text-[13px] " +
  "text-tinta focus:border-madera focus:outline-none bg-no-repeat " +
  "[background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236b6157' stroke-width='1.4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")] " +
  "[background-position:right_0.85rem_center]";

function Chip({
  activo, onClick, children,
}: { activo: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activo}
      className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[13px] transition-colors ${
        activo
          ? "border-madera bg-madera text-cal"
          : "border-arena-hondo bg-transparent text-sombra hover:border-madera hover:text-madera"
      }`}
    >
      {children}
    </button>
  );
}

export default function CatalogoCliente({
  productos,
  categoriaInicial = "todas",
}: {
  /* Vienen del servidor (base de datos o semilla). El componente sólo
     filtra y ordena: no sabe de dónde salieron. */
  productos: Producto[];
  categoriaInicial?: Categoria | "todas";
}) {
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState<Categoria | "todas">(categoriaInicial);
  const [rango, setRango] = useState<RangoSlug>("todos");
  const [orden, setOrden] = useState<OrdenSlug>("destacados");

  const resultado = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    const testRango = RANGOS.find((r) => r.slug === rango)!.test;

    const filtrados = productos.filter((p) => {
      if (categoria !== "todas" && p.categoria !== categoria) return false;
      if (!testRango(p)) return false;
      if (!q) return true;
      return [p.nombre, p.tela, p.descripcion, ...p.colores]
        .join(" ").toLowerCase().includes(q);
    });

    const ordenado = [...filtrados];
    switch (orden) {
      case "precio-asc":  ordenado.sort((a, b) => a.precio - b.precio); break;
      case "precio-desc": ordenado.sort((a, b) => b.precio - a.precio); break;
      case "nombre":      ordenado.sort((a, b) => a.nombre.localeCompare(b.nombre, "es")); break;
      case "nuevos":      ordenado.sort((a, b) => Number(!!b.nuevo) - Number(!!a.nuevo) || a.nombre.localeCompare(b.nombre, "es")); break;
      default:            ordenado.sort((a, b) => pesoDestacado(b) - pesoDestacado(a) || a.nombre.localeCompare(b.nombre, "es"));
    }
    return ordenado;
  }, [productos, busqueda, categoria, rango, orden]);

  const hayFiltros = busqueda !== "" || categoria !== "todas" || rango !== "todos";

  function limpiar() {
    setBusqueda(""); setCategoria("todas"); setRango("todos"); setOrden("destacados");
  }

  return (
    <>
      {/* ══ Controles ══
          Antes esto era un muro: doce chips que envolvían en cuatro filas y en
          el teléfono se comían media pantalla. Ahora son DOS renglones fijos:
          buscador + dos desplegables arriba, y las categorías en una tira que
          scrollea de costado sin envolver nunca. */}
      <div className="sticky top-[64px] z-30 -mx-5 border-b border-arena bg-cal/96 px-5 py-3 backdrop-blur-sm sm:top-[72px] sm:-mx-8 sm:px-8">
        <div className="mx-auto max-w-6xl space-y-2.5">
          <div className="flex items-center gap-2">
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">Buscar prendas</span>
              <input
                type="search"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar prenda, tela o color…"
                className="w-full rounded-full border border-arena-hondo bg-cal px-4 py-2 text-[14px] text-tinta
                           placeholder:text-sombra/70 focus:border-madera focus:outline-none"
              />
            </label>

            <label className="shrink-0">
              <span className="sr-only">Rango de precio</span>
              <select className={SELECT} value={rango} onChange={(e) => setRango(e.target.value as RangoSlug)}>
                {RANGOS.map((r) => <option key={r.slug} value={r.slug}>{r.nombre}</option>)}
              </select>
            </label>

            <label className="hidden shrink-0 sm:block">
              <span className="sr-only">Ordenar por</span>
              <select className={SELECT} value={orden} onChange={(e) => setOrden(e.target.value as OrdenSlug)}>
                {ORDENES.map((o) => <option key={o.slug} value={o.slug}>{o.nombre}</option>)}
              </select>
            </label>
          </div>

          <div className="tira-envoltura">
            <div className="tira">
              <Chip activo={categoria === "todas"} onClick={() => setCategoria("todas")}>Todo</Chip>
              {CATEGORIAS.map((c) => (
                <Chip key={c.slug} activo={categoria === c.slug} onClick={() => setCategoria(c.slug)}>
                  {c.nombre}
                </Chip>
              ))}
            </div>
          </div>

          {/* En móvil el orden no entra arriba: va acá, sin ocupar una fila propia. */}
          <label className="flex items-center gap-2 sm:hidden">
            <span className="text-[12px] text-sombra">Ordenar</span>
            <select className={`${SELECT} flex-1`} value={orden} onChange={(e) => setOrden(e.target.value as OrdenSlug)}>
              {ORDENES.map((o) => <option key={o.slug} value={o.slug}>{o.nombre}</option>)}
            </select>
          </label>
        </div>
      </div>

      {/* ══ Resultado ══ */}
      <div className="mx-auto max-w-6xl">
        <div className="flex items-baseline justify-between gap-4 py-5">
          <p className="text-[13px] text-sombra">
            {resultado.length === 0
              ? "Ninguna pieza coincide"
              : `${resultado.length} ${resultado.length === 1 ? "pieza" : "piezas"}`}
          </p>
          {hayFiltros && (
            <button
              type="button"
              onClick={limpiar}
              className="text-[13px] text-madera underline underline-offset-4 hover:text-madera-claro"
            >
              Limpiar
            </button>
          )}
        </div>

        {resultado.length === 0 ? (
          <div className="rounded-[3px] border border-dashed border-arena-hondo px-6 py-16 text-center">
            <p className="font-display text-[20px] font-medium text-tinta">No encontramos esa pieza</p>
            <p className="medida mx-auto mt-2 text-[14px] text-sombra">
              Probá con menos filtros, o escribinos: casi todo se hace a pedido en
              talles y colores que no están listados.
            </p>
            <button
              type="button"
              onClick={limpiar}
              className="mt-5 rounded-full border border-madera px-5 py-2 text-[13px] text-madera transition-colors hover:bg-madera hover:text-cal"
            >
              Ver todo el catálogo
            </button>
          </div>
        ) : (
          /* Una sola columna en el teléfono: la tarjeta ocupa el ancho entero y
             la foto se ve grande, que es como se mira ropa. Dos por fila en
             móvil dejaba las prendas del tamaño de una estampilla. */
          <div className="grid grid-cols-1 gap-x-5 gap-y-10 pb-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {resultado.map((p, i) => (
              <ProductoCard key={p.id} p={p} prioridad={i < 2} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
