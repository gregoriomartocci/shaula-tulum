# Shaula Tulum

Catálogo de ropa artesanal mexicana.

> Estilo atemporal. Hecho 100% artesanal por artesanos de México.

**No es una tienda**: no hay carrito, pasarela de pago ni stock. Es un catálogo
navegable — se mira, se filtra, y la compra se coordina por contacto directo.
Esa decisión está reflejada en toda la interfaz, no sólo en el texto.

## Correr el proyecto

```bash
npm install
cp .env.example .env.local   # y completá ADMIN_PASSWORD
npm run dev                  # http://localhost:3200
```

## Panel de administración

En `/admin`. Permite cargar piezas, editarlas, ocultarlas sin borrarlas, y
llevar el inventario (`+` / `−` desde la lista, o un número exacto en la ficha).
Cada movimiento de stock queda registrado en `movimientos_stock` con su motivo,
así "¿por qué había 12 y ahora hay 4?" tiene respuesta.

Necesita dos variables de entorno:

| Variable | Para qué | Si falta |
|---|---|---|
| `ADMIN_PASSWORD` | Entrar al panel | El panel avisa y no deja entrar |
| `DATABASE_URL` | Guardar los productos | **El sitio anda igual** con el catálogo de ejemplo; el panel avisa que no puede guardar |

Esa segunda fila es a propósito: se puede desplegar y ver el sitio en línea hoy, y
conectar la base después, sin un estado roto en el medio.

### Conectar la base

```bash
npm run db:push    # crea las tablas
npm run db:seed    # carga las 24 piezas de ejemplo (no pisa lo que ya exista)
npm run db:studio  # explorador visual de la base
```

## Desplegar en Vercel

**Paso 1 — subir el código a GitHub** (necesita tu cuenta):

```bash
git add -A
git commit -m "Shaula Tulum: catálogo y panel"
# creá el repo en github.com y después:
git remote add origin git@github.com:USUARIO/shaula-tulum.git
git push -u origin main
```

**Paso 2 — importar en Vercel.** En [vercel.com/new](https://vercel.com/new),
elegí el repo. Next.js se detecta solo, no hay que configurar el build.

**Paso 3 — variables de entorno.** En Settings → Environment Variables:

- `ADMIN_PASSWORD` — poné una contraseña larga y propia (**no** la de `.env.local`).

**Paso 4 — la base.** En la pestaña Storage del proyecto, "Create Database" →
Postgres (es Neon por dentro). Vercel inyecta `DATABASE_URL` solo. Después, desde
tu máquina, con esa URL en `.env.local`:

```bash
npm run db:push
npm run db:seed
```

**Alternativa sin GitHub**: `npx vercel` desde esta carpeta. Pide autenticación
por navegador y sube el directorio directo.

### Antes de salir a producción

- [ ] Cambiar `ADMIN_PASSWORD` por una propia y larga
- [ ] Reemplazar las fotos de Unsplash por las reales
- [ ] Poner los datos de contacto verdaderos
- [ ] Cargar el catálogo real desde el panel

## Qué hay

| Ruta | Qué es |
|---|---|
| `/` | Landing: filosofía de la casa, más vendidos, tendencia, categorías |
| `/catalogo` | Grilla completa con búsqueda, filtro por categoría y precio, y orden |
| `/catalogo/[id]` | Ficha de cada pieza — 24 páginas pre-generadas en build |
| `/nosotros` | Quiénes somos, cómo se produce, qué no hacemos |
| `/contacto` | Formulario + canales directos + datos del taller |

## Decisiones de diseño

**Paleta.** Arena de Tulum con acento **madera** (`#7d5a3c`), el tono del
chicozapote con el que se hacen las vigas y los mostradores de la zona. Es tierra
sin caer en el terracota anaranjado: se apoya en la arena en vez de pelearse con
ella.

**Logo.** El de la marca: el trazo de pincel que baja afinándose y el anillo al
costado. Está **recreado como path SVG** (`src/components/Logo.tsx`) para que sea
nítido a cualquier tamaño y herede el color por `currentColor` — cosa que un PNG
no puede hacer. Se usa en el header, el footer y el favicon (`src/app/icon.svg`).

⚠️ Es una recreación, no el archivo original: **la textura de tinta del dibujo a
mano no está**. A tamaño de header no se notaría igual, pero para impresión,
etiquetas o tamaños grandes hay que reemplazarlo por el archivo real.

**Tipografía.** *Fraunces* para títulos (serif con eje óptico variable, carácter
artesanal — va con el concepto de "no ropa industrial") y *Karla* para texto.

**Un solo mundo visual.** No hay modo oscuro a propósito: un catálogo de lino
crudo en negro traiciona el concepto. Por eso todos los colores se pintan
explícitos y la página se ve igual con el sistema en claro o en oscuro.

**Fotos de prueba, elegidas mirándolas.** Las 23 fotos de `public/prendas/` son
de Unsplash (licencia libre, uso comercial permitido) y están asignadas prenda
por prenda **después de mirar cada una**, no por el nombre del archivo. Son datos
de prueba: hay que reemplazarlas por fotos reales del producto. El campo es
`foto` en `src/data/productos.ts`; si una prenda no la tiene, la tarjeta cae sola
a la muestra de tela dibujada en CSS (`MuestraTela`), así que nunca hay un cuadro
roto.

**Pensado para el teléfono primero.** Una tarjeta por fila en móvil (dos dejaba
las prendas del tamaño de una estampilla), dos en tablet, tres o cuatro en
desktop. Los filtros no envuelven nunca: buscador y precio en un renglón, las
categorías en una tira que scrollea de costado con difuminado al borde.

**El formulario no miente.** No hay backend, así que en vez de simular un envío
con un "¡Gracias!" falso, arma el mensaje y abre el cliente de correo del
visitante. Funciona sin servidor y no promete nada que no ocurra.

## Dónde tocar cosas

- **Productos**: `src/data/productos.ts` — un solo archivo, 24 piezas. Los flags
  `masVendido` / `trending` / `nuevo` son los que alimentan los carruseles de la
  landing y el orden "Destacados".
- **Categorías**: mismo archivo, arreglo `CATEGORIAS`.
- **Paleta y tipografía**: bloque `@theme` en `src/app/globals.css`.
- **Datos de contacto**: `src/app/contacto/page.tsx` (constante `CANALES`) y
  `src/components/FormularioContacto.tsx` (constante `DESTINO`). Hoy son de
  ejemplo — hay que reemplazarlos por los reales.

## Pendiente

- **Fotos reales del producto.** Las actuales son de Unsplash, de prueba.
- **Contenido del Instagram** ([@shaula_tulum](https://www.instagram.com/shaula_tulum/)).
  Instagram bloquea la descarga de fotos y textos de posts sin autenticación: se
  puede leer la bio y nada más. Para traer el feed hace falta la API de Instagram
  (cuenta de empresa + token) o bajarlo a mano.
- **Archivo original del logo**, si se necesita el grano de tinta (impresión,
  etiquetas). El vector actual sirve para pantalla.
- **Datos de contacto reales.** El correo, el WhatsApp y la dirección del taller
  hoy son de ejemplo.
- **Catálogo real**: las 24 prendas, sus nombres, telas y precios son inventados
  como estructura. Hay que reemplazarlos por los de la marca.
- Dominio y despliegue.
