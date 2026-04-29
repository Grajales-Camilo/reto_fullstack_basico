import { create } from "zustand";
import { getProducts } from "../services/productsService";

export const useProductStore = create((set) => ({
  products: [],
  status: "idle",
  errorMessage: "",
  loading: false,
  error: "",
  searchQuery: "",
  currentPage: 1,
  fetchProducts: async () => {
    set({ status: "loading", errorMessage: "", loading: true, error: "" });

    try {
      const products = await getProducts();
      set({ products, status: "success", loading: false });
    } catch (error) {
      set({
        status: "error",
        errorMessage: error.message,
        loading: false,
        error: error.message,
      });
    }
  },
  setSearchQuery: (searchQuery) =>
    set({
      searchQuery,
      currentPage: 1,
    }),
  setPage: (currentPage) => set({ currentPage }),
}));
