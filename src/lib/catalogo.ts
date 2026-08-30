import { asc, eq } from "drizzle-orm";
import { db, hayBase } from "@/db";
import { productos as tabla } from "@/db/schema";
import { PRODUCTOS as SEMILLA, type Producto } from "@/data/productos";

/* ══════════════════════════════════════════════════════════════
   Única puerta de entrada a los productos.

   Con base configurada lee de la base. Sin base, devuelve la semilla
   estática — así el sitio funciona igual desplegado sin DATABASE_URL, y
   el día que se conecta la base no hay que tocar ninguna página.
   ══════════════════════════════════════════════════════════════ */

/** Fila de la base → la forma que ya consumen las páginas. */
function aProducto(f: typeof tabla.$inferSelect): Producto {
  /* Las fotos y los colores viven con el código. Si la fila todavía no los
     tiene (base sembrada con una versión vieja, o prenda creada desde el
     panel), se toman de la semilla en vez de dejar la ficha sin imágenes. */
  const semilla = SEMILLA.find((p) => p.id === f.id);
  return {
    id: f.id,
    nombre: f.nombre,
    subtitulo: f.subtitulo || semilla?.subtitulo || "",
    categoria: f.categoria as Producto["categoria"],
    precio: f.precio ?? undefined,
    tono: f.tono,
    tela: f.tela,
    descripcion: f.descripcion,
    detalles: f.detalles ?? [],
    cuidado: f.cuidado,
    talles: f.talles ?? [],
    variantes: f.variantes?.length ? f.variantes : (semilla?.variantes ?? []),
    ambiente: f.ambiente?.length ? f.ambiente : (semilla?.ambiente ?? []),
    masVendido: f.masVendido,
    trending: f.trending,
    nuevo: f.nuevo,
  };
}

/** El catálogo público: sólo lo publicado, y sólo lo que tiene colores. */
export async function getProductos(): Promise<Producto[]> {
  if (!db) return SEMILLA;
  const filas = await db.select().from(tabla)
    .where(eq(tabla.publicado, true))
    .orderBy(asc(tabla.orden), asc(tabla.nombre));
  // Base vacía (recién creada, sin sembrar): mejor mostrar la semilla que
  // un catálogo en blanco.
  if (!filas.length) return SEMILLA;
  return filas.map(aProducto).filter((p) => p.variantes.length > 0);
}

export async function getProducto(id: string): Promise<Producto | null> {
  if (!db) return SEMILLA.find((p) => p.id === id) ?? null;
  const [fila] = await db.select().from(tabla).where(eq(tabla.id, id)).limit(1);
  if (fila) return aProducto(fila);
  return SEMILLA.find((p) => p.id === id) ?? null;
}

/** El panel ve TODO, publicado o no, con stock y flags. */
export async function getProductosAdmin() {
  if (!db) return null;   // null = "no hay base configurada"
  return db.select().from(tabla).orderBy(asc(tabla.orden), asc(tabla.nombre));
}

export { hayBase };
