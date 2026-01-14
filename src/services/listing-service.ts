import api from "@/lib/axios";

import type { CarListing, PaginatedResponse, MyCarListing } from "@/types/app";
import type { CreateListingResponse, ListingPayload } from "@/types/listing";

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

  async getMyListings(params?: {
    limit?: number;
    offset?: number;
  }): Promise<PaginatedResponse<MyCarListing>> {
    const { data } = await api.get(`${this.BASE_URL}mycars/`, { params });
    return data;
  },

  async removeMyListing(id: number): Promise<void> {
    await api.delete(`${this.BASE_URL}${id}/remove/`);
  },

  async createListing(values: ListingPayload): Promise<CreateListingResponse> {
    const { data } = await api.post(`${this.BASE_URL}create/`, values);
    return data;
  },

  async uploadListingPhotos(carId: number, formData: FormData) {
    await api.post(`${this.BASE_URL}${carId}/filesUpload/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
