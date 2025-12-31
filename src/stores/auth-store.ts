import { create } from "zustand";
import type { AuthResponse } from "@/types/auth-types";

interface AuthStore {
  auth: Pick<AuthResponse, "tokens"> | null;
  setAuth: (val: Pick<AuthResponse, "tokens"> | null) => void;
  currentUser: Omit<AuthResponse, "tokens"> | null;
  setCurrentUser: (val: Omit<AuthResponse, "tokens"> | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  auth: null,
  setAuth: (val) => {
    localStorage.setItem("jwtToken", val ? val.tokens.access : "");
    localStorage.setItem("refreshToken", val ? val.tokens.refresh : "");
    set({ auth: val });
  },

  currentUser: null,
  setCurrentUser: (val) => set({ currentUser: val }),
}));
