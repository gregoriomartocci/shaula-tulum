import Image from "next/image";
import Link from "next/link";
import MuestraTela from "./MuestraTela";
import VistaPrevia from "./VistaPrevia";
import { formatoPrecio, precioDe } from "@/data/productos";
import type { Ficha } from "@/lib/catalogo-filtros";

/* Una tarjeta del catálogo = una prenda EN UN COLOR.

   Es la unidad que el visitante viene a mirar: no "la camisa", sino la
   camisa lila. Por eso la tarjeta muestra la foto de ese color y lleva
   directo a la ficha con ese color ya elegido. */

export default function FichaColor({
  f,
  ancho,
  prioridad,
}: {
  f: Ficha;
  /** Para los carruseles de la landing: ancho fijo en vez de celda de grilla. */
  ancho?: boolean;
  /** La primera fila de la grilla se carga con prioridad (LCP). */
  prioridad?: boolean;
}) {
  const { producto, variante } = f;
  const foto = variante.fotos[0];
  /* El primer video del color, si lo hay: con el mouse encima la tarjeta
     deja de ser una foto y pasa a ser la tela moviéndose. */
  const video = variante.videos?.[0];
  const precio = precioDe(producto, variante);

  return (
    <Link
      href={`/catalogo/${producto.id}?color=${variante.slug}`}
      className={`group block ${ancho ? "w-[240px] sm:w-[268px]" : ""}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] ring-1 ring-inset ring-black/[0.07]">
        {foto ? (
          <Image
            src={foto}
            alt={`${producto.nombre} en ${variante.nombre}`}
            fill
            /* En móvil la tarjeta ocupa el ancho completo, así que se pide
               una imagen grande; de tablet para arriba entran 2–4 por fila. */
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
            priority={prioridad}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]"
          />
        ) : (
          <MuestraTela tono={variante.hex} className="h-full w-full" />
        )}

        {video && (
          <>
            <VistaPrevia src={video.previa ?? video.src} poster={video.poster} />
            <span
              className="absolute right-2.5 top-2.5 z-10 flex items-center gap-1 rounded-full border border-cal/40 bg-tinta/55 px-2 py-[3px] text-[10.5px] font-semibold text-cal backdrop-blur-sm"
              title="Esta prenda tiene video"
            >
              <svg viewBox="0 0 10 10" className="h-2 w-2 fill-current" aria-hidden>
                <path d="M2 1l7 4-7 4z" />
              </svg>
              Video
            </span>
          </>
        )}
      </div>

      <div className="flex items-start gap-2.5 pt-3">
        <span
          className="mt-[5px] h-3.5 w-3.5 shrink-0 rounded-full ring-1 ring-inset ring-black/15"
          style={{ backgroundColor: variante.hex }}
          aria-hidden
        />
        <div className="min-w-0">
          <h3 className="font-display text-[17px] font-medium leading-snug text-tinta transition-colors group-hover:text-madera sm:text-[18px]">
            {variante.nombre}
          </h3>
          <p className="mt-0.5 text-[13px] text-sombra">{producto.nombre}</p>
          {precio != null && (
            <p className="mt-1 text-[14px] tabular-nums text-tinta">{formatoPrecio(precio)}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
