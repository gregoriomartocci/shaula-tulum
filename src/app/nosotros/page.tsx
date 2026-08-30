import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Quiénes somos — ropa hecha a mano en Tulum",
  description:
    "Cómo se hace la ropa de Shaula Tulum: gasa de algodón lavada, teñido artesanal en tandas cortas y botones de coco cosidos a mano en Quintana Roo.",
  alternates: { canonical: "/nosotros" },
  openGraph: { type: "article", url: "/nosotros", title: "Quiénes somos · Shaula Tulum" },
};

const HITOS = [
  {
    k: "Dónde",
    t: "Tulum, Quintana Roo",
    d: "La marca es de aquí y la ropa está pensada para este clima: treinta y cuatro grados, humedad y sol directo. Todo lo que no sobrevive a eso no entra al catálogo.",
  },
  {
    k: "Con qué",
    t: "Gasa de algodón lavada",
    d: "Algodón, y nada más. La gasa se lava antes de cortar, así la prenda ya llegó a su medida final y no encoge después. Los botones son de coco.",
  },
  {
    k: "Cómo",
    t: "Teñido a mano, en tandas cortas",
    d: "Cada color sale de una tanda chica de teñido. Dos tandas del mismo tono nunca dan exactamente igual, y esa diferencia mínima entre una prenda y otra es la firma de que lo hizo alguien.",
  },
];

export default function NosotrosPage() {
  return (
    <>
      <section className="relative isolate flex min-h-[52vh] items-end overflow-hidden border-b border-arena">
        <Image
          src="/media/camisas-percha-2.jpg"
          alt="Percha con camisas Shaula Tulum en sus distintos tonos, al sol"
          fill priority sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-tinta/92 from-15% via-tinta/62 via-50% to-transparent" aria-hidden />
        <div className="mx-auto w-full max-w-6xl px-5 pb-12 pt-24 sm:px-8 sm:pb-16">
          <p className="eyebrow inline-flex items-center rounded-full bg-tinta/80 px-3.5 py-1.5 text-cal backdrop-blur-[2px]">Quiénes somos</p>
          <h1 className="display-xl mt-4 max-w-[16ch] text-[36px] font-medium leading-[1.04] text-cal sm:text-[56px]">
            Una casa chica, a propósito.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="medida space-y-5 text-[16px] leading-relaxed text-tinta">
          <p>
            Shaula Tulum empezó por una molestia concreta: en el Caribe hace treinta y
            cuatro grados y casi toda la ropa que se vende está hecha de plástico.
            Poliéster, elastano, mezclas que no respiran y que a los dos veranos se
            ponen feas de una manera que no tiene arreglo.
          </p>
          <p>
            La respuesta fue quedarse con lo mínimo: una camisa, un pantalón, y el
            conjunto de los dos. Nada de colecciones nuevas cada tres meses. Todo el
            trabajo está puesto en la tela y en el color, que es lo que se toca y lo
            que se ve.
          </p>
          <p>
            La gasa de algodón se arruga, y eso no es un defecto: es la prueba de que
            no tiene sintético adentro. Se ablanda con cada lavada en vez de gastarse,
            así que la camisa del tercer verano cae mejor que la del primero.
          </p>
        </div>
      </section>

      <section className="border-y border-arena bg-cal-hondo">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <div className="grid gap-10 sm:grid-cols-3">
            {HITOS.map((h) => (
              <div key={h.k}>
                <p className="eyebrow">{h.k}</p>
                <h2 className="mt-1.5 font-display text-[21px] leading-snug text-tinta">{h.t}</h2>
                <p className="mt-2.5 text-[14px] leading-relaxed text-sombra">{h.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dos fotos de taller: la pila doblada y el detalle del botón, que es
          donde se ve que hay mano y no máquina. */}
      <section className="mx-auto max-w-6xl px-5 pt-16 sm:px-8">
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          {[
            { src: "/media/camisas-dobladas-4.jpg", alt: "Camisas dobladas en tonos verde, mostaza y rosa" },
            { src: "/media/pantalones-grupo-1.jpg", alt: "Pantalones de pinzas doblados, en negro, arena, terracota y olivo" },
          ].map((f) => (
            <div key={f.src} className="relative aspect-[5/4] overflow-hidden rounded-[3px] ring-1 ring-inset ring-black/[0.07]">
              <Image src={f.src} alt={f.alt} fill sizes="(max-width: 639px) 100vw, 50vw" className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <p className="eyebrow">Lo que no hacemos</p>
        <h2 className="display-md mt-1.5 max-w-[24ch] text-[27px] leading-tight text-tinta sm:text-[32px]">
          Tres cosas que nos piden y decimos que no.
        </h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          {[
            ["Mezclas sintéticas", "Nos piden elastano para que “no se arrugue”. El algodón se arruga; esa es la prueba de que es algodón. Quien no quiera arrugas no quiere esta ropa, y está bien."],
            ["Producción grande", "Teñir en tandas grandes saldría más barato y todos los colores serían idénticos. Sería otra ropa, así que no."],
            ["Descuentos de temporada", "El precio es el mismo en enero y en julio. Si algo está caro, está caro siempre; si no, no necesita rebaja."],
          ].map(([t, d]) => (
            <div key={t} className="border-t border-arena pt-4">
              <h3 className="font-display text-[18px] text-tinta">{t}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-sombra">{d}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/catalogo"
            className="inline-flex min-h-12 items-center rounded-full bg-madera px-7 text-[15px] text-cal transition-colors hover:bg-tinta"
          >
            Ver el catálogo
          </Link>
        </div>
      </section>
    </>
  );
}
