import * as z from "zod";

const listingPhoto = z.object({
  id: z.string(),
  photo: z.file().or(z.string()),
});

export const ListingFormSchema = z
  .object({
    photos: z.array(listingPhoto).min(1, "Додайте хоча б одне фото автомобіля"),

    brand: z.number().nullable(),
    model: z.number().nullable(),
    type_of_car: z.number().optional(),
    condition: z.number({ error: "Виберіть стан автомобіля" }),
    fuel_type: z.number({ error: "Виберіть тип палива автомобіля" }),
    gearbox: z.number().optional(),
    body_type: z.number().optional(),

    price: z
      .string()
      .min(1, "Вкажіть ціну")
      .refine((v) => !Number.isNaN(Number(v)), "Введіть число")
      .refine((v) => Number(v) >= 0, "Ціна не може бути відʼємною"),
    bargaining: z.boolean().optional(),

    mileage: z
      .string()
      .min(1, "Вкажіть пробіг")
      .refine((v) => !Number.isNaN(Number(v)), "Введіть число")
      .refine((v) => Number(v) >= 0, "Пробіг не може бути відʼємним"),
    noMileage: z.boolean().optional(),
    drive_type: z.string().optional(),
    salon_material: z.string().optional(),
    engine_capacity_l: z.string().min(1, { error: "Введіть об'єм двигуна" }),

    region: z.number().nullable(),
    settlement: z.number().nullable(),

    year: z.number().nullable(),
    vin_number: z.string().min(1, { message: "Введіть VIN номер" }),
  })
  .superRefine((data, ctx) => {
    // обов'язкові nullable поля
    if (data.brand == null) {
      ctx.addIssue({
        path: ["brand"],
        code: "custom",
        message: "Виберіть бренд автомобіля",
      });
    }
    if (data.model == null) {
      ctx.addIssue({
        path: ["model"],
        code: "custom",
        message: "Виберіть модель автомобіля",
      });
    }
    if (data.region == null) {
      ctx.addIssue({
        path: ["region"],
        code: "custom",
        message: "Виберіть регіон",
      });
    }
    if (data.settlement == null) {
      ctx.addIssue({
        path: ["settlement"],
        code: "custom",
        message: "Виберіть населений пункт",
      });
    }
    if (data.year == null) {
      ctx.addIssue({
        path: ["year"],
        code: "custom",
        message: "Виберіть рік виробництва автомобіля",
      });
    }
  });

export type ListingFormValues = z.infer<typeof ListingFormSchema>;
