import type { Metadata } from "next";
import FormularioContacto from "@/components/FormularioContacto";

export const metadata: Metadata = {
  title: "Contacto · Shaula Tulum",
  description: "Encargos, talles, colores a pedido y visitas al taller de Tulum.",
};

const CANALES = [
  { k: "Correo",    v: "hola@shaula_tulum.mx", href: "mailto:hola@shaula_tulum.mx" },
  { k: "WhatsApp",  v: "+52 984 000 0000",         href: "https://wa.me/529840000000" },
  { k: "Instagram", v: "@shaula_tulum",        href: "https://instagram.com/shaulatulum" },
];

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
      <p className="eyebrow">Hablemos</p>
      <h1 className="display-md mt-1.5 text-[32px] text-tinta sm:text-[40px]">Contacto</h1>
      <p className="medida mt-3 text-[15px] leading-relaxed text-sombra">
        No vendemos por la web. Escribinos qué pieza querés, en qué talle y de qué
        color, y lo coordinamos por correo o WhatsApp. Contestamos dentro de las
        veinticuatro horas.
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <FormularioContacto />

        <aside className="space-y-8">
          <div>
            <p className="eyebrow">Directo</p>
            <ul className="mt-3 divide-y divide-arena border-y border-arena">
              {CANALES.map((c) => (
                <li key={c.k} className="flex items-baseline gap-4 py-3">
                  <span className="w-24 shrink-0 text-[13px] text-sombra">{c.k}</span>
                  <a
                    href={c.href}
                    className="text-[14px] text-tinta underline underline-offset-4 hover:text-madera"
                  >
                    {c.v}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[3px] border border-arena-hondo bg-cal-hondo px-5 py-5">
            <p className="eyebrow">El taller</p>
            <p className="mt-2 text-[14px] leading-relaxed text-tinta">
              Carretera Tulum–Boca Paila, km 4<br />
              Tulum, Quintana Roo, México
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-sombra">
              Se puede visitar con cita. Avisanos con un día de anticipación y te
              mostramos las telas en mano, que es la única forma de elegir lino.
            </p>
          </div>

          <div>
            <p className="eyebrow">Encargos a medida</p>
            <p className="mt-2 text-[14px] leading-relaxed text-sombra">
              Otro largo, otro talle o un color de la misma tela: entre dos y tres
              semanas, sin recargo. Un patrón nuevo desde cero lleva más y lo
              presupuestamos aparte.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
