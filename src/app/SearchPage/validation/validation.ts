import * as z from "zod";

export const SearchFormValidationSchema = z
  .object({
    priceRange: z.tuple([z.number(), z.number()]),
    possibleBargain: z.boolean(),
    typeofTransport: z.string(),
    carBrands: z.array(z.string()),
    carModels: z.array(z.string()),
    condition: z.string(),
    carAccident: z.string(),
    fuelType: z.string(),
    transmission: z.string(),
    regions: z.array(z.string()),
    bodyType: z.string(),
    suspension: z.string(),
    driveType: z.string(),
    carCountries: z.array(z.string()),
    productionYearFrom: z.number(),
    productionYearTo: z.number(),
    kilometrageFrom: z.number(),
    kilometrageTo: z.number(),
    noKilometrage: z.boolean(),
  })
  .partial();

export type SearchFormValues = z.infer<typeof SearchFormValidationSchema>;
