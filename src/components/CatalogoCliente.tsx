"use client";

import { useMemo, useState } from "react";
import FichaColor from "./FichaColor";
import {
  CATEGORIAS, ORDENES,
  type Categoria, type OrdenSlug, type Producto,
} from "@/data/productos";
import {
  contarPorCategoria, filtrarYOrdenar, hayFiltrosActivos,
} from "@/lib/catalogo-filtros";

/* El catálogo lista COLORES, no prendas: la camisa lila y la camisa negra
   son dos tarjetas, porque son dos cosas distintas para quien mira. Los
   filtros son dos: qué prenda, y una búsqueda que entiende colores. */

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
  const [orden, setOrden] = useState<OrdenSlug>("prenda");

  const resultado = useMemo(
    () => filtrarYOrdenar(productos, { busqueda, categoria, orden }),
    [productos, busqueda, categoria, orden],
  );

  const cuenta = useMemo(() => contarPorCategoria(productos), [productos]);
  const total = useMemo(() => [...cuenta.values()].reduce((a, b) => a + b, 0), [cuenta]);
  const hayFiltros = hayFiltrosActivos({ busqueda, categoria, orden });

  function limpiar() {
    setBusqueda(""); setCategoria("todas"); setOrden("prenda");
  }

  return (
    <>
      {/* ══ Controles ══
          Dos renglones fijos: buscador y orden arriba, las prendas en una
          tira que scrollea de costado sin envolver nunca. */}
      <div className="sticky top-[64px] z-30 -mx-5 border-b border-arena bg-cal/96 px-5 py-3 backdrop-blur-sm sm:top-[72px] sm:-mx-8 sm:px-8">
        <div className="mx-auto max-w-6xl space-y-2.5">
          <div className="flex items-center gap-2">
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">Buscar por color o prenda</span>
              <input
                type="search"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar un color: lila, terracota, crudo…"
                className="w-full rounded-full border border-arena-hondo bg-cal px-4 py-2 text-[14px] text-tinta
                           placeholder:text-sombra/70 focus:border-madera focus:outline-none"
              />
            </label>

            <label className="shrink-0">
              <span className="sr-only">Ordenar por</span>
              <select className={SELECT} value={orden} onChange={(e) => setOrden(e.target.value as OrdenSlug)}>
                {ORDENES.map((o) => <option key={o.slug} value={o.slug}>{o.nombre}</option>)}
              </select>
            </label>
          </div>

          <div className="tira-envoltura">
            <div className="tira">
              <Chip activo={categoria === "todas"} onClick={() => setCategoria("todas")}>
                Todo <span className="opacity-60">· {total}</span>
              </Chip>
              {CATEGORIAS.map((c) => (
                <Chip key={c.slug} activo={categoria === c.slug} onClick={() => setCategoria(c.slug)}>
                  {c.nombre} <span className="opacity-60">· {cuenta.get(c.slug) ?? 0}</span>
                </Chip>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══ Resultado ══ */}
      <div className="mx-auto max-w-6xl">
        <div className="flex items-baseline justify-between gap-4 py-5">
          <p className="text-[13px] text-sombra">
            {resultado.length === 0
              ? "Ningún color coincide"
              : `${resultado.length} ${resultado.length === 1 ? "color" : "colores"}`}
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
            <p className="font-display text-[20px] font-medium text-tinta">No tenemos ese color</p>
            <p className="medida mx-auto mt-2 text-[14px] text-sombra">
              Probá con menos filtros, o escribinos: el teñido es artesanal y casi
              cualquier tono se puede hacer a pedido.
            </p>
            <button
              type="button"
              onClick={limpiar}
              className="mt-5 rounded-full border border-madera px-5 py-2 text-[13px] text-madera transition-colors hover:bg-madera hover:text-cal"
            >
              Ver todos los colores
            </button>
          </div>
        ) : (
          /* Una sola columna en el teléfono: la tarjeta ocupa el ancho entero
             y la foto se ve grande, que es como se mira ropa. */
          <div className="grid grid-cols-1 gap-x-5 gap-y-10 pb-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {resultado.map((f, i) => (
              <FichaColor key={f.clave} f={f} prioridad={i < 2} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
