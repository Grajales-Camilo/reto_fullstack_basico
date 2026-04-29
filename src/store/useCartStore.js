import { create } from "zustand";
import { log } from "../services/loggerService";

const CART_STORAGE_KEY = "cart";

function getStoredItems() {
  const storedCart = localStorage.getItem(CART_STORAGE_KEY);

  if (!storedCart) {
    return [];
  }

  try {
    return JSON.parse(storedCart);
  } catch {
    return [];
  }
}

function persistItems(items) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export const useCartStore = create((set) => ({
  items: getStoredItems(),
  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);
      const items = existingItem
        ? state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [
            ...state.items,
            {
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              quantity: 1,
            },
          ];

      const nextItem = items.find((item) => item.id === product.id);

      log("info", "add_to_cart", {
        productId: product.id,
        productName: product.name,
        quantity: nextItem?.quantity ?? 1,
      });

      persistItems(items);
      return { items };
    }),
  removeItem: (id) =>
    set((state) => {
      const items = state.items.filter((item) => item.id !== id);
      persistItems(items);
      return { items };
    }),
  updateQuantity: (id, quantity) =>
    set((state) => {
      const safeQuantity = Number(quantity);
      const items =
        safeQuantity <= 0
          ? state.items.filter((item) => item.id !== id)
          : state.items.map((item) =>
              item.id === id ? { ...item, quantity: safeQuantity } : item,
            );

      persistItems(items);
      return { items };
    }),
  clearCart: () => {
    persistItems([]);
    set({ items: [] });
  },
}));
