import { create } from "zustand";
import type { SearchFormValues } from "@/app/SearchPage/validation/validation";

interface SearchStore {
  formValues: Partial<SearchFormValues> | null;
  setFormValues: (values: Partial<SearchFormValues> | null) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  formValues: null,
  setFormValues: (values) => set({ formValues: values }),
}));
