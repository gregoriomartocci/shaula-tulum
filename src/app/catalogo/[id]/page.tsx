import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import GaleriaPrenda from "@/components/GaleriaPrenda";
import PrendaCard from "@/components/PrendaCard";
import DatosEstructurados from "@/components/DatosEstructurados";
import { CATEGORIAS, coloresDe, videosDe, type Producto } from "@/data/productos";
import { getProducto, getProductos } from "@/lib/catalogo";
import { BASE, SITIO, url } from "@/lib/sitio";

export async function generateStaticParams() {
  const productos = await getProductos();
  return productos.map((p) => ({ id: p.id }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
): Promise<Metadata> {
  const { id } = await params;
  const p = await getProducto(id);
  if (!p) return { title: "Prenda no encontrada · Shaula Tulum" };
  const colores = coloresDe(p).join(", ");
  return {
    title: `${p.nombre} — ${p.subtitulo}`,
    /* La descripción que sale en Google: qué es, de qué está hecha, en qué
       colores y a dónde llega. Debajo de 160 caracteres para que no se
       corte a la mitad. */
    description: `${p.subtitulo}, en ${p.tela.toLowerCase()}. ${p.variantes.length} colores: ${colores}. Hecha a mano en Tulum, envíos a todo México.`,
    alternates: { canonical: `/catalogo/${p.id}` },
    openGraph: {
      type: "website",
      url: url(`/catalogo/${p.id}`),
      title: `${p.nombre} · ${SITIO.nombre}`,
      description: `${p.subtitulo}. ${p.variantes.length} colores teñidos a mano.`,
      images: p.variantes.flatMap((v) => v.fotos).slice(0, 4).map((f) => ({ url: f })),
    },
  };
}

/* La prenda, en el vocabulario de los buscadores. Los colores van como
   variantes del mismo producto, que es lo que son.

   Sin `offers` a propósito: no hay lista de precios publicada, y un precio
   inventado en los datos estructurados es exactamente la clase de cosa por
   la que Google penaliza una tienda. El día que haya precios, se agrega. */
function comoProducto(p: Producto) {
  return {
    "@context": "https://schema.org",
    "@type": "ProductGroup",
    "@id": `${BASE}/catalogo/${p.id}#producto`,
    name: p.nombre,
    description: p.descripcion,
    url: url(`/catalogo/${p.id}`),
    brand: { "@type": "Brand", name: SITIO.nombre },
    material: p.tela,
    countryOfOrigin: "MX",
    audience: { "@type": "PeopleAudience", geographicArea: { "@type": "Country", name: "México" } },
    variesBy: "https://schema.org/color",
    hasVariant: p.variantes.map((v) => ({
      "@type": "Product",
      name: `${p.nombre} en ${v.nombre}`,
      color: v.nombre,
      material: p.tela,
      size: p.talles,
      image: v.fotos.map((f) => url(f)),
      url: url(`/catalogo/${p.id}?color=${v.slug}`),
    })),
  };
}

function comoMigas(p: Producto, categoria?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Catálogo", item: url("/catalogo") },
      { "@type": "ListItem", position: 2, name: categoria ?? "", item: url(`/catalogo?categoria=${p.categoria}`) },
      { "@type": "ListItem", position: 3, name: p.nombre, item: url(`/catalogo/${p.id}`) },
    ],
  };
}

