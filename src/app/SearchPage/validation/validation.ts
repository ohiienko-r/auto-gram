import * as z from "zod";

export const SearchFormValidationSchema = z
  .object({
    price_range: z.tuple([z.number(), z.number()]),
    bargaining: z.boolean(),
    price_min: z.number().nullable(),
    price_max: z.number().nullable(),

    type_of_car_id: z.number().nullable(),
    brand_id: z.number().nullable(),
    model_id: z.number().nullable(),

    condition_id: z.number().nullable(),

    fuel_type_id: z.number().nullable(),
    gearbox_id: z.number().nullable(),

    region_id: z.number().nullable(),
    settlement_id: z.number().nullable(),

    body_type_id: z.number().nullable(),
    drive_type: z.string().nullable(),

    year_min: z.number().min(1960).nullable(),
    year_max: z.number().max(new Date().getFullYear()).nullable(),

    mileage_max: z.number().nullable(),
  })
  .partial();

export type SearchFormValues = z.infer<typeof SearchFormValidationSchema>;
