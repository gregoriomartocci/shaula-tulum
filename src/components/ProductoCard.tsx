import Image from "next/image";
import Link from "next/link";
import MuestraTela from "./MuestraTela";
import { CATEGORIAS, type Producto } from "@/data/productos";

function Sello({ texto, tono }: { texto: string; tono: "madera" | "henequen" }) {
  const clase =
    tono === "madera"
      ? "border-madera/30 bg-cal/90 text-madera"
      : "border-henequen/40 bg-cal/90 text-[#7d6647]";
  return (
    <span className={`rounded-full border px-2 py-[3px] text-[10px] font-bold tracking-wide backdrop-blur-sm ${clase}`}>
      {texto}
    </span>
  );
}

export default function ProductoCard({
  p,
  ancho,
  prioridad,
}: {
  p: Producto;
  /** Para los carruseles de la landing: ancho fijo en vez de celda de grilla. */
  ancho?: boolean;
  /** La primera fila de la grilla se carga con prioridad (LCP). */
  prioridad?: boolean;
}) {
  const categoria = CATEGORIAS.find((c) => c.slug === p.categoria)?.nombre ?? p.categoria;

  return (
    <Link
      href={`/catalogo/${p.id}`}
      className={`group block ${ancho ? "w-[240px] sm:w-[268px]" : ""}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] ring-1 ring-inset ring-black/[0.07]">
        {p.foto ? (
          <Image
            src={p.foto}
            alt={p.nombre}
            fill
            /* En móvil la tarjeta ocupa el ancho completo, así que se pide
               una imagen grande; de tablet para arriba entran 2–4 por fila. */
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
            priority={prioridad}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]"
          />
        ) : (
          <MuestraTela tono={p.tono} className="h-full w-full" />
        )}

        <div className="absolute left-2.5 top-2.5 z-10 flex flex-wrap gap-1.5">
          {p.masVendido && <Sello texto="Más vendido" tono="madera" />}
          {p.nuevo && <Sello texto="Nuevo" tono="henequen" />}
        </div>
      </div>

      <div className="pt-3">
        <p className="eyebrow text-[10px]">{categoria}</p>
        <h3 className="mt-1 font-display text-[17px] font-medium leading-snug text-tinta transition-colors group-hover:text-madera sm:text-[18px]">
          {p.nombre}
        </h3>
        <p className="mt-0.5 text-[13px] text-sombra">{p.tela}</p>
        <div className="mt-2 flex items-baseline justify-between gap-3">
          <span className="text-[15px] font-medium tabular-nums text-tinta">${p.precio}</span>
          <span className="text-[12px] text-sombra">
            {p.colores.length} {p.colores.length === 1 ? "color" : "colores"}
          </span>
        </div>
      </div>
    </Link>
  );
}
