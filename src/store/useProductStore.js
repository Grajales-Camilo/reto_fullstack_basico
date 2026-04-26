import { create } from "zustand";
import { getProducts } from "../services/productsService";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: "",
  searchQuery: "",
  currentPage: 1,
  fetchProducts: async () => {
    set({ loading: true, error: "" });

    try {
      const products = await getProducts();
      set({ products, loading: false });
    } catch (error) {
      set({
        error: error.message,
        loading: false,
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
