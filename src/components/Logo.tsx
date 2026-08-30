/* ══════════════════════════════════════════════════════════════
   Marca de Shaula Tulum.

   Recreación en vector del logo de la marca: el trazo de pincel que baja
   afinándose y el anillo al costado. Se redibujó como path para que sea
   nítido a cualquier tamaño y herede el color del contexto
   (`currentColor`), cosa que un PNG no puede hacer.

   ⚠️ Esto es una RECREACIÓN, no el archivo original. La textura de tinta
   del dibujo a mano no está — a tamaño de header no se vería igual, pero
   si hace falta el grano (impresión, etiquetas, tamaños grandes) hay que
   reemplazarlo por el archivo real de la marca.
   ══════════════════════════════════════════════════════════════ */

export function Marca({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="175 38 152 390"
      fill="currentColor"
      className={className}
      aria-hidden
      focusable="false"
    >
      {/* el trazo: baja afinándose y quiebra a la derecha al pie */}
      <path d="M203 46C189 122 183 192 186 252C190 312 204 357 232 396C241 408 247 413 254 419L281 409C263 379 249 349 236 304C223 254 216 189 212 129C210 94 207 64 203 46Z" />
      {/* el anillo, con el hueco descentrado como en el original */}
      <path
        d="M284 250.5a38.5 38.5 0 1 1 0 77 38.5 38.5 0 0 1 0-77Zm-2.5 27a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19Z"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default function Logo({
  compacto = false,
  className = "",
}: {
  compacto?: boolean;
  className?: string;
}) {
  return (
    <span className={`flex items-center gap-3 leading-none ${className}`}>
      <Marca className="h-9 w-auto shrink-0 text-tinta sm:h-10" />
      {/* Por debajo de 360px de ancho —un iPhone chico, o uno normal con el
          zoom de Safari al 125%— el nombre escrito se esconde y queda la
          marca sola. Es preferible eso a que la navegación se corte. */}
      <span className="flex flex-col leading-none max-[359px]:hidden">
        <span
          className="font-display text-[20px] font-semibold tracking-[0.01em] text-tinta sm:text-[23px]"
          style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1, "opsz" 48' }}
        >
          Shaula
        </span>
        {!compacto && (
          <span className="mt-[4px] text-[9px] font-bold uppercase tracking-[0.36em] text-henequen">
            Tulum
          </span>
        )}
      </span>
    </span>
  );
}
