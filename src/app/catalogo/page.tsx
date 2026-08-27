import type { Metadata } from "next";
import CatalogoCliente from "@/components/CatalogoCliente";
import { CATEGORIAS, type Categoria } from "@/data/productos";
import { getProductos } from "@/lib/catalogo";

export const metadata: Metadata = {
  title: "Catálogo · Shaula Tulum",
  description: "Lino, algodón crudo y fibras naturales. Filtrá por prenda, precio o color.",
};

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const [{ categoria }, productos] = await Promise.all([searchParams, getProductos()]);
  const valida = CATEGORIAS.some((c) => c.slug === categoria);

  return (
    <div className="px-5 sm:px-8">
      <div className="mx-auto max-w-6xl pb-2 pt-12">
        <p className="eyebrow">Todo lo que hay</p>
        <h1 className="display-md mt-1.5 text-[32px] text-tinta sm:text-[40px]">Catálogo</h1>
        <p className="medida mt-3 text-[15px] leading-relaxed text-sombra">
          Piezas de lino, algodón y fibra de henequén. Filtrá por tipo de
          prenda o por precio, o buscá directamente por la tela o el color que tenés en
          la cabeza.
        </p>
      </div>

      <CatalogoCliente productos={productos} categoriaInicial={valida ? (categoria as Categoria) : "todas"} />
    </div>
  );
}
