/* Muestra de tela.

   Todavía no hay fotografía de producto. La alternativa honesta a un
   cuadro gris roto es mostrar la TELA: el tono real de la prenda con una
   trama de lino dibujada encima. Comunica algo verdadero del producto
   (color y textura) en vez de ocupar espacio, y el día que haya fotos se
   reemplaza este componente sin tocar nada más. */

export default function MuestraTela({
  tono,
  className = "",
  children,
}: {
  tono: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`trama relative overflow-hidden ${className}`}
      style={{ backgroundColor: tono }}
      role="img"
      aria-label="Muestra de la tela de la prenda"
    >
      {children}
    </div>
  );
}
