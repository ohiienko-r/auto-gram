import type { ListingFormValues } from "@/shared/validation/validation";

export interface CreateListingResponse {
  id: number;
  status: string;
  message: string;
}

export type ListingPayload = Omit<ListingFormValues, "price" | "mileage"> & {};
