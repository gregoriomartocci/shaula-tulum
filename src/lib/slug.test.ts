import { describe, expect, it } from "vitest";
import { aSlug } from "./slug";

describe("aSlug", () => {
  it("baja a minúsculas y une con guiones", () => {
    expect(aSlug("Camisa Sian Kaan")).toBe("camisa-sian-kaan");
  });

  it("saca los acentos en vez de dejarlos escapados en la URL", () => {
    expect(aSlug("Túnica Cenote")).toBe("tunica-cenote");
    expect(aSlug("Pantalón Añejo")).toBe("pantalon-anejo");
  });

  it("descarta apóstrofes y signos, que romperían el enlace", () => {
    expect(aSlug("Camisa Sian Ka'an")).toBe("camisa-sian-ka-an");
    expect(aSlug("Falda 100% lino (nueva)")).toBe("falda-100-lino-nueva");
  });

  it("no deja guiones colgando en los extremos", () => {
    expect(aSlug("  ¡Vestido!  ")).toBe("vestido");
    expect(aSlug("--- raro ---")).toBe("raro");
  });

  it("corta a 60 caracteres para que el id no crezca sin límite", () => {
    const largo = aSlug("palabra ".repeat(30));
    expect(largo.length).toBeLessThanOrEqual(60);
    expect(largo.endsWith("-")).toBe(false);
  });

  it("devuelve vacío si no queda nada utilizable", () => {
    expect(aSlug("¿¡!?")).toBe("");
  });
});
