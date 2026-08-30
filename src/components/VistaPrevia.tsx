"use client";

import { useEffect, useRef, useState } from "react";

/* Vista previa en movimiento al pasar el mouse por una tarjeta.

   Tres decisiones para que esto sume y no moleste:

   1. Sólo donde hay mouse de verdad. En un teléfono, `mouseenter` se
      dispara con el mismo toque que además navega, así que el video
      arrancaría justo cuando la página se va. `(hover: hover)` lo evita.

   2. Recién a los 220 ms de hover sostenido. Pasar el mouse por encima
      camino a otra cosa no es interés: sin esa espera, cruzar la grilla
      de punta a punta dispara seis descargas.

   3. El <video> se monta al empezar y se desmonta al salir, así el
      navegador no descarga nada hasta que hace falta y corta cuando el
      mouse se fue. Y el archivo es el recorte liviano de tres segundos
      (~1 MB), no el video entero. */

const ESPERA_MS = 220;

export default function VistaPrevia({ src, poster }: { src: string; poster: string }) {
  const [activa, setActiva] = useState(false);
  const reloj = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (reloj.current) clearTimeout(reloj.current); }, []);

  function entrar() {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (reloj.current) clearTimeout(reloj.current);
    reloj.current = setTimeout(() => setActiva(true), ESPERA_MS);
  }

  function salir() {
    if (reloj.current) clearTimeout(reloj.current);
    setActiva(false);
  }

  return (
    <span
      className="absolute inset-0 z-[1] block"
      onMouseEnter={entrar}
      onMouseLeave={salir}
      onFocus={entrar}
      onBlur={salir}
      aria-hidden
    >
      {activa && (
        <video
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          /* Aparece cuando ya hay imagen que mostrar: si se mostrara antes,
             se vería un salto del póster a la primera cuadro del video. */
          className="h-full w-full object-cover opacity-0 transition-opacity duration-500"
          onPlaying={(e) => { e.currentTarget.style.opacity = "1"; }}
        />
      )}
    </span>
  );
}
