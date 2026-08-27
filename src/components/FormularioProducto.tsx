"use client";

import { useActionState } from "react";
import Link from "next/link";
import { CATEGORIAS } from "@/data/productos";
import type { ProductoDb } from "@/db/schema";

type Accion = (prev: unknown, form: FormData) => Promise<{ error?: string } | void>;

const CAMPO =
  "w-full rounded-[3px] border border-arena-hondo bg-cal px-3.5 py-2.5 text-[14px] " +
  "text-tinta placeholder:text-sombra/60 focus:border-madera focus:outline-none";

function Campo({
  etiqueta, ayuda, children,
}: { etiqueta: string; ayuda?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow mb-1.5 block">{etiqueta}</span>
      {children}
      {ayuda && <span className="mt-1 block text-[12px] leading-snug text-sombra">{ayuda}</span>}
    </label>
  );
}

export default function FormularioProducto({
  accion, producto, titulo,
}: { accion: Accion; producto?: ProductoDb; titulo: string }) {
  const [estado, enviar, pendiente] = useActionState(accion, null as { error?: string } | null | void);
  const p = producto;

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <h1 className="display-md text-[26px] font-medium text-tinta">{titulo}</h1>
        <Link href="/admin" className="text-[13px] text-sombra underline underline-offset-4 hover:text-madera">
          ← Volver
        </Link>
      </div>

      <form action={enviar} className="mt-7 space-y-5">
        {p && <input type="hidden" name="id" value={p.id} />}

        <div className="grid gap-4 sm:grid-cols-2">
          <Campo etiqueta="Nombre *">
            <input name="nombre" required defaultValue={p?.nombre} className={CAMPO} placeholder="Camisa Sian Ka'an" />
          </Campo>
          {!p && (
            <Campo etiqueta="Identificador" ayuda="Se usa en la dirección web. Si lo dejás vacío se arma solo con el nombre.">
              <input name="id" className={CAMPO} placeholder="camisa-sian-kaan" />
            </Campo>
          )}
          <Campo etiqueta="Categoría">
            <select name="categoria" defaultValue={p?.categoria ?? "camisas"} className={CAMPO}>
              {CATEGORIAS.map((c) => <option key={c.slug} value={c.slug}>{c.nombre}</option>)}
            </select>
          </Campo>
          <Campo etiqueta="Precio (USD) *">
            <input name="precio" type="number" min={0} step={1} required defaultValue={p?.precio ?? ""} className={CAMPO} />
          </Campo>
          <Campo etiqueta="Stock" ayuda="Vacío = no se lleva control. Cero = agotada.">
            <input name="stock" type="number" min={0} step={1} defaultValue={p?.stock ?? ""} className={CAMPO} placeholder="—" />
          </Campo>
          <Campo etiqueta="Orden" ayuda="Más chico aparece antes. Empatan por nombre.">
            <input name="orden" type="number" step={1} defaultValue={p?.orden ?? 0} className={CAMPO} />
          </Campo>
        </div>

        <Campo etiqueta="Tela">
          <input name="tela" defaultValue={p?.tela} className={CAMPO} placeholder="Lino belga 100%, lavado en piedra" />
        </Campo>

        <Campo etiqueta="Descripción">
          <textarea name="descripcion" defaultValue={p?.descripcion} className={`${CAMPO} min-h-[120px] resize-y`} />
        </Campo>

        <div className="grid gap-4 sm:grid-cols-2">
          <Campo etiqueta="Colores" ayuda="Separados por coma.">
            <input name="colores" defaultValue={p?.colores?.join(", ")} className={CAMPO} placeholder="Crudo, Arena, Verde cenote" />
          </Campo>
          <Campo etiqueta="Talles" ayuda="Separados por coma.">
            <input name="talles" defaultValue={p?.talles?.join(", ")} className={CAMPO} placeholder="XS, S, M, L, XL" />
          </Campo>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Campo etiqueta="Foto" ayuda="Ruta dentro del sitio (/prendas/archivo.jpg) o una dirección web completa.">
            <input name="foto" defaultValue={p?.foto ?? ""} className={CAMPO} placeholder="/prendas/S4f4apZd-hA.jpg" />
          </Campo>
          <Campo etiqueta="Tono de respaldo" ayuda="Se usa como muestra de tela si no hay foto.">
            <input name="tono" type="color" defaultValue={p?.tono ?? "#e8dcc8"} className="h-[42px] w-full rounded-[3px] border border-arena-hondo bg-cal px-1.5" />
          </Campo>
        </div>

        <fieldset className="rounded-[3px] border border-arena px-4 py-3.5">
          <legend className="eyebrow px-1">Destacados</legend>
          <div className="flex flex-wrap gap-x-6 gap-y-2.5">
            {([
              ["publicado", "Publicada en el sitio", p ? p.publicado : true],
              ["masVendido", "Más vendida", p?.masVendido ?? false],
              ["trending", "Tendencia", p?.trending ?? false],
              ["nuevo", "Novedad", p?.nuevo ?? false],
            ] as const).map(([name, txt, def]) => (
              <label key={name} className="flex items-center gap-2 text-[14px] text-tinta">
                <input type="checkbox" name={name} defaultChecked={def} className="h-4 w-4 accent-[#7d5a3c]" />
                {txt}
              </label>
            ))}
          </div>
        </fieldset>

        {estado?.error && (
          <p className="rounded-[3px] border border-red-300 bg-red-50 px-3 py-2 text-[13px] text-red-800">
            {estado.error}
          </p>
        )}

        <div className="flex items-center gap-4 pt-1">
          <button
            disabled={pendiente}
            className="rounded-full bg-madera px-7 py-2.5 text-[14px] font-medium text-cal transition-colors hover:bg-tinta disabled:opacity-60"
          >
            {pendiente ? "Guardando…" : p ? "Guardar cambios" : "Crear pieza"}
          </button>
          <Link href="/admin" className="text-[13px] text-sombra hover:text-madera">Cancelar</Link>
        </div>
      </form>
    </>
  );
}
