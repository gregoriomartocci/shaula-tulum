import Link from "next/link";
import Logo from "./Logo";

const NAV = [
  { href: "/catalogo", texto: "Catálogo" },
  { href: "/lifestyle", texto: "Lifestyle" },
  { href: "/nosotros", texto: "Nosotros" },
  { href: "/contacto", texto: "Contacto" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-arena bg-cal/92 backdrop-blur-sm">
      <div className="mx-auto flex h-[64px] max-w-6xl items-center justify-between gap-3 px-4 sm:h-[72px] sm:gap-4 sm:px-8">
        <Link href="/" aria-label="Shaula Tulum, inicio" className="-my-3 flex items-center py-3">
          <Logo />
        </Link>

        {/* -my-2 py-2 en cada enlace: el área tocable llega a 44px sin
            mover el renglón ni cambiar el aspecto del header. */}
        <nav className="flex shrink-0 items-center gap-3 sm:gap-7">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="relative -my-3 whitespace-nowrap py-3 text-[13px] text-sombra sm:text-[14px] transition-colors hover:text-tinta
                         after:absolute after:bottom-2 after:left-0 after:h-px after:w-0 after:bg-madera
                         after:transition-all hover:after:w-full"
            >
              {n.texto}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
