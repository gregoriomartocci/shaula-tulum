import type { Metadata } from "next";
import { Fraunces, Karla } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DatosEstructurados from "@/components/DatosEstructurados";
import { BASE, SITIO, url } from "@/lib/sitio";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  /* El título de la home lleva las palabras con las que alguien busca esto
     —"camisas de algodón", "ropa artesanal", "Tulum"— antes que el nombre
     de la marca, que todavía nadie conoce. Las demás páginas heredan la
     plantilla y sólo ponen lo suyo. */
  title: {
    default: "Shaula Tulum · Camisas y pantalones de algodón hechos a mano en México",
    template: "%s · Shaula Tulum",
  },
  description: SITIO.descripcion,
  applicationName: SITIO.nombre,
  keywords: [
    "ropa artesanal mexicana", "camisas de algodón hechas a mano",
    "gasa de algodón", "ropa de Tulum", "camisa cuello mao hombre",
    "pantalón de pinzas algodón",
    "ropa teñida a mano", "moda artesanal México", "ropa de lino y algodón Tulum",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITIO.nombre,
    locale: "es_MX",
    url: url("/"),
    title: "Shaula Tulum · Ropa artesanal de gasa de algodón",
    description: SITIO.descripcion,
    images: [{ url: SITIO.og, width: 1200, height: 630, alt: "Camisas Shaula Tulum en todos sus colores" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shaula Tulum · Ropa artesanal de gasa de algodón",
    description: SITIO.descripcion,
    images: [SITIO.og],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  /* Safari convierte solo los números largos en enlaces de teléfono, y
     "22 colores" no es un teléfono. */
  formatDetection: { telephone: false, address: false },
};

/* Quién es la casa, para el buscador. `areaServed` dice México entero: se
   vende a todo el país aunque el taller esté en Tulum. */
const NEGOCIO = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  "@id": `${BASE}#negocio`,
  name: SITIO.nombre,
  description: SITIO.descripcion,
  url: url("/"),
  image: url(SITIO.og),
  slogan: "Estilo atemporal.",
  address: {
    "@type": "PostalAddress",
    addressLocality: SITIO.ciudad,
    addressRegion: SITIO.region,
    addressCountry: SITIO.pais,
  },
  areaServed: { "@type": "Country", name: "México" },
  sameAs: [SITIO.instagram],
  knowsLanguage: ["es-MX"],
  makesOffer: {
    "@type": "Offer",
    itemOffered: { "@type": "Product", name: "Ropa artesanal de gasa de algodón" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /* Las variables de next/font van en <html>, NO en <body>.

       El bloque @theme de globals.css arma --font-display a partir de
       var(--font-fraunces), y @theme declara sus variables en :root, que es
       <html>. Con las clases de next/font en <body>, --font-fraunces no
       existe todavía en :root: --font-display queda inválida, y toda la
       tipografía de la casa cae a la fuente del sistema — en todos los
       navegadores, sin un solo error en consola.

       lang="es-MX" y no "es": el país importa para a quién se le muestra. */
    <html lang={SITIO.idioma} className={`${fraunces.variable} ${karla.variable}`}>
      <body className="flex min-h-screen flex-col">
        <DatosEstructurados datos={NEGOCIO} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
