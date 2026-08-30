"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import BotonWhatsApp from "./BotonWhatsApp";
import type { Producto, Variante } from "@/data/productos";
import { hayWhatsApp } from "@/lib/sitio";

/* La ficha de una prenda: elegir color y mirarlo.

   El color no es un dato al costado — es lo único que cambia entre una
   prenda y otra en esta casa. Por eso el selector no lista nombres: pinta
   la tela. Y al cambiar de color cambia TODA la galería, porque cada tono
   tiene sus propias fotos y su propio video.

   La galería es un carrusel con scroll-snap, no un visor con botones: en
   el teléfono se pasa con el dedo, que es el gesto que la gente ya hace
   con las fotos. En desktop las miniaturas lo mueven. Las dos cosas son
   el mismo scroll, así que nunca se desincronizan.

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
  const carrusel = useRef<HTMLDivElement>(null);

  const variante = producto.variantes[iColor] ?? producto.variantes[0];
  const medios = useMemo(() => mediosDe(variante), [variante]);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("color", variante.slug);
    window.history.replaceState(null, "", url);
  }, [variante.slug]);

  /* Nada de un video sonando fuera de pantalla: al pasar de diapositiva,
     el que quedó atrás se pausa. */
  useEffect(() => {
    const el = carrusel.current;
    if (!el) return;
    const slides = [...el.children];
    el.querySelectorAll("video").forEach((v) => {
      const i = slides.indexOf(v.closest('[role="group"]') as Element);
      if (i !== iMedio) v.pause();
    });
  }, [iMedio]);

  const alScrollear = useCallback(() => {
    const el = carrusel.current;
    if (!el || !el.clientWidth) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    setIMedio((antes) => (antes === i ? antes : i));
  }, []);

  function irA(i: number) {
    const el = carrusel.current;
    if (!el) return;
    el.scrollTo({ left: el.clientWidth * i, behavior: "smooth" });
    setIMedio(i);
  }

  /* Al cambiar de color, la galería vuelve al principio de un salto: no es
     un movimiento que el visitante pidió, así que no se anima. Va acá y no
     en un efecto porque el color sólo cambia por un toque suyo. */
  function elegirColor(i: number) {
    setIColor(i);
    setIMedio(0);
    carrusel.current?.scrollTo({ left: 0, behavior: "instant" });
  }

  return (
    <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_20rem] md:gap-12 lg:grid-cols-[minmax(0,1fr)_23rem]">
      {/* ══ Galería ══ */}
      <div className="min-w-0">
        <div
          ref={carrusel}
          onScroll={alScrollear}
          tabIndex={0}
          aria-roledescription="carrusel"
          aria-label={`Fotos de ${producto.nombre} en ${variante.nombre}`}
          className="carrusel overflow-hidden rounded-[3px] ring-1 ring-inset ring-black/[0.07]"
        >
          {medios.map((m, i) => (
            <div
              key={m.src}
              role="group"
              aria-roledescription="diapositiva"
              aria-label={`${i + 1} de ${medios.length}`}
              className="relative aspect-[4/5] bg-cal-hondo"
            >
              {m.tipo === "video" ? (
                <video
                  src={m.src}
                  poster={m.poster}
                  controls
                  muted
                  loop
                  playsInline
                  preload="none"
                  className="h-full w-full object-cover"
                />
              ) : (
                <Image
                  src={m.src}
                  alt={`${producto.nombre} en ${variante.nombre}`}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 767px) 100vw, 60vw"
                  className="object-cover"
                />
              )}
            </div>
          ))}
        </div>

        {medios.length > 1 && (
          <>
            {/* Puntos: en el teléfono dicen cuántas fotos hay y dónde estás,
                sin robarle alto a la imagen. */}
            <div className="mt-3 flex items-center justify-center gap-1.5 sm:hidden">
              {medios.map((m, i) => (
                <button
                  key={m.src}
                  type="button"
                  onClick={() => irA(i)}
                  aria-label={`Ir a ${m.tipo === "video" ? "el video" : `la foto ${i + 1}`}`}
                  aria-current={i === iMedio}
                  className="grid h-11 w-7 place-items-center"
                >
                  <span
                    className={`block rounded-full transition-all ${
                      i === iMedio ? "h-2 w-2 bg-madera" : "h-1.5 w-1.5 bg-arena-hondo"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Miniaturas: de tablet para arriba, donde hay lugar y mouse. */}
            <div className="rail mt-3 hidden sm:flex">
              {medios.map((m, i) => {
                const activo = i === iMedio;
                return (
                  <button
                    key={m.src}
                    type="button"
                    onClick={() => irA(i)}
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
          </>
        )}
      </div>

      {/* ══ Selector y datos ══ */}
      <div className="min-w-0 md:pt-1">
        <div className="flex items-baseline justify-between gap-3">
          <p className="eyebrow">Color</p>
          <p className="text-[14px] text-tinta">{variante.nombre}</p>
        </div>

        {/* 44px de lado en el teléfono: es la medida de un dedo, y estos
            son los botones más importantes de la ficha. */}
        <div className="mt-3 flex flex-wrap gap-2.5 sm:gap-2">
          {producto.variantes.map((v, i) => {
            const activo = i === iColor;
            return (
              <button
                key={v.slug}
                type="button"
                onClick={() => elegirColor(i)}
                aria-pressed={activo}
                title={v.nombre}
                className={`relative h-11 w-11 rounded-full transition-transform sm:h-9 sm:w-9 ${
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
            ["Tallas", producto.talles.join(" · ")],
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
            Escríbenos qué prenda, qué talla y qué color —{" "}
            <span className="text-tinta">{variante.nombre}</span>, por ejemplo — y lo coordinamos por ahí.
          </p>

          {/* El mensaje va escrito con la prenda y el color que la persona
              está mirando: del otro lado nadie tiene que preguntar "¿cuál?". */}
          <BotonWhatsApp
            className="mt-4 w-full sm:w-auto"
            mensaje={`Hola, me interesa la ${producto.nombre} en ${variante.nombre}. ¿Me pasan precio y tallas disponibles?`}
          />
          <a
            href={`/contacto?prenda=${encodeURIComponent(producto.nombre)}&color=${encodeURIComponent(variante.nombre)}`}
            className={
              hayWhatsApp
                ? "mt-3 flex min-h-11 items-center justify-center text-[14px] text-madera underline underline-offset-4 hover:text-tinta"
                : "mt-4 flex min-h-12 items-center justify-center rounded-full bg-madera px-6 text-[15px] font-medium text-cal transition-colors hover:bg-tinta sm:inline-flex"
            }
          >
            {hayWhatsApp ? "O escríbenos por correo" : "Consultar por esta prenda"}
          </a>
        </div>
      </div>
    </div>
  );
}
