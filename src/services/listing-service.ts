import api from "@/lib/axios";

import type { CarListing } from "@/types/app";

export default {
  BASE_URL: "/api/tg/cars/",

  async getListingDetails(id: number): Promise<CarListing> {
    const { data } = await api.get(`${this.BASE_URL}${id}/`);
    return data;
  },
};
