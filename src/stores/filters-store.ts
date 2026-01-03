import { create } from "zustand";

import type { CommonFilters } from "@/types/filters";
import type { Option } from "@/types/app";

interface FiltersStore {
  commonFilters: CommonFilters | null;
  setCommonFilters: (val: CommonFilters | null) => void;

  regions: Option[] | null;
  setRegions: (val: Option[] | null) => void;

  brands: Option[] | null;
  setBrands: (val: Option[] | null) => void;
}

export const useFiltersStore = create<FiltersStore>((set) => ({
  commonFilters: null,
  setCommonFilters: (val) => set({ commonFilters: val }),

  regions: null,
  setRegions: (val) => set({ regions: val }),

  brands: null,
  setBrands: (val) => set({ brands: val }),
}));
