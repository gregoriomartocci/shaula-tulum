import { redirect } from "next/navigation";
import FormularioProducto from "@/components/FormularioProducto";
import { estaLogueado } from "@/lib/auth";
import { crearProducto } from "../acciones";

export default async function NuevaPiezaPage() {
  if (!(await estaLogueado())) redirect("/admin/login");
  return <FormularioProducto accion={crearProducto} titulo="Nueva pieza" />;
}
