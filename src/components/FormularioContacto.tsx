"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTOS } from "@/data/productos";

const DESTINO = "hola@shaula_tulum.mx";

/* No hay servidor ni base de datos: el catálogo no vende en línea. En vez
   de simular un envío que no ocurre (un "¡Gracias!" falso es peor que
   nada), el formulario arma el mensaje y abre el cliente de correo del
   visitante. Es honesto y funciona sin backend.

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

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!listo) return;
    const asunto = prenda
      ? `Consulta por ${prenda.nombre}${color ? ` en ${color}` : ""}`
      : "Consulta";
    const cuerpo = [
      `Nombre: ${nombre}`,
      email.trim() && `Email: ${email}`,
      prenda && `Prenda: ${prenda.nombre}`,
      color && `Color: ${color}`,
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
            <option value="">{prenda ? "Cualquiera" : "Elegí una prenda"}</option>
            {prenda?.variantes.map((v) => (
              <option key={v.slug} value={v.nombre}>{v.nombre}</option>
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
          placeholder="Contanos qué buscás. Si querés un color que no está en el catálogo, el teñido es artesanal y casi cualquier tono se puede hacer a pedido."
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
