import { describe, expect, it } from "vitest";
import type { Producto, Variante } from "@/data/productos";
import { PRODUCTOS, formatoPrecio, precioDe, rangoPrecios } from "@/data/productos";
import {
  contarPorCategoria, fichas, filtrarYOrdenar, hayFiltrosActivos, type Criterios,
} from "./catalogo-filtros";

function color(nombre: string, extra: Partial<Variante> = {}): Variante {
  return {
    slug: nombre.toLowerCase().replace(/\s+/g, "-"),
    nombre,
    hex: "#cccccc",
    fotos: [`/media/${nombre}.jpg`],
    ...extra,
  };
}

function prenda(over: Partial<Producto> & { nombre: string }): Producto {
  return {
    id: over.nombre.toLowerCase().replace(/\s+/g, "-"),
    subtitulo: "Prenda de prueba",
    categoria: "camisas",
    tono: "#eee",
    tela: "Gasa de algodón lavada",
    descripcion: "Una prenda de prueba.",
    detalles: [],
    cuidado: "Lavar en frío.",
    talles: ["S", "M"],
    variantes: [color("Crudo")],
    ambiente: [],
    ...over,
  };
}

const BASE: Criterios = { busqueda: "", categoria: "todas", orden: "prenda" };

const CATALOGO: Producto[] = [
  prenda({
    nombre: "Camisa", categoria: "camisas",
    variantes: [color("Lila"), color("Crudo"), color("Terracota")],
  }),
  prenda({
    nombre: "Pantalón", categoria: "pantalones", tela: "Algodón lavado, textura de arena",
    variantes: [color("Arena"), color("Negro")],
  }),
];

describe("fichas", () => {
  it("expande cada prenda en una ficha por color", () => {
    expect(fichas(CATALOGO)).toHaveLength(5);
  });

  it("la clave identifica prenda y color juntos", () => {
    expect(fichas(CATALOGO).map((f) => f.clave)).toContain("camisa-lila");
  });
});

describe("filtrarYOrdenar — filtros", () => {
  it("sin criterios devuelve todos los colores de todas las prendas", () => {
    expect(filtrarYOrdenar(CATALOGO, BASE)).toHaveLength(5);
  });

  it("filtra por prenda", () => {
    const r = filtrarYOrdenar(CATALOGO, { ...BASE, categoria: "pantalones" });
    expect(r.map((f) => f.variante.nombre)).toEqual(["Arena", "Negro"]);
  });

  it("busca por color", () => {
    expect(filtrarYOrdenar(CATALOGO, { ...BASE, busqueda: "lila" }).map((f) => f.clave))
      .toEqual(["camisa-lila"]);
  });

  it("busca también en la tela, no sólo en el color", () => {
    const r = filtrarYOrdenar(CATALOGO, { ...BASE, busqueda: "textura de arena" });
    expect(r.every((f) => f.producto.categoria === "pantalones")).toBe(true);
    expect(r).toHaveLength(2);
  });

  it("la búsqueda no distingue mayúsculas ni espacios de sobra", () => {
    expect(filtrarYOrdenar(CATALOGO, { ...BASE, busqueda: "  TERRACOTA  " })).toHaveLength(1);
  });

  it("combina prenda y búsqueda", () => {
    const r = filtrarYOrdenar(CATALOGO, { ...BASE, categoria: "camisas", busqueda: "crudo" });
    expect(r.map((f) => f.clave)).toEqual(["camisa-crudo"]);
  });

  it("devuelve vacío cuando nada coincide, sin romper", () => {
    expect(filtrarYOrdenar(CATALOGO, { ...BASE, busqueda: "terciopelo" })).toEqual([]);
  });
});

