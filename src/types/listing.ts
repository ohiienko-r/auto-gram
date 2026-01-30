import { type CreateListingFormValues } from "@/app/CreateListingPage/validation/validation";
import { type EditListingFormValues } from "@/app/EditListingPage/validation/validation";
import type { Option } from "./app";

export interface CreateListingResponse {
  id: number;
  status: string;
  message: string;
}

export type CreateListingPayload = Omit<
  CreateListingFormValues,
  "price" | "mileage"
> & {
  price: number;
  mileage: number;
};

export type UpdateListingPayload = Omit<
  EditListingFormValues,
  "price" | "mileage"
> & {
  price: number;
  mileage: number;
};

export interface ListingPhotos {
  id: number;
  name: string;
  url: string;
}

export interface GetListingPhotosResponse {
  count: number;
  results: ListingPhotos[];
}

export interface SelectOptionGroup {
  selected: string;
  variants: Option[];
}

export interface GetEditListingDetailsResponse {
  values: {
    id: number;
    status: string;
    brand: number;
    model: number;
    type_of_car: number;
    condition: number;
    fuel_type: number;
    region: number;
    settlement: number;
    gearbox: number;
    body_type: number;
    color: string | null;
    description: string;
    price: number;
    price_uah: number;
    bargaining: boolean;
    mileage: number;
    drive_type: string;
    salon_material: string;
    engine_capacity_l: string;
    year: number;
    vin_number: string;
  };
  options: {
    drive_type: SelectOptionGroup;
    salon_material: SelectOptionGroup;
    status: SelectOptionGroup;
  };
}
