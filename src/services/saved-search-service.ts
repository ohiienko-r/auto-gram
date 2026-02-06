import api from "@/lib/axios";

import type { SaveSearchPayload } from "@/types/search";

export default {
  BASE_URL: "/api/tg/saved-searches/",

  async getSavedSearches() {
    const { data } = await api.get(this.BASE_URL);
    return data;
  },

  async createSavedSearch(data: SaveSearchPayload) {
    await api.post(`/api/tg/saved-searches-create/`, data);
  },

  async deleteSavedSearch(searchId: number) {
    await api.delete(`${this.BASE_URL}/${searchId}/`);
  },
};
