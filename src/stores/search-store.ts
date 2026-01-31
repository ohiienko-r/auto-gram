import { create } from "zustand";
import type { SearchFormValues } from "@/app/SearchPage/validation/validation";

interface SearchStore {
  searchOpen: boolean;
  setSearchOpen: (val: boolean) => void;

  formValues: Partial<SearchFormValues> | null;
  setFormValues: (values: Partial<SearchFormValues> | null) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  searchOpen: false,
  setSearchOpen: (val) => set({ searchOpen: val }),

  formValues: null,
  setFormValues: (values) => set({ formValues: values }),
}));
