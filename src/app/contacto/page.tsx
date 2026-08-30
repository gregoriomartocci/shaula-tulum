import type { Metadata } from "next";
import { Suspense } from "react";
import FormularioContacto from "@/components/FormularioContacto";

export const metadata: Metadata = {
  title: "Contacto — encargos y envíos a todo México",
  description:
    "Escribinos qué prenda, qué talle y qué color. Encargos a medida, colores a pedido, " +
    "visitas al taller de Tulum y envíos a todo México.",
  alternates: { canonical: "/contacto" },
  openGraph: { type: "website", url: "/contacto", title: "Contacto · Shaula Tulum" },
};

const CANALES = [
  { k: "Correo",    v: "hola@shaula_tulum.mx", href: "mailto:hola@shaula_tulum.mx" },
  { k: "WhatsApp",  v: "+52 984 000 0000",         href: "https://wa.me/529840000000" },
  { k: "Instagram", v: "@shaula_tulum",        href: "https://www.instagram.com/shaula_tulum/" },
];

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
      <p className="eyebrow">Hablemos</p>
      <h1 className="display-md mt-1.5 text-[32px] text-tinta sm:text-[40px]">Contacto</h1>
      <p className="medida mt-3 text-[15px] leading-relaxed text-sombra">
        No vendemos por la web. Escribinos qué prenda querés, en qué talle y de qué
        color, y lo coordinamos por correo o WhatsApp.
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <Suspense fallback={<div className="h-[420px] rounded-[3px] border border-dashed border-arena" />}>
          <FormularioContacto />
        </Suspense>

        <aside className="space-y-8">
          <div>
            <p className="eyebrow">Directo</p>
            <ul className="mt-3 divide-y divide-arena border-y border-arena">
              {CANALES.map((c) => (
                <li key={c.k} className="flex items-center gap-4">
                  <span className="w-24 shrink-0 text-[13px] text-sombra">{c.k}</span>
                  <a
                    href={c.href}
                    className="flex min-h-12 flex-1 items-center text-[15px] text-tinta underline underline-offset-4 hover:text-madera sm:min-h-0 sm:py-3 sm:text-[14px]"
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
              mostramos los colores en mano, que es la única forma de elegir un teñido.
            </p>
          </div>

          <div>
            <p className="eyebrow">Encargos a medida</p>
            <p className="mt-2 text-[14px] leading-relaxed text-sombra">
              Otro largo, otro talle, o un color que no está en la carta: el teñido
              es artesanal y casi cualquier tono se puede hacer. Escribinos y lo
              vemos.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
