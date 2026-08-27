import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import MuestraTela from "@/components/MuestraTela";
import ProductoCard from "@/components/ProductoCard";
import { CATEGORIAS } from "@/data/productos";
import { getProducto, getProductos } from "@/lib/catalogo";

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
): Promise<Metadata> {
  const { id } = await params;
  const p = await getProducto(id);
  if (!p) return { title: "Pieza no encontrada · Shaula Tulum" };
  return { title: `${p.nombre} · Shaula Tulum`, description: p.descripcion };
}

export default async function ProductoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = await getProducto(id);
  if (!p) notFound();

  const categoria = CATEGORIAS.find((c) => c.slug === p.categoria);
  const todas = await getProductos();
  const relacionadas = todas.filter((x) => x.categoria === p.categoria && x.id !== p.id).slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <nav className="mb-8 text-[13px] text-sombra">
        <Link href="/catalogo" className="hover:text-madera">Catálogo</Link>
        <span className="mx-2 text-arena-hondo">/</span>
        <Link href={`/catalogo?categoria=${p.categoria}`} className="hover:text-madera">
          {categoria?.nombre}
        </Link>
      </nav>

      <div className="grid gap-10 md:grid-cols-2 md:gap-14">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] ring-1 ring-inset ring-black/[0.07]">
          {p.foto ? (
            <Image
              src={p.foto}
              alt={p.nombre}
              fill
              priority
              sizes="(max-width: 767px) 100vw, 50vw"
              className="object-cover"
            />
          ) : (
            <MuestraTela tono={p.tono} className="h-full w-full" />
          )}
        </div>

        <div className="md:pt-4">
          <p className="eyebrow">{categoria?.nombre}</p>
          <h1 className="display-md mt-1.5 text-[32px] leading-tight text-tinta sm:text-[40px]">
            {p.nombre}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="text-[22px] tabular-nums text-tinta">${p.precio}</span>
            {p.masVendido && (
              <span className="rounded-full border border-madera/35 bg-madera/10 px-2.5 py-1 text-[11px] font-semibold text-madera">
                Más vendido
              </span>
            )}
            {p.nuevo && (
              <span className="rounded-full border border-henequen/45 bg-henequen/12 px-2.5 py-1 text-[11px] font-semibold text-[#7d6647]">
                Nuevo
              </span>
            )}
          </div>

          <p className="medida mt-6 text-[15px] leading-relaxed text-tinta">{p.descripcion}</p>

          <dl className="mt-8 divide-y divide-arena border-y border-arena text-[14px]">
            {[
              ["Tela", p.tela],
              ["Colores", p.colores.join(" · ")],
              ["Talles", p.talles.join(" · ")],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-6 py-3">
                <dt className="w-24 shrink-0 text-sombra">{k}</dt>
                <dd className="text-tinta">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 rounded-[3px] border border-arena-hondo bg-cal-hondo px-5 py-5">
            <p className="text-[14px] leading-relaxed text-tinta">
              Este sitio es un catálogo: no hay compra en línea. Escribinos qué pieza,
              qué talle y qué color querés, y coordinamos por ahí.
            </p>
            <Link
              href="/contacto"
              className="mt-4 inline-block rounded-full bg-madera px-6 py-2.5 text-[14px] text-cal transition-colors hover:bg-tinta"
            >
              Consultar por esta pieza
            </Link>
          </div>
        </div>
      </div>

      {relacionadas.length > 0 && (
        <section className="mt-20">
          <p className="eyebrow">De la misma familia</p>
          <h2 className="display-md mt-1.5 text-[24px] text-tinta">Otras {categoria?.nombre.toLowerCase()}</h2>
          <div className="mt-6 grid grid-cols-1 gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {relacionadas.map((r) => <ProductoCard key={r.id} p={r} />)}
          </div>
        </section>
      )}
    </div>
  );
}