describe("filtrarYOrdenar — orden", () => {
  it("por prenda va camisa y después pantalón — como se viste uno", () => {
    const cats = filtrarYOrdenar(CATALOGO, BASE).map((f) => f.producto.categoria);
    expect(cats).toEqual([
      "camisas", "camisas", "camisas", "pantalones", "pantalones",
    ]);
  });

  it("por prenda respeta el orden de colores del archivo de datos", () => {
    const r = filtrarYOrdenar(CATALOGO, { ...BASE, categoria: "camisas" });
    expect(r.map((f) => f.variante.nombre)).toEqual(["Lila", "Crudo", "Terracota"]);
  });

  it("por color ordena alfabéticamente respetando el español", () => {
    const nombres = filtrarYOrdenar(CATALOGO, { ...BASE, orden: "color" }).map((f) => f.variante.nombre);
    expect(nombres[0]).toBe("Arena");
    expect(nombres[nombres.length - 1]).toBe("Terracota");
  });

  it("por color, el mismo color de dos prendas queda junto y en orden de prenda", () => {
    const dos: Producto[] = [
      prenda({ nombre: "Pantalón", categoria: "pantalones", variantes: [color("Crudo")] }),
      prenda({ nombre: "Camisa", categoria: "camisas", variantes: [color("Crudo")] }),
    ];
    expect(filtrarYOrdenar(dos, { ...BASE, orden: "color" }).map((f) => f.clave))
      .toEqual(["camisa-crudo", "pantalón-crudo"]);
  });

  it("no muta el array que recibe", () => {
    const original = [...CATALOGO];
    filtrarYOrdenar(CATALOGO, { ...BASE, orden: "color" });
    expect(CATALOGO).toEqual(original);
  });
});

describe("hayFiltrosActivos", () => {
  it("el orden por prenda es el estado limpio", () => {
    expect(hayFiltrosActivos(BASE)).toBe(false);
  });

  it("detecta búsqueda, prenda y orden cambiado", () => {
    expect(hayFiltrosActivos({ ...BASE, busqueda: "lino" })).toBe(true);
    expect(hayFiltrosActivos({ ...BASE, categoria: "pantalones" })).toBe(true);
    expect(hayFiltrosActivos({ ...BASE, orden: "color" })).toBe(true);
  });
});

describe("contarPorCategoria", () => {
  it("cuenta colores, no prendas", () => {
    const c = contarPorCategoria(CATALOGO);
    expect(c.get("camisas")).toBe(3);
    expect(c.get("pantalones")).toBe(2);
  });
});

/* El catálogo real es datos, pero hay invariantes que sí conviene sostener:
   si una foto se renombra y alguien se olvida de actualizar el archivo, el
   sitio muestra un cuadro roto. Estos tests miran la forma, no el contenido. */
describe("el catálogo real", () => {
  it("son las dos prendas de la casa", () => {
    expect(PRODUCTOS.map((p) => p.id)).toEqual(["camisa", "pantalon"]);
  });

  it("cada color tiene al menos una foto y un hex de seis dígitos", () => {
    for (const p of PRODUCTOS) {
      for (const v of p.variantes) {
        expect(v.fotos.length, `${p.id}/${v.slug} sin fotos`).toBeGreaterThan(0);
        expect(v.hex, `${p.id}/${v.slug}`).toMatch(/^#[0-9a-f]{6}$/);
      }
    }
  });

  it("no hay dos colores con el mismo identificador dentro de una prenda", () => {
    for (const p of PRODUCTOS) {
      const slugs = p.variantes.map((v) => v.slug);
      expect(new Set(slugs).size, `${p.id} repite un color`).toBe(slugs.length);
    }
  });

  it("todas las rutas de media apuntan a /media", () => {
    for (const f of fichas(PRODUCTOS)) {
      for (const foto of f.variante.fotos) expect(foto).toMatch(/^\/media\/.+\.jpg$/);
      for (const v of f.variante.videos ?? []) {
        expect(v.src).toMatch(/^\/media\/.+\.mp4$/);
        expect(v.poster).toMatch(/^\/media\/.+\.jpg$/);
      }
    }
  });
});

describe("precios", () => {
  it("la camisa vale $1,500, salvo la mostaza de gasa que vale $1,400", () => {
    const camisa = PRODUCTOS.find((p) => p.id === "camisa")!;
    const precio = (slug: string) => precioDe(camisa, camisa.variantes.find((v) => v.slug === slug)!);
    expect(precio("negro")).toBe(1500);
    expect(precio("lila")).toBe(1500);
    expect(precio("mostaza")).toBe(1400);
  });

  it("el pantalón vale lo mismo en todos los colores", () => {
    const pantalon = PRODUCTOS.find((p) => p.id === "pantalon")!;
    expect(rangoPrecios(pantalon)).toEqual({ min: 1750, max: 1750 });
  });

  it("se escribe en pesos con separador de miles", () => {
    expect(formatoPrecio(1750)).toBe("$1,750 MXN");
  });
});
