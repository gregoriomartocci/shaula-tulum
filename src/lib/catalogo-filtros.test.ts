import { describe, expect, it } from "vitest";
import type { Producto } from "@/data/productos";
import { filtrarYOrdenar, hayFiltrosActivos, pesoDestacado, type Criterios } from "./catalogo-filtros";

function pieza(over: Partial<Producto> & { nombre: string; precio: number }): Producto {
  return {
    id: over.nombre.toLowerCase().replace(/\s+/g, "-"),
    categoria: "camisas",
    tono: "#eee",
    colores: ["Crudo"],
    tela: "Lino belga 100%",
    descripcion: "Una pieza de prueba.",
    talles: ["S", "M"],
    ...over,
  };
}

const BASE: Criterios = { busqueda: "", categoria: "todas", rango: "todos", orden: "destacados" };

const CATALOGO = [
  pieza({ nombre: "Camisa Muyil", precio: 68, masVendido: true }),
  pieza({ nombre: "Vestido Tulum", precio: 118, categoria: "vestidos", nuevo: true }),
  pieza({ nombre: "Sombrero Cobá", precio: 58, categoria: "accesorios", tela: "Palma jipijapa tejida a mano" }),
  pieza({ nombre: "Falda Coba", precio: 90, categoria: "faldas", colores: ["Verde cenote"] }),
];

describe("filtrarYOrdenar — filtros", () => {
  it("sin criterios devuelve todo", () => {
    expect(filtrarYOrdenar(CATALOGO, BASE)).toHaveLength(4);
  });

  it("filtra por categoría", () => {
    const r = filtrarYOrdenar(CATALOGO, { ...BASE, categoria: "vestidos" });
    expect(r.map((p) => p.nombre)).toEqual(["Vestido Tulum"]);
  });

  it("busca también en la tela y en los colores, no sólo en el nombre", () => {
    expect(filtrarYOrdenar(CATALOGO, { ...BASE, busqueda: "jipijapa" }).map((p) => p.nombre))
      .toEqual(["Sombrero Cobá"]);
    expect(filtrarYOrdenar(CATALOGO, { ...BASE, busqueda: "verde cenote" }).map((p) => p.nombre))
      .toEqual(["Falda Coba"]);
  });

  it("la búsqueda no distingue mayúsculas ni espacios de sobra", () => {
    expect(filtrarYOrdenar(CATALOGO, { ...BASE, busqueda: "  CAMISA  " })).toHaveLength(1);
  });

  it("los rangos de precio no se pisan ni dejan huecos", () => {
    const en = (rango: Criterios["rango"]) =>
      filtrarYOrdenar(CATALOGO, { ...BASE, rango }).map((p) => p.precio).sort((a, b) => a - b);

    expect(en("hasta-60")).toEqual([58]);
    expect(en("60-90")).toEqual([68, 90]);
    expect(en("desde-90")).toEqual([118]);
    // Cada pieza cae en exactamente un rango.
    expect([...en("hasta-60"), ...en("60-90"), ...en("desde-90")]).toHaveLength(CATALOGO.length);
  });

  it("combina categoría, precio y búsqueda", () => {
    const r = filtrarYOrdenar(CATALOGO, { ...BASE, categoria: "camisas", rango: "60-90", busqueda: "muyil" });
    expect(r.map((p) => p.nombre)).toEqual(["Camisa Muyil"]);
  });

  it("devuelve vacío cuando nada coincide, sin romper", () => {
    expect(filtrarYOrdenar(CATALOGO, { ...BASE, busqueda: "terciopelo" })).toEqual([]);
  });
});

describe("filtrarYOrdenar — orden", () => {
  it("ordena por precio en ambos sentidos", () => {
    expect(filtrarYOrdenar(CATALOGO, { ...BASE, orden: "precio-asc" }).map((p) => p.precio))
      .toEqual([58, 68, 90, 118]);
    expect(filtrarYOrdenar(CATALOGO, { ...BASE, orden: "precio-desc" }).map((p) => p.precio))
      .toEqual([118, 90, 68, 58]);
  });

  it("ordena por nombre respetando los acentos del español", () => {
    // Con localeCompare("es"), "Cobá" va antes que "Coba"… lo importante es que
    // el acento no lo mande al final del alfabeto como haría un sort crudo.
    const nombres = filtrarYOrdenar(CATALOGO, { ...BASE, orden: "nombre" }).map((p) => p.nombre);
    expect(nombres[0]).toBe("Camisa Muyil");
    expect(nombres[nombres.length - 1]).toBe("Vestido Tulum");
  });

  it("pone las novedades primero", () => {
    expect(filtrarYOrdenar(CATALOGO, { ...BASE, orden: "nuevos" })[0].nombre).toBe("Vestido Tulum");
  });

  it("en destacados manda el más vendido", () => {
    expect(filtrarYOrdenar(CATALOGO, BASE)[0].nombre).toBe("Camisa Muyil");
  });

  it("desempata por nombre cuando el peso es igual", () => {
    const iguales = [pieza({ nombre: "Zulu", precio: 10 }), pieza({ nombre: "Alfa", precio: 10 })];
    expect(filtrarYOrdenar(iguales, BASE).map((p) => p.nombre)).toEqual(["Alfa", "Zulu"]);
  });

  it("no muta el array que recibe", () => {
    const original = [...CATALOGO];
    filtrarYOrdenar(CATALOGO, { ...BASE, orden: "precio-desc" });
    expect(CATALOGO).toEqual(original);
  });
});

describe("pesoDestacado", () => {
  it("más vendido pesa más que trending, y trending más que nuevo", () => {
    expect(pesoDestacado(pieza({ nombre: "a", precio: 1, masVendido: true })))
      .toBeGreaterThan(pesoDestacado(pieza({ nombre: "b", precio: 1, trending: true })));
    expect(pesoDestacado(pieza({ nombre: "c", precio: 1, trending: true })))
      .toBeGreaterThan(pesoDestacado(pieza({ nombre: "d", precio: 1, nuevo: true })));
  });

  it("una pieza sin distintivos pesa cero", () => {
    expect(pesoDestacado(pieza({ nombre: "e", precio: 1 }))).toBe(0);
  });

  it("los distintivos se suman", () => {
    expect(pesoDestacado(pieza({ nombre: "f", precio: 1, masVendido: true, trending: true, nuevo: true }))).toBe(7);
  });
});

describe("hayFiltrosActivos", () => {
  it("el orden no cuenta como filtro: no reduce resultados", () => {
    expect(hayFiltrosActivos({ ...BASE, orden: "precio-asc" })).toBe(false);
  });

  it("detecta búsqueda, categoría y rango", () => {
    expect(hayFiltrosActivos({ ...BASE, busqueda: "lino" })).toBe(true);
    expect(hayFiltrosActivos({ ...BASE, categoria: "faldas" })).toBe(true);
    expect(hayFiltrosActivos({ ...BASE, rango: "hasta-60" })).toBe(true);
  });
});
