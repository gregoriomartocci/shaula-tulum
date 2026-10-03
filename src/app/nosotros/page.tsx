import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Quiénes somos — moda lenta hecha a mano en Tulum",
  description:
    "Shaula Tulum nació en Tulum en 2022: ropa elegante y cómoda de textiles orgánicos, hecha a mano, " +
    "en colores tierra y en piezas que no se repiten. Moda lenta para el calor del Caribe y de la ciudad.",
  alternates: { canonical: "/nosotros" },
  openGraph: { type: "article", url: "/nosotros", title: "Quiénes somos · Shaula Tulum" },
};

/* Las necesidades que la marca vino a cubrir: por qué existe. */
const NECESIDADES = [
  {
    k: "Elegancia",
    t: "Elegante porque es cómoda",
    d: "Una prenda es elegante cuando te sientes bien en ella. Shaula nació para que no haya que elegir entre arreglarse y estar a gusto.",
  },
  {
    k: "Clima",
    t: "Hecha para el calor y la humedad",
    d: "Telas que respiran y cortes holgados para el Caribe mexicano, y para el verano de las grandes ciudades, donde el calor aprieta igual.",
  },
  {
    k: "Tiempo",
    t: "Ropa que no pasa de moda",
    d: "Un estilo atemporal y versátil: la misma camisa va a la playa, a una cena o a la oficina, y sigue sirviendo dentro de varios veranos.",
  },
];

/* Lo que la marca defiende: cómo hace las cosas. */
const VALORES = [
  ["Textiles orgánicos", "Trabajamos principalmente con fibras naturales y orgánicas, que respiran, se sienten bien sobre la piel y envejecen con dignidad."],
  ["Hecho a mano", "La producción es artesanal: cada prenda pasa por las manos de alguien, y se nota en los detalles."],
  ["Moda lenta", "Proponemos comprar menos y mejor. Consumir de manera consciente es la forma de cuidar el medio ambiente de la contaminación que deja el fast fashion."],
  ["Piezas que no se repiten", "No hay stock permanente: las prendas, los estilos y las telas van cambiando. Lo que hoy está en el catálogo quizá no vuelva, y eso hace especial cada prenda."],
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
            Un estilo que busca resaltar tu esencia natural.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="medida space-y-5 text-[16px] leading-relaxed text-tinta">
          <p>
            En Shaula creemos que la verdadera elegancia está en la comodidad de una
            prenda y en cómo nos hace sentir, más que en lo estético. Por eso no
            seguimos la corriente de la moda contemporánea, que limita y condiciona:
            buscamos lo contrario, que cada quien resalte su propia esencia.
          </p>
          <p>
            La marca nació en Tulum en 2022 con esa idea: vestir con ropa elegante y
            confortable a la vez. Trabajamos principalmente con textiles orgánicos y
            una producción artesanal, hecha a mano.
          </p>
          <p>
            Son prendas de estilo atemporal y versátil, que acompañan a quien las
            lleva sin robarle protagonismo. De raíz masculina pero sin etiquetas,
            cualquiera puede hacerlas suyas. Son frescas para el calor y la humedad
            del Caribe mexicano, y también para el ritmo de las grandes ciudades. Los
            colores tierra invitan a bajar el ritmo y a sentirse parte del entorno.
          </p>
          <p>
            Creemos en la moda lenta, el <em>slow fashion</em>: comprar menos, elegir
            con conciencia y cuidar el medio ambiente frente a la contaminación que
            deja el <em>fast fashion</em>. Por eso no tenemos stock permanente; las
            prendas, los estilos y las telas van cambiando, y cada pieza tiene algo
            de única.
          </p>
        </div>
      </section>

      <section className="border-y border-arena bg-cal-hondo">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <p className="eyebrow">Por qué existimos</p>
          <h2 className="display-md mt-1.5 max-w-[24ch] text-[27px] leading-tight text-tinta sm:text-[32px]">
            Lo que vinimos a resolver.
          </h2>
          <div className="mt-8 grid gap-10 sm:grid-cols-3">
            {NECESIDADES.map((n) => (
              <div key={n.k}>
                <p className="eyebrow">{n.k}</p>
                <h3 className="mt-1.5 font-display text-[21px] leading-snug text-tinta">{n.t}</h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-sombra">{n.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <p className="eyebrow">Nuestros valores</p>
        <h2 className="display-md mt-1.5 max-w-[24ch] text-[27px] leading-tight text-tinta sm:text-[32px]">
          Cómo hacemos las cosas.
        </h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {VALORES.map(([t, d]) => (
            <div key={t} className="border-t border-arena pt-4">
              <h3 className="font-display text-[18px] text-tinta">{t}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-sombra">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dos fotos de taller: la pila doblada y el detalle del botón, que es
          donde se ve que hay mano y no máquina. */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8">
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
