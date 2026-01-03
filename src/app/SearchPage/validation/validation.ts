import * as z from "zod";

export const SearchFormValidationSchema = z
  .object({
    priceRange: z.tuple([z.number().min(0), z.number().min(0)]),
    possibleBargain: z.boolean(),
    typeOfCar: z.number(),
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
    // TODO: set here the data from common filters
    productionYearFrom: z.number().min(1960),
    productionYearTo: z.number().max(2026),
    milageFrom: z.number(),
    milageTo: z.number(),
    noMilage: z.boolean(),
  })
  .partial();

export type SearchFormValues = z.infer<typeof SearchFormValidationSchema>;
