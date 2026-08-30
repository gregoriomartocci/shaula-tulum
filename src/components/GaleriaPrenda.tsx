"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { Producto, Variante } from "@/data/productos";

/* La ficha de una prenda: elegir color y mirarlo.

   El color no es un dato al costado — es lo único que cambia entre una
   prenda y otra en esta casa. Por eso el selector no lista nombres: pinta
   la tela. Y al cambiar de color cambia TODA la galería, porque cada tono
   tiene sus propias fotos y su propio video.

   La dirección web se mantiene al día (?color=lila) con replaceState, así
   se puede compartir el enlace de un color sin recargar la página. */

type Medio =
  | { tipo: "foto"; src: string }
  | { tipo: "video"; src: string; poster: string };

function mediosDe(v: Variante): Medio[] {
  return [
    ...v.fotos.map((src) => ({ tipo: "foto" as const, src })),
    ...(v.videos ?? []).map((x) => ({ tipo: "video" as const, src: x.src, poster: x.poster })),
  ];
}

export default function GaleriaPrenda({
  producto,
  colorInicial,
}: {
  producto: Producto;
  colorInicial?: string;
}) {
  const inicial = Math.max(0, producto.variantes.findIndex((v) => v.slug === colorInicial));
  const [iColor, setIColor] = useState(inicial);
  const [iMedio, setIMedio] = useState(0);

  const variante = producto.variantes[iColor] ?? producto.variantes[0];
  const medios = useMemo(() => mediosDe(variante), [variante]);
  const medio = medios[Math.min(iMedio, medios.length - 1)];

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("color", variante.slug);
    window.history.replaceState(null, "", url);
  }, [variante.slug]);

  function elegirColor(i: number) {
    setIColor(i);
    setIMedio(0);
  }

  return (
    <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_20rem] md:gap-12 lg:grid-cols-[minmax(0,1fr)_23rem]">
      {/* ══ Galería ══ */}
      <div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-cal-hondo ring-1 ring-inset ring-black/[0.07]">
          {medio?.tipo === "video" ? (
            <video
              key={medio.src}
              src={medio.src}
              poster={medio.poster}
              controls
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          ) : medio ? (
            <Image
              key={medio.src}
              src={medio.src}
              alt={`${producto.nombre} en ${variante.nombre}`}
              fill
              priority
              sizes="(max-width: 767px) 100vw, 60vw"
              className="object-cover"
            />
          ) : null}
        </div>

        {medios.length > 1 && (
          <div className="rail mt-3">
            {medios.map((m, i) => {
              const activo = m.src === medio?.src;
              return (
                <button
                  key={m.src}
                  type="button"
                  onClick={() => setIMedio(i)}
                  aria-label={
                    m.tipo === "video"
                      ? `Ver el video de la prenda en ${variante.nombre}`
                      : `Ver la foto ${i + 1} en ${variante.nombre}`
                  }
                  aria-current={activo}
                  className={`relative h-[86px] w-[68px] overflow-hidden rounded-[3px] ring-1 ring-inset transition-all ${
                    activo ? "ring-2 ring-madera" : "ring-black/[0.07] hover:ring-madera/50"
                  }`}
                >
                  <Image
                    src={m.tipo === "video" ? m.poster : m.src}
                    alt=""
                    fill
                    sizes="68px"
                    className="object-cover"
                  />
                  {m.tipo === "video" && (
                    <span className="absolute inset-0 flex items-center justify-center bg-tinta/25">
                      <svg viewBox="0 0 12 12" className="h-4 w-4 fill-cal drop-shadow" aria-hidden>
                        <path d="M3 1.5l7 4.5-7 4.5z" />
                      </svg>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ══ Selector y datos ══ */}
      <div className="md:pt-1">
        <div className="flex items-baseline justify-between gap-3">
          <p className="eyebrow">Color</p>
          <p className="text-[14px] text-tinta">{variante.nombre}</p>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {producto.variantes.map((v, i) => {
            const activo = i === iColor;
            return (
              <button
                key={v.slug}
                type="button"
                onClick={() => elegirColor(i)}
                aria-pressed={activo}
                title={v.nombre}
                className={`relative h-9 w-9 rounded-full transition-transform ${
                  activo
                    ? "ring-2 ring-madera ring-offset-2 ring-offset-cal"
                    : "ring-1 ring-inset ring-black/15 hover:scale-105"
                }`}
                style={{ backgroundColor: v.hex }}
              >
                <span className="sr-only">{v.nombre}</span>
              </button>
            );
          })}
        </div>

        <dl className="mt-8 divide-y divide-arena border-y border-arena text-[14px]">
          {[
            ["Tela", producto.tela],
            ["Talles", producto.talles.join(" · ")],
            ["Colores", `${producto.variantes.length} tonos`],
          ].map(([k, v]) => (
            <div key={k} className="flex gap-5 py-3">
              <dt className="w-20 shrink-0 text-sombra">{k}</dt>
              <dd className="text-tinta">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-7 rounded-[3px] border border-arena-hondo bg-cal-hondo px-5 py-5">
          <p className="text-[14px] leading-relaxed text-tinta">
            {producto.precio != null ? (
              <>
                <span className="text-[20px] tabular-nums">${producto.precio}</span> — la compra se
                coordina por contacto directo.
              </>
            ) : (
              <>
                <span className="font-medium">Precio a consultar.</span> Este sitio es un catálogo:
                no hay compra en línea.
              </>
            )}{" "}
            Escribinos qué prenda, qué talle y qué color —{" "}
            <span className="text-tinta">{variante.nombre}</span>, por ejemplo — y lo coordinamos por ahí.
          </p>
          <a
            href={`/contacto?prenda=${encodeURIComponent(producto.nombre)}&color=${encodeURIComponent(variante.nombre)}`}
            className="mt-4 inline-block rounded-full bg-madera px-6 py-2.5 text-[14px] text-cal transition-colors hover:bg-tinta"
          >
            Consultar por esta prenda
          </a>
        </div>
      </div>
    </div>
  );
}
