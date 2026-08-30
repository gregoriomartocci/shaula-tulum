import type { MetadataRoute } from "next";
import { BASE } from "@/lib/sitio";

/* El panel no se indexa: es de una sola persona y no tiene nada que hacer
   en Google. El resto del sitio, sí. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/admin" },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
