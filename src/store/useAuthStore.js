import { onAuthStateChanged } from "firebase/auth";
import { create } from "zustand";
import { auth } from "../services/firebase";
import { getUserProfile } from "../services/usersService";

let unsubscribeAuth = null;

export const useAuthStore = create((set) => ({
  user: null,
  role: "user",
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  initAuthListener: () => {
    if (unsubscribeAuth) {
      return unsubscribeAuth;
    }

    unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        set({
          user: null,
          role: "user",
          loading: false,
        });
        return;
      }

      const profile = await getUserProfile(user.uid);

      set({
        user,
        role: profile?.role || "user",
        loading: false,
      });
    });

    return unsubscribeAuth;
  },
}));
