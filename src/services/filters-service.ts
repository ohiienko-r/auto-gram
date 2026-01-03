import api from "@/lib/axios";

import type { GenericFilters } from "@/types/filters";

export default {
  BASE_URL: "/api/tg/cars/filters/",

  async getCommonFilters() {
    const { data } = await api.get(`${this.BASE_URL}common/`);
    return data;
  },

  async getRegions(): Promise<GenericFilters["regions"]> {
    const { data } = await api.get(`${this.BASE_URL}regions/`);
    return data?.regions || data;
  },

  async getRegionSettlements(
    regionId: number
  ): Promise<GenericFilters["settlements"]> {
    const { data } = await api.get(`${this.BASE_URL}settlements/`, {
      params: { region_id: regionId },
    });
    return data?.settlements || data;
  },

  async getBrands(): Promise<GenericFilters["brands"]> {
    const { data } = await api.get(`${this.BASE_URL}brands/`);
    return data?.brands || data;
  },

  async getBrandModels(brandId: number): Promise<GenericFilters["models"]> {
    const { data } = await api.get(`${this.BASE_URL}models/`, {
      params: { brand_id: brandId },
    });
    return data?.models || data;
  },
};
