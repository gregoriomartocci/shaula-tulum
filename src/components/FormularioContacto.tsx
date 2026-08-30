"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTOS } from "@/data/productos";
import { CORREO, enlaceWhatsApp, hayWhatsApp } from "@/lib/sitio";

/* No hay servidor ni base de datos: el catálogo no vende en línea. En vez
   de simular un envío que no ocurre (un "¡Gracias!" falso es peor que
   nada), el formulario arma el mensaje y lo manda por donde el visitante
   elija: WhatsApp, que es como se compra en México, o su cliente de
   correo. Es honesto y funciona sin backend.

   Si se llega desde una ficha ("Consultar por esta prenda"), la prenda y
   el color vienen en la dirección y llegan ya elegidos: nadie tiene que
   volver a explicar qué estaba mirando. */
export default function FormularioContacto() {
  const params = useSearchParams();
  const desdeFicha = PRODUCTOS.find((p) => p.nombre === params.get("prenda"));

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [pieza, setPieza] = useState(desdeFicha?.id ?? "");
  const [color, setColor] = useState(params.get("color") ?? "");
  const [talle, setTalle] = useState("");
  const [mensaje, setMensaje] = useState("");

  const prenda = PRODUCTOS.find((p) => p.id === pieza);
  const listo = nombre.trim() !== "" && mensaje.trim() !== "";

  function elegirPrenda(id: string) {
    setPieza(id);
    setColor("");   // los colores no son los mismos entre prendas
  }

  /** El mismo pedido, escrito una sola vez, sirva para correo o WhatsApp. */
  function armarMensaje() {
    return [
      `Nombre: ${nombre}`,
      email.trim() && `Email: ${email}`,
      prenda && `Prenda: ${prenda.nombre}`,
      color && `Color: ${color}`,
      talle.trim() && `Talla: ${talle}`,
      "",
      mensaje,
    ].filter(Boolean).join("\n");
  }

  function asuntoDe() {
    return prenda ? `Consulta por ${prenda.nombre}${color ? ` en ${color}` : ""}` : "Consulta";
  }

  // assign() en vez de asignar a location.href: hace lo mismo, y no dispara
  // la regla del compilador de React sobre mutar un valor externo.
  function porWhatsApp() {
    if (!listo) return;
    window.open(enlaceWhatsApp(`${asuntoDe()}\n\n${armarMensaje()}`), "_blank", "noopener");
  }

  function porCorreo() {
    if (!listo) return;
    window.location.assign(
      `mailto:${CORREO}?subject=${encodeURIComponent(asuntoDe())}&body=${encodeURIComponent(armarMensaje())}`,
    );
  }

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    /* El botón principal es el de WhatsApp cuando hay número: es por donde
       se compra en México. Sin número, el formulario se comporta como
       antes y abre el correo. */
    if (hayWhatsApp) porWhatsApp();
    else porCorreo();
  }

  /* 16px en el teléfono: por debajo de eso iOS hace zoom al enfocar el
     campo, y el visitante termina con la página corrida de costado. */
  const campo =
    "w-full rounded-[3px] border border-arena-hondo bg-cal px-3.5 py-2.5 text-[16px] text-tinta " +
    "placeholder:text-sombra/70 focus:border-madera focus:outline-none sm:text-[14px]";

  return (
    <form onSubmit={enviar} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="eyebrow mb-1.5 block">Nombre *</span>
          <input
            className={campo} value={nombre} required
            onChange={(e) => setNombre(e.target.value)} placeholder="Cómo te llamas"
          />
        </label>
        <label className="block">
          <span className="eyebrow mb-1.5 block">Email</span>
          <input
            type="email" className={campo} value={email}
            onChange={(e) => setEmail(e.target.value)} placeholder="Para responderte"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="eyebrow mb-1.5 block">Prenda</span>
          <select className={campo} value={pieza} onChange={(e) => elegirPrenda(e.target.value)}>
            <option value="">Consulta general</option>
            {PRODUCTOS.map((p) => (
              <option key={p.id} value={p.id}>{p.nombre}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="eyebrow mb-1.5 block">Color</span>
          <select
            className={campo} value={color} disabled={!prenda}
            onChange={(e) => setColor(e.target.value)}
          >
            <option value="">{prenda ? "Cualquiera" : "Elige una prenda"}</option>
            {prenda?.variantes.map((v) => (
              <option key={v.slug} value={v.nombre}>{v.nombre}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="eyebrow mb-1.5 block">Talla</span>
          <input
            className={campo} value={talle} onChange={(e) => setTalle(e.target.value)}
            placeholder={prenda ? prenda.talles.join(" · ") : "S, M, L…"}
          />
        </label>
      </div>

      <label className="block">
        <span className="eyebrow mb-1.5 block">Mensaje *</span>
        <textarea
          className={`${campo} min-h-[130px] resize-y`} value={mensaje} required
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Cuéntanos qué buscas. Si quieres un color que no está en el catálogo, el teñido es artesanal y casi cualquier tono se puede hacer a pedido."
        />
      </label>

      <div className="space-y-3 pt-1">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={!listo}
            className="flex min-h-12 items-center gap-2 rounded-full bg-madera px-7 text-[15px] font-medium text-cal
                       transition-colors hover:bg-tinta disabled:cursor-not-allowed disabled:bg-arena-hondo disabled:text-sombra"
          >
            {hayWhatsApp && (
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0 fill-current" aria-hidden>
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.09-.16.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.47c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03s.87 2.35.99 2.51c.12.16 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.19 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.05.14-1.16-.06-.1-.22-.16-.47-.29Z" />
              </svg>
            )}
            {hayWhatsApp ? "Enviar por WhatsApp" : "Preparar el mensaje"}
          </button>

          {hayWhatsApp && (
            <button
              type="button"
              onClick={porCorreo}
              disabled={!listo}
              className="flex min-h-12 items-center rounded-full border border-arena-hondo px-6 text-[15px] text-tinta
                         transition-colors hover:border-madera hover:text-madera disabled:cursor-not-allowed disabled:text-sombra"
            >
              Enviar por correo
            </button>
          )}
        </div>

        <p className="text-[12.5px] leading-snug text-sombra">
          {hayWhatsApp
            ? "Se abre WhatsApp con el mensaje escrito. Nada se envía sin que lo revises."
            : "Se abre tu programa de correo con todo escrito. Nada se envía sin que lo revises."}
        </p>
      </div>
    </form>
  );
}
