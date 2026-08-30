import { enlaceWhatsApp, hayWhatsApp } from "@/lib/sitio";

/* Botón de WhatsApp con el mensaje ya escrito.

   El texto del mensaje llega armado desde donde se toca —con la prenda y
   el color que la persona estaba mirando— así del otro lado no hay que
   preguntar "¿cuál te interesa?". Esa pregunta de más es donde se pierden
   la mitad de las conversaciones.

   Si no hay número cargado, este componente no dibuja nada: quien lo usa
   muestra el correo en su lugar. */

function Icono({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden focusable="false">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.09-.16.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.47c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03s.87 2.35.99 2.51c.12.16 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.19 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.05.14-1.16-.06-.1-.22-.16-.47-.29Z" />
    </svg>
  );
}

export default function BotonWhatsApp({
  mensaje,
  texto = "Consultar por WhatsApp",
  className = "",
}: {
  mensaje: string;
  texto?: string;
  className?: string;
}) {
  if (!hayWhatsApp) return null;
  return (
    <a
      href={enlaceWhatsApp(mensaje)}
      target="_blank"
      rel="noopener noreferrer"
      className={
        "flex min-h-12 items-center justify-center gap-2 rounded-full bg-madera px-6 text-[15px] " +
        "font-medium text-cal transition-colors hover:bg-tinta " + className
      }
    >
      <Icono className="h-[18px] w-[18px] shrink-0" />
      {texto}
    </a>
  );
}
