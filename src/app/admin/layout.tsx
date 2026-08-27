import type { Metadata } from "next";
import Link from "next/link";
import { estaLogueado, hayPassword } from "@/lib/auth";
import { salir } from "./acciones";
import { Marca } from "@/components/Logo";

export const metadata: Metadata = { title: "Panel · Shaula Tulum", robots: { index: false, follow: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const dentro = await estaLogueado();

  return (
    <div className="min-h-screen bg-cal">
      <div className="border-b border-arena bg-cal-hondo">
        <div className="mx-auto flex h-[60px] max-w-5xl items-center justify-between gap-4 px-5">
          <Link href="/admin" className="flex items-center gap-2.5">
            <Marca className="h-6 w-auto text-tinta" />
            <span className="font-display text-[17px] font-semibold text-tinta">Panel</span>
          </Link>
          <div className="flex items-center gap-4 text-[13px]">
            <Link href="/" className="text-sombra hover:text-madera">Ver el sitio ↗</Link>
            {dentro && hayPassword() && (
              <form action={salir}>
                <button className="text-sombra hover:text-madera">Salir</button>
              </form>
            )}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-5 py-8">{children}</div>
    </div>
  );
}
