import * as z from "zod";

const listingPhoto = z.object({
  id: z.string(),
  photo: z.file().or(z.string()),
});

// TODO: Update schema
export const ListingFormSchema = z.object({
  photos: z.array(listingPhoto),
  carBrand: z.string(),
  carModel: z.string(),
  priceUsd: z.string(),
  priceUah: z.string(),
  possibleBargain: z.boolean(),
  typeofTransport: z.string(),
  condition: z.string(),
  kilometrage: z.string(),
  noKilometrage: z.boolean(),
  region: z.string(),
  carAccident: z.string(),
  fuelType: z.string(),
  transmission: z.string(),
  bodyType: z.string(),
  suspension: z.string(),
  driveType: z.string(),
  carCountry: z.string(),
  productionYear: z.string(),
});

export type ListingFormValues = z.infer<typeof ListingFormSchema>;
