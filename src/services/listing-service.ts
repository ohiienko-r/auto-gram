import api from "@/lib/axios";

import type { CarListing, PaginatedResponse } from "@/types/app";

export default {
  BASE_URL: "/api/tg/cars/",

  async getListingDetails(id: number): Promise<CarListing> {
    const { data } = await api.get(`${this.BASE_URL}${id}/`);
    return data;
  },

  async toggleListingLike(id: number): Promise<void> {
    await api.post(`${this.BASE_URL}${id}/like/`);
  },

  async getFavorites(params?: {
    limit?: number;
    offset?: number;
  }): Promise<PaginatedResponse<CarListing>> {
    const { data } = await api.get(`${this.BASE_URL}likes/`, { params });
    return data;
  },
};
