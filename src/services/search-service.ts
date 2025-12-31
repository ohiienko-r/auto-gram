import api from "@/lib/axios";

import type { PaginatedResponse, CarListing } from "@/types/app";

export default {
  BASE_URL: "/api/tg/cars/search",

  async search(query: string = ""): Promise<PaginatedResponse<CarListing>> {
    const { data } = await api.get(`${this.BASE_URL}${query}/`);
    return data;
  },
};
