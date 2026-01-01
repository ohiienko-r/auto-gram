import api from "@/lib/axios";
import type { PaginatedResponse, CarListing } from "@/types/app";

export default {
  BASE_URL: "/api/tg/cars/search/",

  async search(params?: {
    query?: string;
    limit?: number;
    offset?: number;
  }): Promise<PaginatedResponse<CarListing>> {
    const { query = "", limit = 2, offset = 0 } = params || {};

    const { data } = await api.get(this.BASE_URL, {
      params: {
        limit,
        offset,
        ...(query ? { q: query } : {}),
      },
    });

    return data;
  },
};
