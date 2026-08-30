import type { Metadata } from "next";
import { Fraunces, Karla } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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

/* Base para las direcciones absolutas de Open Graph. En Vercel la da la
   plataforma; en local cae al puerto de desarrollo. */
const BASE =
  process.env.NEXT_PUBLIC_SITIO ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3200");

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: "Shaula Tulum · Camisas, pantalones y conjuntos hechos a mano",
  description:
    "Catálogo de Shaula Tulum: camisa, pantalón y conjunto en gasa de algodón lavada, teñidos a mano en tandas cortas. Once colores de camisa, cinco de pantalón.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${fraunces.variable} ${karla.variable} flex min-h-screen flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
