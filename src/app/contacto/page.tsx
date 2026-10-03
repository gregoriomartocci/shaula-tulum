import type { Metadata } from "next";
import { Suspense } from "react";
import FormularioContacto from "@/components/FormularioContacto";
import BotonWhatsApp from "@/components/BotonWhatsApp";
import { CORREO, SITIO, enlaceWhatsApp, hayWhatsApp, whatsappLegible } from "@/lib/sitio";

export const metadata: Metadata = {
  title: "Contacto — encargos y envíos a todo México",
  description:
    "Escríbenos qué prenda, qué talla y qué color. Encargos especiales para eventos, " +
    "visitas al taller de Tulum y envíos a todo México.",
  alternates: { canonical: "/contacto" },
  openGraph: { type: "website", url: "/contacto", title: "Contacto · Shaula Tulum" },
};

/* Los canales salen de la configuración: el de WhatsApp aparece solo si
   hay un número cargado. Publicar un número de ejemplo manda a la gente a
   un chat que no existe, que es peor que no ofrecer WhatsApp. */
const CANALES = [
  hayWhatsApp && {
    k: "WhatsApp",
    v: whatsappLegible(),
    href: enlaceWhatsApp("Hola, les escribo desde la página de Shaula Tulum."),
  },
  { k: "Correo", v: CORREO, href: `mailto:${CORREO}` },
  { k: "Instagram", v: "@shaula_tulum", href: SITIO.instagram },
].filter(Boolean) as { k: string; v: string; href: string }[];

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
      <p className="eyebrow">Hablemos</p>
      <h1 className="display-md mt-1.5 text-[32px] text-tinta sm:text-[40px]">Contacto</h1>
      <p className="medida mt-3 text-[15px] leading-relaxed text-sombra">
        No vendemos por la web. Escríbenos qué prenda quieres, en qué talla y de qué
        color, y lo coordinamos por WhatsApp o correo.
      </p>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <BotonWhatsApp
          className="w-full sm:w-auto"
          texto="Escríbenos por WhatsApp"
          mensaje="Hola, les escribo desde la página de Shaula Tulum."
        />
        <a
          href={SITIO.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-12 items-center justify-center rounded-full border border-madera/40 px-6 text-[15px] text-tinta transition-colors hover:bg-arena"
        >
          Instagram · @shaula_tulum
        </a>
      </div>

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
              Se puede visitar con cita. Avísanos con un día de anticipación y te
              mostramos los colores en mano, que es la única forma de elegir un teñido.
            </p>
          </div>

          <div>
            <p className="eyebrow">Encargos especiales</p>
            <p className="mt-2 text-[14px] leading-relaxed text-sombra">
              Tallas, cantidades y ropa para eventos. Escríbenos y lo vemos.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
