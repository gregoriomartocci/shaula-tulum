import Image from "next/image";
import Link from "next/link";
import { Icono as IconoWhatsApp } from "@/components/BotonWhatsApp";
import PrendaCard from "@/components/PrendaCard";
import { videosDe } from "@/data/productos";
import { getProductos } from "@/lib/catalogo";
import { SITIO, enlaceWhatsApp, hayWhatsApp } from "@/lib/sitio";

/* Los looks: fotos de la ropa puesta, en Tulum y en la calle. No son de
   una prenda ni de un color — son de la marca. */
const LOOKS = [
  { src: "/media/look-pistacho-2.jpg", alt: "Camisa verde pistacho contra una pared amarilla en Tulum" },
  { src: "/media/look-arena-1.jpg",    alt: "Camisa crudo y pantalón arena, caminando por el centro" },
  { src: "/media/look-pistacho-3.jpg", alt: "Camisa pistacho con pantalón corto arena" },
  { src: "/media/look-atardecer-1.jpg", alt: "Camisa mostaza y camisa crudo frente al mar al atardecer" },
];

export default async function Home() {
  const productos = await getProductos();
  const camisa = productos.find((p) => p.categoria === "camisas");
  const videos = productos.flatMap(videosDe).slice(0, 4);

  return (
    <>
      {/* ══ Hero ══
          El perchero con todos los tonos juntos: es la foto que cuenta el
          negocio entero — una prenda, muchos colores. */}
      {/* svh y no vh: en el teléfono, vh cuenta la barra del navegador como
          si no existiera y el hero queda cortado hasta que se scrollea. */}
      <section className="relative isolate flex min-h-[80svh] items-end overflow-hidden border-b border-arena sm:min-h-[86svh]">
        <Image
          src="/media/camisas-percha-1.jpg"
          alt="Camisas Shaula Tulum colgadas al sol, en todos sus colores"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-center"
        />
        {/* Doble velo: uno de abajo hacia arriba para que el texto se lea, otro
            desde la izquierda para sostener la columna en desktop.

            El velo llega hasta la mitad de la foto y ahí se corta: así el
            bloque de texto entero se apoya sobre una base pareja, en vez de
            que cada renglón pelee con la ropa que tenga detrás. Es la
            alternativa a ponerle sombra al texto, que sobre versalitas se
            ve como una mancha. */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-tinta/92 from-15% via-tinta/62 via-50% to-transparent" aria-hidden />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-tinta/55 via-tinta/15 to-transparent" aria-hidden />

        <div className="mx-auto w-full max-w-6xl px-5 pb-14 pt-28 sm:px-8 sm:pb-20">
          {/* Sombra en la volanta: en versalitas y sobre ropa clara, el velo del
              hero no alcanza. La sombra la despega de la foto sin tener que
              oscurecer la imagen entera. */}
          {/* Chapita y no texto suelto: en versalitas claras sobre ropa clara
              no hay velo que alcance, y ponerle sombra al texto se ve como una
              mancha. Un fondo propio se lee sobre cualquier foto y parece una
              decisión, que es lo que es. */}
          <p className="eyebrow inline-flex items-center rounded-full bg-tinta/80 px-3.5 py-1.5 text-cal backdrop-blur-[2px]">
            Tulum · Quintana Roo
          </p>
          <h1 className="display-xl mt-4 max-w-[18ch] text-[36px] font-medium leading-[1.04] text-cal sm:text-[58px]">
            La elegancia radica en la comodidad con la que vistes una prenda.
          </h1>
          <p className="mt-5 max-w-[34rem] text-[16px] leading-relaxed text-cal/95 sm:text-[18px]">
            Prendas elaboradas de forma artesanal en Yucatán, México. Estilo
            elegante y atemporal.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              href="/catalogo"
              className="flex min-h-12 items-center rounded-full bg-cal px-7 text-[15px] font-medium text-tinta transition-colors hover:bg-arena"
            >
              Ver catálogo
            </Link>
          </div>
          {/* Contacto directo, chico: está a mano sin competir con el
              botón del catálogo. */}
          <div className="mt-5 flex flex-wrap items-center gap-2.5 text-[14px] font-medium text-cal">
            {hayWhatsApp && (
              <a
                href={enlaceWhatsApp("Hola, les escribo desde la página de Shaula Tulum.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-cal/35 bg-tinta/55 px-4 backdrop-blur-[2px] transition-colors hover:bg-tinta/80"
              >
                <IconoWhatsApp className="h-[18px] w-[18px]" />
                WhatsApp
              </a>
            )}
            <a
              href={SITIO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-cal/35 bg-tinta/55 px-4 backdrop-blur-[2px] transition-colors hover:bg-tinta/80"
            >
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden focusable="false">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              @shaula_tulum
            </a>
          </div>
        </div>
      </section>

      {/* ══ Las prendas ══ */}
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <p className="eyebrow">Lo que hacemos</p>
        <h2 className="display-md mt-1.5 max-w-[20ch] text-[28px] font-medium leading-tight text-tinta sm:text-[38px]">
          Una camisa y un pantalón.
        </h2>
        <p className="medida mt-3 text-[15px] leading-relaxed text-sombra">
          Pocas prendas, hechas con calma. El trabajo está puesto en el color y en
          la tela, y cada tanda es distinta de la anterior.
        </p>

        <div className="mt-9 grid gap-x-6 gap-y-10 sm:grid-cols-2">
          {productos.map((p, i) => <PrendaCard key={p.id} p={p} prioridad={i === 0} />)}
        </div>
      </section>

      {/* ══ La carta de colores ══ */}
      {camisa && (
        <section className="border-y border-arena bg-cal-hondo">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="eyebrow">La carta de colores</p>
                <h2 className="display-md mt-1.5 text-[26px] font-medium text-tinta sm:text-[31px]">
                  {camisa.variantes.length} tonos de la misma camisa
                </h2>
                <p className="medida mt-2 text-[14px] leading-relaxed text-sombra">
                  Cada tono se tiñe en tandas chicas, así que dos tandas del mismo color
                  nunca salen exactamente iguales. Estas son las fotos de la tanda que hay.
                </p>
              </div>
              <Link href="/catalogo?categoria=camisas" className="-my-2 shrink-0 py-2 text-[13.5px] text-madera underline underline-offset-4 hover:text-madera-claro">
                Ver todos →
              </Link>
            </div>

            <div className="rail rail-sangra mt-7">
              {camisa.variantes.map((v) => (
                <Link
                  key={v.slug}
                  href={`/catalogo/${camisa.id}?color=${v.slug}`}
                  className="group w-[144px] sm:w-[150px]"
                >
                  <div className="relative aspect-square overflow-hidden rounded-[3px] ring-1 ring-inset ring-black/[0.07]">
                    <Image
                      src={v.fotos[0]}
                      alt={`Camisa en ${v.nombre}`}
                      fill
                      sizes="150px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className="h-3 w-3 shrink-0 rounded-full ring-1 ring-inset ring-black/15"
                      style={{ backgroundColor: v.hex }}
                      aria-hidden
                    />
                    <span className="truncate text-[13px] text-tinta transition-colors group-hover:text-madera">
                      {v.nombre}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ Video ══ */}
      {videos.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <p className="eyebrow">La tela</p>
          <h2 className="display-md mt-1.5 max-w-[24ch] text-[26px] font-medium leading-tight text-tinta sm:text-[31px]">
            Una foto no muestra cómo cae.
          </h2>
          <p className="medida mt-2 text-[14px] leading-relaxed text-sombra">
            La gasa de algodón pesa poco y se mueve con el aire. Estos son los mismos
            colores del catálogo, filmados colgando al sol.
          </p>
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
                className="h-[400px] w-[225px] rounded-[3px] object-cover ring-1 ring-inset ring-black/[0.07]"
              />
            ))}
          </div>
        </section>
      )}

      {/* ══ Filosofía ══ */}
      <section className="border-y border-arena bg-cal-hondo">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <p className="eyebrow">La idea</p>
          <h2 className="display-md mt-2 max-w-[22ch] text-[28px] font-medium leading-tight text-tinta sm:text-[38px]">
            Contra la ropa que nace muerta.
          </h2>

          <div className="mt-9 grid gap-8 sm:grid-cols-3 sm:gap-9">
            {[
              {
                t: "Lo hizo una persona",
                d: "El corte, el teñido y los botones pasan por manos, no por una línea de producción. Los botones son de coco y van cosidos uno por uno: por eso no hay dos camisas exactamente iguales.",
              },
              {
                t: "El algodón mejora, no se gasta",
                d: "La gasa lavada se ablanda con cada lavada en vez de deshilacharse. La camisa del tercer verano cae mejor que la del primero, y la arruga no es un descuido: es la tela.",
              },
              {
                t: "Sin temporada que caduque",
                d: "No hay colección de invierno ni liquidación de verano. Si un color funciona se vuelve a teñir, y si se agota una tanda se avisa — no se reemplaza por otra cosa.",
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

      {/* ══ Looks ══ */}
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <p className="eyebrow">Puesto</p>
        <h2 className="display-md mt-1.5 text-[26px] font-medium text-tinta sm:text-[31px]">
          Cómo se ve fuera de la percha
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {LOOKS.map((l) => (
            <div
              key={l.src}
              className="relative aspect-[4/5] overflow-hidden rounded-[3px] ring-1 ring-inset ring-black/[0.07]"
            >
              <Image
                src={l.src}
                alt={l.alt}
                fill
                sizes="(max-width: 639px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <a
          href={SITIO.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-12 items-center text-[15px] text-tinta underline underline-offset-4 hover:text-madera"
        >
          Más looks en nuestro Instagram, @shaula_tulum
        </a>
      </section>

    </>
  );
}
