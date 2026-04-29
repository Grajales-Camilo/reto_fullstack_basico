import { render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import i18n from "../i18n/index";
import Home from "./Home";

let mockStatus = "success";
let mockSearchQuery = "";
const mockFetchProducts = vi.fn();
const mockSetPage = vi.fn();
const mockSetSearchQuery = vi.fn();

vi.mock("../services/loggerService", () => ({
  log: vi.fn(),
}));

vi.mock("../store/useProductStore", () => ({
  useProductStore: vi.fn((selector) =>
    selector({
      products: [],
      status: mockStatus,
      errorMessage: "",
      searchQuery: mockSearchQuery,
      currentPage: 1,
      fetchProducts: mockFetchProducts,
      setPage: mockSetPage,
      setSearchQuery: mockSetSearchQuery,
    }),
  ),
}));

const renderHome = () =>
  render(
    <MemoryRouter>
      <I18nextProvider i18n={i18n}>
        <Home />
      </I18nextProvider>
    </MemoryRouter>,
  );

describe("Home search flow", () => {
  beforeEach(async () => {
    mockStatus = "success";
    mockSearchQuery = "";
    mockFetchProducts.mockClear();
    mockSetPage.mockClear();
    mockSetSearchQuery.mockClear();
    await i18n.changeLanguage("es");
  });

  it("muestra el titulo de la galeria en español", () => {
    renderHome();

    expect(
      screen.getByRole("heading", { name: /Galería de productos/i }),
    ).toBeInTheDocument();
  });

  it("el input de busqueda esta habilitado cuando status es success", () => {
    mockStatus = "success";

    renderHome();

    expect(
      screen.getByPlaceholderText(/Nombre, descripción o categoría/i),
    ).not.toBeDisabled();
  });

  it("el input de busqueda esta deshabilitado cuando status es loading", () => {
    mockStatus = "loading";

    renderHome();

    expect(
      screen.getByPlaceholderText(/Nombre, descripción o categoría/i),
    ).toBeDisabled();
  });
});
