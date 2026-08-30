/* Carga las tres prendas de src/data/productos.ts en la base, con sus
   colores y su media. Idempotente: si la prenda ya existe, la deja como
   está (no pisa cambios hechos desde el panel). Correr con: npm run db:seed */

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
  subtitulo: p.subtitulo,
  categoria: p.categoria,
  precio: p.precio ?? null,          // sin lista de precios: "a consultar"
  tono: p.tono,
  tela: p.tela,
  descripcion: p.descripcion,
  detalles: p.detalles,
  cuidado: p.cuidado,
  talles: p.talles,
  variantes: p.variantes,
  ambiente: p.ambiente,
  stock: null,                       // el inventario arranca sin control
  masVendido: p.masVendido ?? false,
  trending: p.trending ?? false,
  nuevo: p.nuevo ?? false,
  publicado: true,
  orden: i,
}));

const res = await db.insert(tabla).values(filas).onConflictDoNothing().returning({ id: tabla.id });
const colores = PRODUCTOS.reduce((n, p) => n + p.variantes.length, 0);
console.log(`Sembradas ${res.length} prendas nuevas (de ${filas.length} en el archivo, ${colores} colores).`);
if (res.length === 0) console.log("Ya estaban todas: no se pisó nada.");
