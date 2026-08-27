import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Quiénes somos · Shaula Tulum",
  description:
    "Cómo y dónde se hace la ropa de Shaula Tulum: talleres de Yucatán, lino belga, fibra de henequén y tejido a mano.",
};

const HITOS = [
  {
    k: "Dónde",
    t: "Yucatán y Quintana Roo",
    d: "Trabajamos con cuatro talleres familiares: dos en Tixkokob, uno en Bécal y uno acá en Tulum. Ninguno tiene más de nueve personas. A todos los conocemos por nombre.",
  },
  {
    k: "Con qué",
    t: "Lino, ramio, algodón, henequén",
    d: "El lino viene de Bélgica porque ahí está el mejor y no vamos a mentir diciendo que es local. Todo lo demás —el algodón crudo, la palma jipijapa, la fibra de henequén— sale de la península.",
  },
  {
    k: "Cómo",
    t: "Tandas cortas, sin temporada",
    d: "Producimos de a veinte o treinta piezas. No hay colección de invierno ni liquidación de verano: si una prenda funciona, se sigue haciendo; si no, deja de existir sin descuento de por medio.",
  },
];

export default function NosotrosPage() {
  return (
    <>
      <section className="relative isolate flex min-h-[52vh] items-end overflow-hidden border-b border-arena">
        <Image
          src="/prendas/nAJEr8KlUnE.jpg"
          alt="Percha de prendas de lino a contraluz"
          fill priority sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-tinta/85 via-tinta/40 to-tinta/10" aria-hidden />
        <div className="mx-auto w-full max-w-6xl px-5 pb-12 pt-24 sm:px-8 sm:pb-16">
          <p className="eyebrow text-arena">Quiénes somos</p>
          <h1 className="display-xl mt-4 max-w-[16ch] text-[36px] font-medium leading-[1.04] text-cal sm:text-[56px]">
            Una casa chica, a propósito.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="medida space-y-5 text-[16px] leading-relaxed text-tinta">
          <p>
            Shaula Tulum empezó por una molestia concreta: en el Caribe hace
            treinta y cuatro grados y casi toda la ropa que se vende está hecha de
            plástico. Poliéster, elastano, mezclas que no respiran y que a los dos
            veranos se ponen feas de una manera que no tiene arreglo.
          </p>
          <p>
            No inventamos nada. El lino se usa hace ocho mil años y no se dejó de usar
            porque apareciera algo mejor, sino porque apareció algo más barato de
            fabricar. Nosotros volvimos a la fibra y le sacamos todo lo demás: sin
            marca estampada, sin temporadas, sin un precio inflado para poder ponerle
            cuarenta por ciento de descuento en agosto.
          </p>
          <p>
            Lo que queda es ropa que alguien cosió, que te vas a poner mucho, y que
            dentro de cinco veranos va a estar mejor que hoy.
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

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <p className="eyebrow">Lo que no hacemos</p>
        <h2 className="display-md mt-1.5 max-w-[24ch] text-[27px] leading-tight text-tinta sm:text-[32px]">
          Tres cosas que nos piden y decimos que no.
        </h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          {[
            ["Mezclas sintéticas", "Nos piden elastano para que “no se arrugue”. El lino se arruga; esa es la prueba de que es lino. Quien no quiera arrugas no quiere esta ropa, y está bien."],
            ["Producción grande", "Nos han ofrecido fabricar en volumen fuera de México. A ese precio la prenda deja de ser lo que decimos que es, así que no."],
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
            className="inline-block rounded-full bg-madera px-7 py-3 text-[14px] text-cal transition-colors hover:bg-tinta"
          >
            Ver el catálogo
          </Link>
        </div>
      </section>
    </>
  );
}
