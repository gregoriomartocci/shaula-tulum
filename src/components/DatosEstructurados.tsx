/* Datos estructurados (JSON-LD) para los buscadores.

   Es la misma información que ya está en la página, pero en el formato que
   Google lee sin tener que adivinar: qué es la marca, dónde está, qué
   vende y en qué colores. Sin esto, un buscador ve texto suelto; con esto
   puede mostrar la prenda con foto y datos en el resultado. */
export default function DatosEstructurados({ datos }: { datos: object }) {
  return (
    <script
      type="application/ld+json"
      /* El escape de "<" evita que un texto con etiquetas dentro de los
         datos pueda cerrar el <script> antes de tiempo. */
      dangerouslySetInnerHTML={{ __html: JSON.stringify(datos).replace(/</g, "\\u003c") }}
    />
  );
}
