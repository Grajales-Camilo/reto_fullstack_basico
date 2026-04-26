import { onAuthStateChanged } from "firebase/auth";
import { create } from "zustand";
import { auth } from "../services/firebase";

let unsubscribeAuth = null;

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  initAuthListener: () => {
    if (unsubscribeAuth) {
      return unsubscribeAuth;
    }

    unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      set({
        user,
        loading: false,
      });
    });

    return unsubscribeAuth;
  },
}));
