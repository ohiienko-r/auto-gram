import { create } from "zustand";

import type { CommonFilters, FilterLookup } from "@/types/filters";

interface FiltersStore {
  commonFilters: CommonFilters | null;
  setCommonFilters: (val: CommonFilters | null) => void;

  regions: FilterLookup[] | null;
  setRegions: (val: FilterLookup[] | null) => void;

  brands: FilterLookup[] | null;
  setBrands: (val: FilterLookup[] | null) => void;
}

export const useFiltersStore = create<FiltersStore>((set) => ({
  commonFilters: null,
  setCommonFilters: (val) => set({ commonFilters: val }),

  regions: null,
  setRegions: (val) => set({ regions: val }),

  brands: null,
  setBrands: (val) => set({ brands: val }),
}));
