import Link from "next/link";
import Logo from "./Logo";

const NAV = [
  { href: "/catalogo", texto: "Catálogo" },
  { href: "/nosotros", texto: "Nosotros" },
  { href: "/contacto", texto: "Contacto" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-arena bg-cal/92 backdrop-blur-sm">
      <div className="mx-auto flex h-[64px] max-w-6xl items-center justify-between gap-4 px-5 sm:h-[72px] sm:px-8">
        <Link href="/" aria-label="Shaula Tulum, inicio">
          <Logo />
        </Link>

        <nav className="flex items-center gap-4 sm:gap-7">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="relative text-[13.5px] text-sombra transition-colors hover:text-tinta sm:text-[14px]
                         after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-madera
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
