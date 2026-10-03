import type { MetadataRoute } from "next";
import { getProductos } from "@/lib/catalogo";
import { BASE } from "@/lib/sitio";

/* El mapa del sitio se arma solo desde el catálogo: si mañana hay una
   prenda más, entra sin que nadie se acuerde de tocar este archivo. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const productos = await getProductos();
  const ahora = new Date();

  const fijas: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,          lastModified: ahora, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/catalogo`,  lastModified: ahora, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/lifestyle`, lastModified: ahora, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/nosotros`,  lastModified: ahora, changeFrequency: "yearly",  priority: 0.5 },
    { url: `${BASE}/contacto`,  lastModified: ahora, changeFrequency: "yearly",  priority: 0.6 },
  ];

  const prendas: MetadataRoute.Sitemap = productos.map((p) => ({
    url: `${BASE}/catalogo/${p.id}`,
    lastModified: ahora,
    changeFrequency: "weekly" as const,
    priority: 0.8,
    /* Google entiende que estas fotos pertenecen a la página, así que la
       prenda puede aparecer también en la búsqueda por imágenes — que para
       ropa es la mitad del tráfico. */
    images: p.variantes.flatMap((v) => v.fotos).map((f) => `${BASE}${f}`),
  }));

  return [...fijas, ...prendas];
}
