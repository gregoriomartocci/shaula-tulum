import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

/* Los tests cubren la lógica pura: el filtrado y orden del catálogo, y la
   generación de los identificadores que van en la URL. Corren en Node, sin
   navegador ni base de datos. */
export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
