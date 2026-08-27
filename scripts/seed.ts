/* Carga las 24 piezas de src/data/productos.ts en la base.
   Idempotente: si la pieza ya existe, la deja como está (no pisa cambios
   hechos desde el panel). Correr con: npm run db:seed */

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { productos as tabla } from "../src/db/schema";
import { PRODUCTOS } from "../src/data/productos";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("Falta DATABASE_URL. Ponela en .env.local o exportala antes de correr esto.");
  process.exit(1);
}

const db = drizzle(neon(url));

const filas = PRODUCTOS.map((p, i) => ({
  id: p.id,
  nombre: p.nombre,
  categoria: p.categoria,
  precio: p.precio,
  tono: p.tono,
  foto: p.foto ?? null,
  colores: p.colores,
  talles: p.talles,
  tela: p.tela,
  descripcion: p.descripcion,
  stock: null,                       // el inventario arranca sin control
  masVendido: p.masVendido ?? false,
  trending: p.trending ?? false,
  nuevo: p.nuevo ?? false,
  publicado: true,
  orden: i,
}));

const res = await db.insert(tabla).values(filas).onConflictDoNothing().returning({ id: tabla.id });
console.log(`Sembradas ${res.length} piezas nuevas (de ${filas.length} en el archivo).`);
if (res.length === 0) console.log("Ya estaban todas: no se pisó nada.");
