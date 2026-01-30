import type { EditListingFormValues } from "../validation/validation";
import type {
  GetEditListingDetailsResponse,
  UpdateListingPayload,
} from "@/types/listing";

export const getUpdateValues = (
  payload: UpdateListingPayload,
  initialValues: GetEditListingDetailsResponse,
): Partial<
  Omit<EditListingFormValues, "price" | "mileage"> & {
    price: number;
    mileage: number;
  }
> => {
  return Object.entries(payload)?.reduce(
    (acc, [key, value]) => {
      if (!Object.hasOwn(initialValues.values, key)) return acc;

      const originalValue =
        initialValues.values[key as keyof typeof initialValues.values];

      if (value !== originalValue) {
        return { ...acc, [key]: value };
      }

      return acc;
    },
    {} as Partial<typeof payload>,
  );
};
