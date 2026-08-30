import Image from "next/image";
import Link from "next/link";
import MuestraTela from "./MuestraTela";
import VistaPrevia from "./VistaPrevia";
import { fotoPrincipal, videosDe, type Producto } from "@/data/productos";

/* La tarjeta grande de una prenda entera — camisa, pantalón o conjunto.

   Va en la landing, donde lo que importa no es un color sino la prenda y
   cuántos tonos hay de ella. Los colores se muestran como puntos: es la
   forma más corta de decir "hay once" sin escribir once nombres. */

export default function PrendaCard({ p, prioridad }: { p: Producto; prioridad?: boolean }) {
  const foto = fotoPrincipal(p);
  const video = videosDe(p)[0];

  return (
    <Link href={`/catalogo/${p.id}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] ring-1 ring-inset ring-black/[0.07]">
        {foto ? (
          <Image
            src={foto}
            alt={p.nombre}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
            priority={prioridad}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]"
          />
        ) : (
          <MuestraTela tono={p.tono} className="h-full w-full" />
        )}
        {video && <VistaPrevia src={video.previa ?? video.src} poster={video.poster} />}
      </div>

      <div className="pt-4">
        <h3 className="font-display text-[21px] font-medium leading-snug text-tinta transition-colors group-hover:text-madera sm:text-[23px]">
          {p.nombre}
        </h3>
        <p className="mt-1 text-[13.5px] text-sombra">{p.subtitulo}</p>

        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {p.variantes.map((v) => (
            <span
              key={v.slug}
              title={v.nombre}
              className="h-4 w-4 rounded-full ring-1 ring-inset ring-black/15"
              style={{ backgroundColor: v.hex }}
            />
          ))}
          <span className="ml-1 text-[12.5px] text-sombra">
            {p.variantes.length} {p.variantes.length === 1 ? "color" : "colores"}
          </span>
        </div>
      </div>
    </Link>
  );
}
