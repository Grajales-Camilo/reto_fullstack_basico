import { describe, expect, it } from "vitest";
import i18n from "./index";

describe("i18n configuration", () => {
  it("se inicializa con español como idioma por defecto", () => {
    expect(i18n.resolvedLanguage || i18n.language).toBe("es");
  });

  it("expone recursos para es y en", () => {
    expect(i18n.options.resources.es.translation).toBeDefined();
    expect(i18n.options.resources.en.translation).toBeDefined();
  });

  it("todas las claves de es existen tambien en en", () => {
    const es = i18n.options.resources.es.translation;
    const en = i18n.options.resources.en.translation;

    Object.keys(es).forEach((key) => {
      expect(en).toHaveProperty(key);
    });
  });

  it("todas las claves de en existen tambien en es", () => {
    const es = i18n.options.resources.es.translation;
    const en = i18n.options.resources.en.translation;

    Object.keys(en).forEach((key) => {
      expect(es).toHaveProperty(key);
    });
  });

  it("interpola correctamente el placeholder count en products.found", async () => {
    expect(i18n.t("products.found", { count: 5 })).toBe(
      "5 productos encontrados",
    );

    await i18n.changeLanguage("en");

    expect(i18n.t("products.found", { count: 5 })).toBe("5 products found");

    await i18n.changeLanguage("es");
  });
});
