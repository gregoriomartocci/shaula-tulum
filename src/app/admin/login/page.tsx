"use client";

import { useActionState } from "react";
import { entrar } from "../acciones";

export default function LoginPage() {
  const [estado, accion, pendiente] = useActionState(entrar, null as { error?: string } | null);

  return (
    <div className="mx-auto max-w-sm py-10">
      <h1 className="display-md text-[26px] font-medium text-tinta">Entrar al panel</h1>
      <p className="mt-2 text-[14px] leading-relaxed text-sombra">
        Acá se cargan y editan las piezas del catálogo.
      </p>

      <form action={accion} className="mt-7 space-y-3">
        <label className="block">
          <span className="eyebrow mb-1.5 block">Contraseña</span>
          <input
            type="password" name="password" required autoFocus
            className="w-full rounded-[3px] border border-arena-hondo bg-cal px-3.5 py-2.5 text-[16px] sm:text-[14px]
                       text-tinta focus:border-madera focus:outline-none"
          />
        </label>
        {estado?.error && (
          <p className="rounded-[3px] border border-red-300 bg-red-50 px-3 py-2 text-[13px] text-red-800">
            {estado.error}
          </p>
        )}
        <button
          disabled={pendiente}
          className="w-full rounded-full bg-madera px-6 py-2.5 text-[14px] font-medium text-cal
                     transition-colors hover:bg-tinta disabled:opacity-60"
        >
          {pendiente ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </div>
  );
}
