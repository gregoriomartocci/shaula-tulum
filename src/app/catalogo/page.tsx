import type { Metadata } from "next";
import CatalogoCliente from "@/components/CatalogoCliente";
import { CATEGORIAS, type Categoria } from "@/data/productos";
import { getProductos } from "@/lib/catalogo";

export const metadata: Metadata = {
  title: "Catálogo — 16 colores de camisa y pantalón",
  description:
    "Camisas y pantalones de gasa de algodón teñidos a mano en Tulum. " +
    "Once colores de camisa y cinco de pantalón. Envíos a todo México.",
  alternates: { canonical: "/catalogo" },
  openGraph: {
    type: "website",
    url: "/catalogo",
    title: "Catálogo · Shaula Tulum",
    description: "16 colores de camisa y pantalón, teñidos a mano en tandas cortas.",
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
        <p className="eyebrow">Dos prendas, {colores} colores</p>
        <h1 className="display-md mt-1.5 text-[32px] text-tinta sm:text-[40px]">Catálogo</h1>
        <p className="medida mt-3 text-[15px] leading-relaxed text-sombra">
          La casa hace dos prendas: la camisa y el pantalón. Lo que cambia es el
          color, y el color se tiñe a mano — por eso cada tono
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
