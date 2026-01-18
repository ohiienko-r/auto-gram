import { type CreateListingFormValues } from "@/app/CreateListingPage/validation/validation";

export interface CreateListingResponse {
  id: number;
  status: string;
  message: string;
}

export type CreateListingPayload = Omit<
  CreateListingFormValues,
  "price" | "mileage"
> & {};

export interface ListingPhotos {
  id: number;
  name: string;
  url: string;
}

export interface GetListingPhotosResponse {
  count: number;
  results: ListingPhotos[];
}
