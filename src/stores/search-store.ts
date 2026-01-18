import { create } from "zustand";

interface SearchStore {
  searchOpen: boolean;
  setSearchOpen: (val: boolean) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  searchOpen: false,
  setSearchOpen: (val) => set({ searchOpen: val }),
}));
