import { notFound, redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import FormularioProducto from "@/components/FormularioProducto";
import { db } from "@/db";
import { productos as tabla } from "@/db/schema";
import { estaLogueado } from "@/lib/auth";
import { editarProducto } from "../acciones";

export default async function EditarPiezaPage({ params }: { params: Promise<{ id: string }> }) {
  if (!(await estaLogueado())) redirect("/admin/login");
  const { id } = await params;
  if (!db) redirect("/admin");

  const [fila] = await db.select().from(tabla).where(eq(tabla.id, id)).limit(1);
  if (!fila) notFound();

  return <FormularioProducto accion={editarProducto} producto={fila} titulo={fila.nombre} />;
}
