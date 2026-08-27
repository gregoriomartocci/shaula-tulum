import Link from "next/link";
import { Marca } from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-arena bg-cal-hondo">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-3 sm:px-8">
        <div>
          <div className="flex items-center gap-3">
            <Marca className="h-8 w-auto shrink-0 text-tinta" />
            <p className="font-display text-[20px] font-medium text-tinta">Shaula Tulum</p>
          </div>
          <p className="medida mt-3 text-[14px] leading-relaxed text-sombra">
            Lino, algodón crudo y fibras del Caribe mexicano. Piezas hechas a mano
            en Yucatán y Quintana Roo.
          </p>
        </div>

        <div>
          <p className="eyebrow">Catálogo</p>
          <ul className="mt-3 space-y-1.5 text-[14px]">
            {[
              ["/catalogo", "Ver todo"],
              ["/catalogo?categoria=camisas", "Camisas"],
              ["/catalogo?categoria=vestidos", "Vestidos"],
              ["/catalogo?categoria=accesorios", "Accesorios"],
            ].map(([href, txt]) => (
              <li key={href}>
                <Link href={href} className="text-sombra transition-colors hover:text-madera">
                  {txt}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">La casa</p>
          <ul className="mt-3 space-y-1.5 text-[14px]">
            <li><Link href="/nosotros" className="text-sombra transition-colors hover:text-madera">Quiénes somos</Link></li>
            <li><Link href="/contacto" className="text-sombra transition-colors hover:text-madera">Contacto</Link></li>
          </ul>
          <p className="mt-5 text-[13px] leading-relaxed text-sombra">
            Este sitio es un catálogo. No hay venta en línea: las piezas se
            encargan por contacto directo.
          </p>
        </div>
      </div>

      <div className="border-t border-arena">
        <p className="mx-auto max-w-6xl px-5 py-5 text-[12px] text-sombra sm:px-8">
          © {new Date().getFullYear()} Shaula Tulum
        </p>
      </div>
    </footer>
  );
}
