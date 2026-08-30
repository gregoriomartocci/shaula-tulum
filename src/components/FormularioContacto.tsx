"use client";

import { useState } from "react";
import { PRODUCTOS } from "@/data/productos";

const DESTINO = "hola@shaula_tulum.mx";

/* No hay servidor ni base de datos: el catálogo no vende en línea. En vez
   de simular un envío que no ocurre (un "¡Gracias!" falso es peor que
   nada), el formulario arma el mensaje y abre el cliente de correo del
   visitante. Es honesto y funciona sin backend. */
export default function FormularioContacto() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [pieza, setPieza] = useState("");
  const [talle, setTalle] = useState("");
  const [mensaje, setMensaje] = useState("");

  const prenda = PRODUCTOS.find((p) => p.id === pieza);
  const listo = nombre.trim() !== "" && mensaje.trim() !== "";

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!listo) return;
    const asunto = prenda ? `Consulta por ${prenda.nombre}` : "Consulta";
    const cuerpo = [
      `Nombre: ${nombre}`,
      email.trim() && `Email: ${email}`,
      prenda && `Pieza: ${prenda.nombre} ($${prenda.precio})`,
      talle.trim() && `Talle: ${talle}`,
      "",
      mensaje,
    ].filter(Boolean).join("\n");
    // assign() en vez de asignar a location.href: hace lo mismo, y no dispara
    // la regla del compilador de React sobre mutar un valor externo.
    window.location.assign(
      `mailto:${DESTINO}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`,
    );
  }

  const campo =
    "w-full rounded-[3px] border border-arena-hondo bg-cal px-3.5 py-2.5 text-[14px] text-tinta " +
    "placeholder:text-sombra/70 focus:border-madera focus:outline-none";

  return (
    <form onSubmit={enviar} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="eyebrow mb-1.5 block">Nombre *</span>
          <input
            className={campo} value={nombre} required
            onChange={(e) => setNombre(e.target.value)} placeholder="Cómo te llamás"
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

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="eyebrow mb-1.5 block">Pieza que te interesa</span>
          <select className={campo} value={pieza} onChange={(e) => setPieza(e.target.value)}>
            <option value="">Todavía no sé / consulta general</option>
            {PRODUCTOS.map((p) => (
              <option key={p.id} value={p.id}>{p.nombre} — ${p.precio}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="eyebrow mb-1.5 block">Talle</span>
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
          placeholder="Contanos qué buscás. Si querés algo que no está en el catálogo —otro largo, otro color de la misma tela— también se puede."
        />
      </label>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={!listo}
          className="rounded-full bg-madera px-7 py-3 text-[14px] text-cal transition-colors
                     hover:bg-tinta disabled:cursor-not-allowed disabled:bg-arena-hondo disabled:text-sombra"
        >
          Preparar el mensaje
        </button>
        <p className="text-[12.5px] leading-snug text-sombra">
          Se abre tu programa de correo con todo escrito. Nada se envía sin que lo revises.
        </p>
      </div>
    </form>
  );
}
