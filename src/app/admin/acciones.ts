"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { productos as tabla, movimientosStock } from "@/db/schema";
import { abrirSesion, cerrarSesion, estaLogueado, passwordValida } from "@/lib/auth";
import { aSlug } from "@/lib/slug";

async function exigirSesion() {
  if (!(await estaLogueado())) redirect("/admin/login");
  if (!db) throw new Error("No hay base de datos configurada (falta DATABASE_URL).");
  return db;
}

/** Refresca todo lo que muestra productos: catálogo, fichas y landing. */
function revalidarTodo() {
  revalidatePath("/", "layout");
}

export async function entrar(_prev: unknown, form: FormData) {
  const intento = String(form.get("password") ?? "");
  if (!passwordValida(intento)) return { error: "Contraseña incorrecta." };
  await abrirSesion();
  redirect("/admin");
}

export async function salir() {
  await cerrarSesion();
  redirect("/admin/login");
}

/** Slug a partir del nombre, si no se dio uno. */
function leerForm(form: FormData) {
  const lista = (k: string) =>
    String(form.get(k) ?? "").split(/[,\n]/).map((s) => s.trim()).filter(Boolean);
  const num = (k: string) => {
    const v = String(form.get(k) ?? "").trim();
    return v === "" ? null : Number(v);
  };
  return {
    nombre: String(form.get("nombre") ?? "").trim(),
    categoria: String(form.get("categoria") ?? "camisas"),
    precio: Number(form.get("precio") ?? 0),
    tono: String(form.get("tono") ?? "#e8dcc8"),
    foto: String(form.get("foto") ?? "").trim() || null,
    colores: lista("colores"),
    talles: lista("talles"),
    tela: String(form.get("tela") ?? "").trim(),
    descripcion: String(form.get("descripcion") ?? "").trim(),
    stock: num("stock"),
    masVendido: form.get("masVendido") === "on",
    trending: form.get("trending") === "on",
    nuevo: form.get("nuevo") === "on",
    publicado: form.get("publicado") === "on",
    orden: Number(form.get("orden") ?? 0),
  };
}

export async function crearProducto(_prev: unknown, form: FormData) {
  const base = await exigirSesion();
  const datos = leerForm(form);
  if (!datos.nombre) return { error: "El nombre es obligatorio." };
  if (!Number.isFinite(datos.precio) || datos.precio < 0) return { error: "El precio no es válido." };

  const id = String(form.get("id") ?? "").trim() || aSlug(datos.nombre);
  const [existe] = await base.select({ id: tabla.id }).from(tabla).where(eq(tabla.id, id)).limit(1);
  if (existe) return { error: `Ya existe una pieza con el identificador "${id}".` };

  await base.insert(tabla).values({ id, ...datos });
  if (datos.stock != null) {
    await base.insert(movimientosStock).values({
      productoId: id, delta: datos.stock, stockResultante: datos.stock, motivo: "carga inicial",
    });
  }
  revalidarTodo();
  redirect("/admin");
}

export async function editarProducto(_prev: unknown, form: FormData) {
  const base = await exigirSesion();
  const id = String(form.get("id") ?? "");
  if (!id) return { error: "Falta el identificador." };
  const datos = leerForm(form);
  if (!datos.nombre) return { error: "El nombre es obligatorio." };

  const [antes] = await base.select({ stock: tabla.stock }).from(tabla).where(eq(tabla.id, id)).limit(1);

  await base.update(tabla)
    .set({ ...datos, actualizadoEn: new Date() })
    .where(eq(tabla.id, id));

  // Si el stock cambió a mano desde la ficha, queda registrado igual.
  if (datos.stock != null && antes?.stock != null && datos.stock !== antes.stock) {
    await base.insert(movimientosStock).values({
      productoId: id,
      delta: datos.stock - antes.stock,
      stockResultante: datos.stock,
      motivo: "ajuste manual desde la ficha",
    });
  }
  revalidarTodo();
  redirect("/admin");
}

export async function borrarProducto(form: FormData) {
  const base = await exigirSesion();
  const id = String(form.get("id") ?? "");
  if (!id) return;
  await base.delete(tabla).where(eq(tabla.id, id));
  revalidarTodo();
}

/** Publicar / despublicar sin salir de la lista. */
export async function alternarPublicado(form: FormData) {
  const base = await exigirSesion();
  const id = String(form.get("id") ?? "");
  if (!id) return;
  await base.update(tabla)
    .set({ publicado: sql`NOT ${tabla.publicado}`, actualizadoEn: new Date() })
    .where(eq(tabla.id, id));
  revalidarTodo();
}

/** Ajuste rápido de inventario desde la lista: +1 / −1 / un número. */
export async function ajustarStock(form: FormData) {
  const base = await exigirSesion();
  const id = String(form.get("id") ?? "");
  const delta = Number(form.get("delta") ?? 0);
  if (!id || !Number.isFinite(delta) || delta === 0) return;

  const [fila] = await base.select({ stock: tabla.stock }).from(tabla).where(eq(tabla.id, id)).limit(1);
  if (!fila) return;
  // Nunca por debajo de cero: un inventario negativo no significa nada.
  const nuevo = Math.max(0, (fila.stock ?? 0) + delta);

  await base.update(tabla).set({ stock: nuevo, actualizadoEn: new Date() }).where(eq(tabla.id, id));
  await base.insert(movimientosStock).values({
    productoId: id, delta: nuevo - (fila.stock ?? 0), stockResultante: nuevo,
    motivo: delta > 0 ? "ingreso" : "salida",
  });
  revalidarTodo();
}
