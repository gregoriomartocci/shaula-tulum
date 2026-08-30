import { pgTable, text, integer, boolean, timestamp, serial, jsonb } from "drizzle-orm/pg-core";
import type { Variante } from "../data/productos";

/* Espeja el tipo `Producto` de src/data/productos.ts. Ese archivo sigue
   existiendo como SEMILLA: es lo que se carga la primera vez y también el
   respaldo cuando no hay base configurada (desarrollo sin DATABASE_URL). */
export const productos = pgTable("productos", {
  id: text("id").primaryKey(),               // el slug: "camisa"
  nombre: text("nombre").notNull(),
  subtitulo: text("subtitulo").notNull().default(""),
  categoria: text("categoria").notNull(),

  /* El precio es OPCIONAL: hoy la casa no publica lista de precios y la
     ficha dice "a consultar". El día que haya lista se carga desde el
     panel y aparece sola, sin tocar código. */
  precio: integer("precio"),

  tono: text("tono").notNull().default("#e8dcc8"),
  tela: text("tela").notNull().default(""),
  descripcion: text("descripcion").notNull().default(""),
  detalles: text("detalles").array().notNull().default([]),
  cuidado: text("cuidado").notNull().default(""),
  talles: text("talles").array().notNull().default([]),

  /* Los colores, con sus fotos y videos. Va como JSON porque es una lista
     de objetos anidados, no una columna por campo: el panel edita textos y
     stock, y la media se versiona con el código junto a los archivos. */
  variantes: jsonb("variantes").$type<Variante[]>().notNull().default([]),
  /** Fotos de contexto (looks, percheros) que no son de un color puntual. */
  ambiente: text("ambiente").array().notNull().default([]),

  /* Inventario. `stock` es el total de unidades disponibles; null quiere
     decir "no se lleva control", que es distinto de cero (agotado). */
  stock: integer("stock"),

  masVendido: boolean("mas_vendido").notNull().default(false),
  trending: boolean("trending").notNull().default(false),
  nuevo: boolean("nuevo").notNull().default(false),
  /* Una prenda puede sacarse del catálogo sin borrarla — así no se pierde
     el histórico ni hay que volver a cargarla la próxima temporada. */
  publicado: boolean("publicado").notNull().default(true),
  orden: integer("orden").notNull().default(0),

  creadoEn: timestamp("creado_en").notNull().defaultNow(),
  actualizadoEn: timestamp("actualizado_en").notNull().defaultNow(),
});

/* Historial de movimientos de stock: cada ajuste queda registrado con su
   motivo. Sin esto, "¿por qué había 12 y ahora hay 4?" no tiene respuesta. */
export const movimientosStock = pgTable("movimientos_stock", {
  id: serial("id").primaryKey(),
  productoId: text("producto_id").notNull(),
  delta: integer("delta").notNull(),          // +5 repuesto, -1 vendido
  stockResultante: integer("stock_resultante").notNull(),
  motivo: text("motivo").notNull().default(""),
  fecha: timestamp("fecha").notNull().defaultNow(),
});

export type ProductoDb = typeof productos.$inferSelect;
export type ProductoNuevo = typeof productos.$inferInsert;
