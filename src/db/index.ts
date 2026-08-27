import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

/* La base es OPCIONAL a propósito.

   Sin DATABASE_URL la app sigue andando: el catálogo se sirve desde
   src/data/productos.ts y el panel avisa que falta configurarla. Eso
   permite desplegar y ver el sitio en línea HOY, y conectar la base
   después, sin un estado roto en el medio. */
const url = process.env.DATABASE_URL;

export const hayBase = Boolean(url);

export const db = url
  ? drizzle(neon(url), { schema })
  : null;

export { schema };
