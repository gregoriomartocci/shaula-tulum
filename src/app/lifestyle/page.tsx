import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITIO } from "@/lib/sitio";

export const metadata: Metadata = {
  title: "Lifestyle — la ropa puesta, en Tulum y en la ciudad",
  description:
    "Camisas y pantalones Shaula Tulum puestos: en las calles de Tulum, frente al mar y en la ciudad. " +
    "Ropa hecha a mano para el calor del Caribe mexicano.",
  alternates: { canonical: "/lifestyle" },
  openGraph: { type: "website", url: "/lifestyle", title: "Lifestyle · Shaula Tulum" },
};

/* Grilla pareja de fotos 4:5, con la primera en grande: así las filas
   cierran sin huecos (en desktop la grande ocupa cuatro celdas y las
   otras ocho completan cuatro filas de tres). Entre los looks se
   intercalan fotos de taller —la percha, las pilas dobladas— para darle
   ritmo a una serie que hoy es casi toda de la misma sesión.

   Las que muestran una prenda reconocible llevan su leyenda con enlace a
   ese color en el catálogo: quien se enamora de la foto llega a la ficha
   en un toque. */
type Foto = {
  src: string;
  alt: string;
  prenda?: { texto: string; href: string };
};

const FOTOS: Foto[] = [
  {
    src: "/media/look-arena-1.jpg",
    alt: "Camisa crudo y pantalón claro, caminando frente a una fachada antigua",
    prenda: { texto: "Camisa Crudo", href: "/catalogo/camisa?color=crudo" },
  },
  {
    src: "/media/look-pistacho-2.jpg",
    alt: "Camisa verde pistacho contra una pared amarilla en Tulum",
    prenda: { texto: "Camisa Verde Pistacho", href: "/catalogo/camisa?color=pistacho" },
  },
  { src: "/media/camisas-dobladas-4.jpg", alt: "Camisas dobladas en tonos verde, mostaza y rosa" },
  {
    src: "/media/look-atardecer-1.jpg",
    alt: "Camisa mostaza y camisa crudo frente al mar al atardecer",
    prenda: { texto: "Camisa Mostaza", href: "/catalogo/camisa?color=mostaza" },
  },
  {
    src: "/media/look-pistacho-4.jpg",
    alt: "Recargado en una pared amarilla con camisa pistacho y pantalón corto",
    prenda: { texto: "Camisa Verde Pistacho", href: "/catalogo/camisa?color=pistacho" },
  },
  { src: "/media/camisas-percha-2.jpg", alt: "Percha con camisas en sus distintos tonos, al sol" },
  {
    src: "/media/look-pistacho-3.jpg",
    alt: "Camisa pistacho con pantalón corto arena",
    prenda: { texto: "Camisa Verde Pistacho", href: "/catalogo/camisa?color=pistacho" },
  },
  { src: "/media/pantalones-grupo-1.jpg", alt: "Pantalones de pinzas doblados, en negro, arena, terracota y olivo" },
  {
    src: "/media/look-pistacho-5.jpg",
    alt: "Detalle de la camisa pistacho puesta, con un morral tejido",
    prenda: { texto: "Camisa Verde Pistacho", href: "/catalogo/camisa?color=pistacho" },
  },
];

export default function LifestylePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
      <p className="eyebrow">Lifestyle</p>
      <h1 className="display-md mt-1.5 text-[32px] text-tinta sm:text-[40px]">Fuera de la percha</h1>
      <p className="medida mt-3 text-[15px] leading-relaxed text-sombra">
        La ropa puesta, en las calles de Tulum, frente al mar y en la ciudad. Prendas
        que acompañan el día sin pedir atención.
      </p>

      <div className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {FOTOS.map((f, i) => (
          <figure
            key={f.src}
            className={`relative overflow-hidden rounded-[3px] ring-1 ring-inset ring-black/[0.07] ${
              i === 0 ? "aspect-[4/5] sm:col-span-2 sm:aspect-[8/5] lg:row-span-2 lg:aspect-auto" : "aspect-[4/5]"
            }`}
          >
            <Image
              src={f.src}
              alt={f.alt}
              fill
              sizes={i === 0 ? "(max-width: 639px) 100vw, 66vw" : "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"}
              priority={i < 3}
              className="object-cover"
            />
            {/* La leyenda va sobre la foto, en una chapita: así todas las
                celdas miden lo mismo, tengan leyenda o no. */}
            {f.prenda && (
              <figcaption className="absolute bottom-3 left-3">
                <Link
                  href={f.prenda.href}
                  className="inline-flex min-h-9 items-center rounded-full bg-tinta/70 px-3.5 text-[13px] font-medium text-cal backdrop-blur-[2px] transition-colors hover:bg-tinta/90"
                >
                  {f.prenda.texto} →
                </Link>
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <Link
          href="/catalogo"
          className="inline-flex min-h-12 items-center rounded-full bg-madera px-7 text-[15px] font-medium text-cal transition-colors hover:bg-tinta"
        >
          Ver catálogo
        </Link>
        <a
          href={SITIO.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center rounded-full border border-madera/40 px-6 text-[15px] text-tinta transition-colors hover:bg-arena"
        >
          Más en Instagram · @shaula_tulum
        </a>
      </div>
    </div>
  );
}
