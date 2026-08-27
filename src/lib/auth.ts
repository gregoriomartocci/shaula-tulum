import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

/* Autenticación mínima para un panel de una sola persona.

   No es un sistema de usuarios: es una contraseña en variable de entorno
   y una cookie firmada. Alcanza para lo que es —una dueña de marca
   cargando productos— y no arrastra el peso de un proveedor de identidad.
   Si algún día entra más gente al panel, esto se reemplaza por auth real. */

const COOKIE = "shaula_admin";

function secreto() {
  return process.env.ADMIN_PASSWORD ?? "";
}

function firmar(valor: string) {
  return createHmac("sha256", secreto()).update(valor).digest("hex");
}

/** Compara sin filtrar información por el tiempo que tarda. */
function igualSeguro(a: string, b: string) {
  const ba = Buffer.from(a), bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

export function hayPassword() {
  return secreto().length > 0;
}

export function passwordValida(intento: string) {
  const s = secreto();
  if (!s) return false;
  return igualSeguro(intento, s);
}

export async function estaLogueado() {
  if (!hayPassword()) return false;
  const c = await cookies();
  const valor = c.get(COOKIE)?.value;
  if (!valor) return false;
  return igualSeguro(valor, firmar("ok"));
}

export async function abrirSesion() {
  const c = await cookies();
  c.set(COOKIE, firmar("ok"), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function cerrarSesion() {
  const c = await cookies();
  c.delete(COOKIE);
}
