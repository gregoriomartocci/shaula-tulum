import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getProductosAdmin } from "@/lib/catalogo";
import { hayBase } from "@/db";
import { estaLogueado, hayPassword } from "@/lib/auth";
import { CATEGORIAS } from "@/data/productos";
import { ajustarStock, alternarPublicado, borrarProducto } from "./acciones";

function Aviso({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[3px] border border-henequen/50 bg-henequen/10 px-5 py-4">
      <p className="font-display text-[17px] font-medium text-tinta">{titulo}</p>
      <div className="mt-2 space-y-2 text-[14px] leading-relaxed text-sombra">{children}</div>
    </div>
  );
}

export default async function AdminPage() {
  if (!hayPassword()) {
    return (
      <Aviso titulo="Falta configurar la contraseña del panel">
        <p>
          Definí <code className="rounded bg-arena px-1.5 py-0.5 text-[13px]">ADMIN_PASSWORD</code> en
          las variables de entorno. En local va en <code className="rounded bg-arena px-1.5 py-0.5 text-[13px]">.env.local</code>;
          en Vercel, en Settings → Environment Variables.
        </p>
      </Aviso>
    );
  }
  if (!(await estaLogueado())) redirect("/admin/login");

  const filas = await getProductosAdmin();

  if (!hayBase || !filas) {
    return (
      <Aviso titulo="Falta conectar la base de datos">
        <p>
          El sitio está andando con el catálogo de ejemplo, pero para cargar y editar
          piezas hace falta una base. Definí{" "}
          <code className="rounded bg-arena px-1.5 py-0.5 text-[13px]">DATABASE_URL</code> y después
          corré <code className="rounded bg-arena px-1.5 py-0.5 text-[13px]">npm run db:push</code> y{" "}
          <code className="rounded bg-arena px-1.5 py-0.5 text-[13px]">npm run db:seed</code>.
        </p>
        <p>Los pasos exactos están en el README.</p>
      </Aviso>
    );
  }

  const total = filas.length;
  const publicadas = filas.filter((f) => f.publicado).length;
  const sinStock = filas.filter((f) => f.stock != null && f.stock === 0);
  const bajas = filas.filter((f) => f.stock != null && f.stock > 0 && f.stock <= 3);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="display-md text-[28px] font-medium text-tinta">Catálogo</h1>
          <p className="mt-1 text-[14px] text-sombra">
            {total} piezas · {publicadas} publicadas
            {sinStock.length > 0 && <> · <span className="text-red-700">{sinStock.length} agotadas</span></>}
            {bajas.length > 0 && <> · <span className="text-madera">{bajas.length} con stock bajo</span></>}
          </p>
        </div>
        <Link
          href="/admin/nuevo"
          className="rounded-full bg-madera px-5 py-2.5 text-[14px] font-medium text-cal transition-colors hover:bg-tinta"
        >
          + Nueva pieza
        </Link>
      </div>

      <div className="mt-7 divide-y divide-arena border-y border-arena">
        {filas.map((f) => {
          const cat = CATEGORIAS.find((c) => c.slug === f.categoria)?.nombre ?? f.categoria;
          const agotada = f.stock != null && f.stock === 0;
          const baja = f.stock != null && f.stock > 0 && f.stock <= 3;
          return (
            <div key={f.id} className="flex flex-wrap items-center gap-x-4 gap-y-3 py-3.5">
              <div className="relative h-[58px] w-[46px] shrink-0 overflow-hidden rounded-[2px] bg-arena ring-1 ring-inset ring-black/[0.07]">
                {f.foto && <Image src={f.foto} alt="" fill sizes="46px" className="object-cover" />}
              </div>

              <div className="min-w-[180px] flex-1">
                <Link href={`/admin/${f.id}`} className="font-display text-[16px] font-medium text-tinta hover:text-madera">
                  {f.nombre}
                </Link>
                <p className="text-[12.5px] text-sombra">
                  {cat} · ${f.precio}
                  {!f.publicado && <span className="ml-2 text-henequen">· oculta</span>}
                </p>
              </div>

              {/* Inventario, editable sin abrir la ficha */}
              <div className="flex items-center gap-1.5">
                <form action={ajustarStock}>
                  <input type="hidden" name="id" value={f.id} />
                  <input type="hidden" name="delta" value="-1" />
                  <button
                    aria-label={`Restar una unidad de ${f.nombre}`}
                    className="h-7 w-7 rounded-full border border-arena-hondo text-[15px] leading-none text-sombra transition-colors hover:border-madera hover:text-madera"
                  >−</button>
                </form>
                <span
                  className={`w-12 text-center text-[14px] tabular-nums ${
                    agotada ? "font-semibold text-red-700" : baja ? "font-semibold text-madera" : "text-tinta"
                  }`}
                  title={f.stock == null ? "Sin control de stock" : `${f.stock} en inventario`}
                >
                  {f.stock == null ? "—" : f.stock}
                </span>
                <form action={ajustarStock}>
                  <input type="hidden" name="id" value={f.id} />
                  <input type="hidden" name="delta" value="1" />
                  <button
                    aria-label={`Sumar una unidad de ${f.nombre}`}
                    className="h-7 w-7 rounded-full border border-arena-hondo text-[15px] leading-none text-sombra transition-colors hover:border-madera hover:text-madera"
                  >+</button>
                </form>
              </div>

              <div className="flex items-center gap-3 text-[13px]">
                <form action={alternarPublicado}>
                  <input type="hidden" name="id" value={f.id} />
                  <button className="text-sombra underline underline-offset-4 hover:text-madera">
                    {f.publicado ? "Ocultar" : "Publicar"}
                  </button>
                </form>
                <Link href={`/admin/${f.id}`} className="text-madera underline underline-offset-4 hover:text-madera-claro">
                  Editar
                </Link>
                <form action={borrarProducto}>
                  <input type="hidden" name="id" value={f.id} />
                  <button className="text-sombra underline underline-offset-4 hover:text-red-700">
                    Borrar
                  </button>
                </form>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