export default async function ProductoPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ color?: string }>;
}) {
  const [{ id }, { color }] = await Promise.all([params, searchParams]);
  const p = await getProducto(id);
  if (!p) notFound();

  const categoria = CATEGORIAS.find((c) => c.slug === p.categoria);
  const todas = await getProductos();
  const otras = todas.filter((x) => x.id !== p.id);
  const videos = videosDe(p);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <DatosEstructurados datos={comoProducto(p)} />
      <DatosEstructurados datos={comoMigas(p, categoria?.nombre)} />

      <nav className="mb-6 flex items-center text-[13px] text-sombra">
        <Link href="/catalogo" className="-my-2.5 py-2.5 hover:text-madera">Catálogo</Link>
        <span className="mx-2 text-arena-hondo">/</span>
        <Link href={`/catalogo?categoria=${p.categoria}`} className="-my-2.5 py-2.5 hover:text-madera">
          {categoria?.nombre}
        </Link>
      </nav>

      <header className="mb-8">
        <p className="eyebrow">{categoria?.nombre}</p>
        <h1 className="display-md mt-1.5 text-[32px] leading-tight text-tinta sm:text-[42px]">
          {p.nombre}
        </h1>
        <p className="mt-1.5 text-[15px] text-sombra">{p.subtitulo}</p>
      </header>

      <GaleriaPrenda producto={p} colorInicial={color} />

      {/* ══ La prenda, contada ══ */}
      <section className="mt-16 grid gap-10 border-t border-arena pt-12 md:grid-cols-2 md:gap-14">
        <div>
          <p className="eyebrow">La prenda</p>
          <p className="mt-3 text-[16px] leading-relaxed text-tinta">{p.descripcion}</p>
          <p className="mt-5 text-[14px] leading-relaxed text-sombra">{p.cuidado}</p>
        </div>

        <div>
          <p className="eyebrow">Cómo está hecha</p>
          <ul className="mt-3 space-y-2.5">
            {p.detalles.map((d) => (
              <li key={d} className="flex gap-3 text-[14.5px] leading-snug text-tinta">
                <span className="mt-[9px] h-[3px] w-[3px] shrink-0 rounded-full bg-madera" aria-hidden />
                {d}
              </li>
            ))}
          </ul>

          <p className="eyebrow mt-8">Los colores</p>
          <div className="mt-2 flex flex-wrap gap-x-4">
            {p.variantes.map((v) => (
              <Link
                key={v.slug}
                href={`/catalogo/${p.id}?color=${v.slug}`}
                className="flex items-center gap-2 py-2 text-[13.5px] text-sombra transition-colors hover:text-madera"
              >
                <span
                  className="h-3.5 w-3.5 rounded-full ring-1 ring-inset ring-black/15"
                  style={{ backgroundColor: v.hex }}
                  aria-hidden
                />
                {v.nombre}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Video ══
          La tela se entiende mejor moviéndose que quieta: cómo cae, cuánta
          luz pasa, cuánto pesa. Por eso el video no es decoración acá. */}
      {videos.length > 0 && (
        <section className="mt-16 border-t border-arena pt-12">
          <p className="eyebrow">En movimiento</p>
          <h2 className="display-md mt-1.5 text-[24px] text-tinta">Cómo cae la tela</h2>
          <div className="rail rail-sangra mt-6">
            {videos.map((v) => (
              <video
                key={v.src}
                src={v.src}
                poster={v.poster}
                controls
                muted
                loop
                playsInline
                preload="none"
                className="h-[400px] w-[225px] rounded-[3px] object-cover ring-1 ring-inset ring-black/[0.07] sm:h-[380px] sm:w-[214px]"
              />
            ))}
          </div>
        </section>
      )}

      {/* ══ Ambiente ══ */}
      {p.ambiente.length > 0 && (
        <section className="mt-16 border-t border-arena pt-12">
          <p className="eyebrow">De cerca</p>
          <h2 className="display-md mt-1.5 text-[24px] text-tinta">
            {p.nombre}, en el taller y en la calle
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {p.ambiente.map((src) => (
              <div
                key={src}
                className="relative aspect-[4/5] overflow-hidden rounded-[3px] ring-1 ring-inset ring-black/[0.07]"
              >
                <Image
                  src={src}
                  alt={p.nombre}
                  fill
                  sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══ Las otras prendas ══ */}
      {otras.length > 0 && (
        <section className="mt-16 border-t border-arena pt-12">
          <p className="eyebrow">Lo demás que hacemos</p>
          <h2 className="display-md mt-1.5 text-[24px] text-tinta">Las otras prendas</h2>
          <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-9 sm:max-w-[36rem]">
            {otras.map((o) => <PrendaCard key={o.id} p={o} />)}
          </div>
        </section>
      )}
    </div>
  );
}
