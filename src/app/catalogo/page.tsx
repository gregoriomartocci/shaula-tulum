import type { Metadata } from "next";
import CatalogoCliente from "@/components/CatalogoCliente";
import { CATEGORIAS, type Categoria } from "@/data/productos";
import { getProductos } from "@/lib/catalogo";

export const metadata: Metadata = {
  title: "Catálogo · Shaula Tulum",
  description:
    "Camisas, pantalones y conjuntos de gasa de algodón, teñidos a mano. Buscá por color.",
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
          está fotografiado por separado. Buscá el que tenés en la cabeza.
        </p>
      </div>

      <CatalogoCliente
        productos={productos}
        categoriaInicial={valida ? (categoria as Categoria) : "todas"}
      />
    </div>
  );
}
