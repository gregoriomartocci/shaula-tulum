import Image from "next/image";
import Link from "next/link";
import ProductoCard from "@/components/ProductoCard";
import { CATEGORIAS, type Producto } from "@/data/productos";
import { getProductos } from "@/lib/catalogo";

function Rail({
  eyebrow, titulo, bajada, productos, href,
}: {
  eyebrow: string; titulo: string; bajada: string;
  productos: Producto[]; href: string;
}) {
  return (
    <section className="py-12 sm:py-14">
      <div className="mx-auto mb-6 flex max-w-6xl flex-wrap items-end justify-between gap-3 px-5 sm:px-8">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="display-md mt-1.5 text-[26px] font-medium text-tinta sm:text-[31px]">{titulo}</h2>
          <p className="medida mt-2 text-[14px] leading-relaxed text-sombra">{bajada}</p>
        </div>
        <Link href={href} className="shrink-0 text-[13px] text-madera underline underline-offset-4 hover:text-madera-claro">
          Ver todo →
        </Link>
      </div>
      {/* El rail sangra hasta el borde en móvil: se ve que hay más a la derecha. */}
      <div className="rail px-5 sm:mx-auto sm:max-w-6xl sm:px-8">
        {productos.map((p) => <ProductoCard key={p.id} p={p} ancho />)}
      </div>
    </section>
  );
}

export default async function Home() {
  const productos = await getProductos();
  const masVendidos = productos.filter((p) => p.masVendido);
  const trending = productos.filter((p) => p.trending);

  return (
    <>
      {/* ══ Hero ══ */}
      <section className="relative isolate flex min-h-[78vh] items-end overflow-hidden border-b border-arena sm:min-h-[86vh]">
        <Image
          src="/prendas/kXsBsAp5Q0Y.jpg"
          alt="Lino junto al mar en Tulum"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-center"
        />
        {/* Doble velo: uno de abajo hacia arriba para que el texto se lea, otro
            desde la izquierda para sostener la columna de texto en desktop. */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-tinta/85 via-tinta/45 to-tinta/15" aria-hidden />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-tinta/55 to-transparent sm:to-transparent" aria-hidden />

        <div className="mx-auto w-full max-w-6xl px-5 pb-14 pt-28 sm:px-8 sm:pb-20">
          <p className="eyebrow text-arena">Tulum · Quintana Roo</p>
          <h1 className="display-xl mt-4 max-w-[13ch] text-[42px] font-medium leading-[1.02] text-cal sm:text-[68px]">
            Estilo atemporal.
          </h1>
          <p className="mt-5 max-w-[34rem] text-[16px] leading-relaxed text-cal/90 sm:text-[18px]">
            Hecho 100% artesanal por artesanos de México. Lino, algodón crudo y fibra
            de henequén, en tandas cortas y sin temporadas que caducan.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              href="/catalogo"
              className="rounded-full bg-cal px-7 py-3 text-[14px] font-medium text-tinta transition-colors hover:bg-arena"
            >
              Ver el catálogo
            </Link>
            <Link
              href="/nosotros"
              className="rounded-full border border-cal/50 px-7 py-3 text-[14px] text-cal transition-colors hover:bg-cal/10"
            >
              Cómo trabajamos
            </Link>
          </div>
        </div>
      </section>

      {/* ══ Filosofía ══ */}
      <section className="border-b border-arena bg-cal-hondo">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <p className="eyebrow">La idea</p>
          <h2 className="display-md mt-2 max-w-[22ch] text-[28px] font-medium leading-tight text-tinta sm:text-[38px]">
            Contra la ropa que nace muerta.
          </h2>

          <div className="mt-9 grid gap-8 sm:grid-cols-3 sm:gap-9">
            {[
              {
                t: "Lo hizo una persona",
                d: "Cada pieza sale de un taller familiar de Yucatán o Quintana Roo. Ninguno tiene más de nueve personas y a todos los conocemos por nombre. Eso es lo que quiere decir artesanal.",
              },
              {
                t: "El lino mejora, no se gasta",
                d: "Una prenda industrial sale de la fábrica en su mejor día y desde ahí sólo empeora. El lino hace lo contrario: se ablanda con cada lavada. La del tercer verano es mejor que la del primero.",
              },
              {
                t: "Sin temporada que caduque",
                d: "No hay colección de invierno ni liquidación de verano. Si una prenda funciona se sigue haciendo, y el precio es el mismo en enero que en julio.",
              },
            ].map((c) => (
              <div key={c.t}>
                <h3 className="font-display text-[19px] font-medium leading-snug text-tinta">{c.t}</h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-sombra">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Rail
        eyebrow="Lo que más sale"
        titulo="Los más vendidos"
        bajada="Las piezas que se repiten en cada pedido, temporada tras temporada."
        productos={masVendidos}
        href="/catalogo"
      />

      {/* ══ Categorías ══ */}
      <section className="border-y border-arena bg-cal-hondo">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <p className="eyebrow">Por tipo de prenda</p>
          <h2 className="display-md mt-1.5 text-[26px] font-medium text-tinta sm:text-[31px]">El catálogo, por partes</h2>

          <div className="mt-7 grid gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIAS.map((c) => {
              const n = productos.filter((p) => p.categoria === c.slug).length;
              const muestra = productos.find((p) => p.categoria === c.slug && p.foto);
              return (
                <Link
                  key={c.slug}
                  href={`/catalogo?categoria=${c.slug}`}
                  className="group flex items-center gap-4 border-b border-arena pb-5 transition-colors hover:border-madera"
                >
                  <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-[3px] ring-1 ring-inset ring-black/[0.07]">
                    {muestra?.foto && (
                      <Image
                        src={muestra.foto}
                        alt=""
                        fill
                        sizes="72px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-[18px] font-medium text-tinta transition-colors group-hover:text-madera">
                      {c.nombre} <span className="text-[13px] font-normal text-sombra">· {n}</span>
                    </h3>
                    <p className="mt-0.5 text-[13px] leading-snug text-sombra">{c.descripcion}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Rail
        eyebrow="Se está pidiendo mucho"
        titulo="Tendencia de esta temporada"
        bajada="Lo que más se está encargando ahora mismo, con stock corto."
        productos={trending}
        href="/catalogo"
      />

      {/* ══ Cierre ══ */}
      <section className="mx-auto max-w-6xl px-5 pb-6 sm:px-8">
        <div className="rounded-[4px] border border-arena-hondo bg-cal-hondo px-6 py-11 text-center sm:px-12">
          <h2 className="display-md mx-auto max-w-[20ch] text-[24px] font-medium leading-tight text-tinta sm:text-[32px]">
            ¿Buscás algo que no está en el catálogo?
          </h2>
          <p className="medida mx-auto mt-3 text-[15px] leading-relaxed text-sombra">
            Casi todo se puede hacer a pedido: otro largo, otro talle, otro color de la
            misma tela. Escribinos y lo vemos.
          </p>
          <Link
            href="/contacto"
            className="mt-7 inline-block rounded-full bg-madera px-7 py-3 text-[14px] font-medium text-cal transition-colors hover:bg-tinta"
          >
            Escribinos
          </Link>
        </div>
      </section>
    </>
  );
}
