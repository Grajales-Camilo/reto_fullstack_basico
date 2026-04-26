import { create } from "zustand";
import { getExchangeRate, setExchangeRate } from "../services/settingsService";

export const useSettingsStore = create((set) => ({
  usdToCop: 3600,
  fetchRate: async () => {
    const usdToCop = await getExchangeRate();

    if (usdToCop) {
      set({ usdToCop });
    }
  },
  updateRate: async (value) => {
    const usdToCop = Number(value);
    await setExchangeRate(usdToCop);
    set({ usdToCop });
  },
}));
