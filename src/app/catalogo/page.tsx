import type { Metadata } from "next";
import CatalogoCliente from "@/components/CatalogoCliente";
import { CATEGORIAS, type Categoria } from "@/data/productos";
import { getProductos } from "@/lib/catalogo";

export const metadata: Metadata = {
  title: "Catálogo — 22 colores de camisa, pantalón y conjunto",
  description:
    "Camisas, pantalones y conjuntos de gasa de algodón teñidos a mano en Tulum. " +
    "Once colores de camisa, cinco de pantalón, seis de conjunto. Envíos a todo México.",
  alternates: { canonical: "/catalogo" },
  openGraph: {
    type: "website",
    url: "/catalogo",
    title: "Catálogo · Shaula Tulum",
    description: "22 colores de camisa, pantalón y conjunto, teñidos a mano en tandas cortas.",
  },
};

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const [{ categoria }, productos] = await Promise.all([searchParams, getProductos()]);
  const valida = CATEGORIAS.some((c) => c.slug === categoria);
  const colores = productos.reduce((n, p) => n + p.variantes.length, 0);

  return (
    <div className="px-5 sm:px-8">
      <div className="mx-auto max-w-6xl pb-2 pt-12">
        <p className="eyebrow">Tres prendas, {colores} colores</p>
        <h1 className="display-md mt-1.5 text-[32px] text-tinta sm:text-[40px]">Catálogo</h1>
        <p className="medida mt-3 text-[15px] leading-relaxed text-sombra">
          La casa hace tres prendas: la camisa, el pantalón y el conjunto de las dos.
          Lo que cambia es el color, y el color se tiñe a mano — por eso cada tono
          está fotografiado por separado. Busca el que traes en la cabeza.
        </p>
      </div>

      <CatalogoCliente
        productos={productos}
        categoriaInicial={valida ? (categoria as Categoria) : "todas"}
      />
    </div>
  );
}
