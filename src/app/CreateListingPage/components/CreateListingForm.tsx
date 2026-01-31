import { useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router";
import { useFiltersStore } from "@/stores/filters-store";
import useModels from "@/hooks/filters/useModels";
import useSettlements from "@/hooks/filters/useSettlements";
import useCreateListing from "@/app/CreateListingPage/hooks/useCreateListing";
import { viewport } from "@tma.js/sdk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateListingFormSchema,
  type CreateListingFormValues,
} from "../validation/validation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/Card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ListingPhotosCarouselWithFileUpload from "@/components/ListingPhotosCarouselWithFileUpload";
import Select from "@/components/Select";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import CheckMarkIcon from "@/icons/CheckMarkIcon";
import { LoaderCircle } from "lucide-react";

export default function CreateListingForm() {
  const { commonFilters, regions, brands } = useFiltersStore();
  const { mutate, isPending, isUploadingPhotos } = useCreateListing();
  const { bottom } = viewport.safeAreaInsets();
  const navigate = useNavigate();

  const form = useForm<CreateListingFormValues>({
    resolver: zodResolver(CreateListingFormSchema),
    defaultValues: {
      photos: [],
      brand: null,
      model: null,
      region: null,
      settlement: null,
      year: null,
      price: "",
      bargaining: false,
      condition: 1,
      mileage: "",
      engine_capacity_l: "",
      drive_type: "",
      noMileage: false,
      description: "",
      vin_number: "",
    },
  });

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = form;

  const [carBrand, noMilage, region] = watch(["brand", "noMileage", "region"]);

  const { data: models, isLoading: isModelsLoading } = useModels(carBrand);
  const { data: settlements, isLoading: isSettlementsLoading } =
    useSettlements(region);

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "photos",
    keyName: "id",
  });

  const handleAddPhoto = (photo: File) => [
    append({ id: globalThis.crypto.randomUUID(), url: photo }),
  ];

  const carBrandModels = useMemo(
    () =>
      models?.map((model) => ({
        label: model.name,
        value: String(model.id),
      })) || [],
    [models],
  );

  const settlementsOptions = useMemo(
    () =>
      settlements?.map((settlement) => ({
        label: settlement.name,
        value: String(settlement.id),
      })) || [],
    [settlements],
  );

  const productionYearOptions = useMemo(() => {
    const startYear = commonFilters?.ranges?.year?.min || 1960;
    const endYear =
      commonFilters?.ranges?.year?.max || new Date().getFullYear();

    if (startYear === undefined || endYear === undefined) {
      return [];
    }

    const years = [];

    for (let i = startYear; i <= endYear; i++) {
      years.push({
        label: String(i),
        value: String(i),
      });
    }
    return years;
  }, [commonFilters]);

  const isCreatingListing = useMemo(
    () => isPending || isUploadingPhotos,
    [isPending, isUploadingPhotos],
  );

  return (
    <Card style={{ paddingBottom: (bottom || 20) + 90 }}>
      <Form {...form}>
        <form
          id="listing-form"
          className="flex flex-col gap-8"
          onSubmit={handleSubmit((formValues) => {
            const payload = {
              ...formValues,
              price: Number(formValues.price),
              mileage: Number(formValues.mileage),
            };

            mutate(payload);
          }, console.warn)}
        >
          <div className="flex flex-col gap-2">
            <ListingPhotosCarouselWithFileUpload
              data={fields}
              onPhotoAdd={handleAddPhoto}
              onPhotoRemove={remove}
            />

            {errors.photos && (
              <FormMessage>{errors.photos.message}</FormMessage>
            )}
          </div>

          <CardContent className="pt-0">
            <FormField
              control={control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Марка*</FormLabel>

                  <Select
                    listTitle="Марка"
                    disabled={isCreatingListing}
                    options={brands ?? []}
                    value={field.value ? String(field.value) : null}
                    onChange={(val) => {
                      if (!Number.isNaN(val)) {
                        field.onChange(Number(val));
                      }
                      setValue("model", null);
                    }}
                  />

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Модель*</FormLabel>

                  <Select
                    disabled={isModelsLoading || !carBrand || isCreatingListing}
                    isLoading={isModelsLoading}
                    listTitle="Модель"
                    options={carBrandModels}
                    value={field.value ? String(field.value) : null}
                    onChange={(val) => {
                      if (!Number.isNaN(val)) {
                        field.onChange(Number(val));
                      } else if (val === null) {
                        field.onChange(val);
                      }
                    }}
                  />

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="gap-3 grid grid-cols-2">
              <FormField
                control={control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ціна $</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Ціна USD"
                        type="number"
                        {...field}
                        disabled={isCreatingListing}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="bargaining"
                render={({ field }) => (
                  <FormItem className="justify-items-start self-end">
                    <FormControl>
                      <Toggle
                        pressed={field.value}
                        onPressedChange={field.onChange}
                        disabled={isCreatingListing}
                      >
                        Можливен торг
                      </Toggle>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name="type_of_car"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тип траспорта*</FormLabel>

                  <FormControl>
                    <ToggleGroup
                      type="single"
                      disabled={isCreatingListing}
                      value={String(field.value)}
                      onValueChange={(val) => {
                        if (!Number.isNaN(val)) {
                          field.onChange(Number(val));
                        }
                      }}
                      className="flex flex-wrap items-center gap-2"
                    >
                      {commonFilters?.type_of_car?.map((option) => (
                        <ToggleGroupItem
                          key={option.id}
                          value={String(option.id)}
                        >
                          {option.name}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="condition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Стан*</FormLabel>

                  <ToggleGroup
                    type="single"
                    disabled={isCreatingListing}
                    value={String(field.value)}
                    onValueChange={(val) => {
                      if (!Number.isNaN(val)) {
                        field.onChange(Number(val));
                      }
                    }}
                    className="flex flex-wrap items-center gap-2"
                  >
                    {commonFilters?.condition?.map((option) => (
                      <ToggleGroupItem
                        key={option.id}
                        value={String(option.id)}
                      >
                        {option.name}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="items-end gap-3 grid grid-cols-2">
              <FormField
                control={control}
                name="mileage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Пробіг*</FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        disabled={noMilage || isCreatingListing}
                        placeholder="тис. км."
                        type="number"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="noMileage"
                render={({ field }) => (
                  <FormItem className="justify-items-start">
                    <FormControl>
                      <Toggle
                        disabled={isCreatingListing}
                        pressed={field.value}
                        onPressedChange={(val) => {
                          field.onChange(val);

                          if (val) {
                            setValue("mileage", "");
                          }
                        }}
                      >
                        Без пробігу
                      </Toggle>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Регіон*</FormLabel>

                  <Select
                    listTitle="Регіон"
                    disabled={isCreatingListing}
                    options={regions ?? []}
                    value={field.value ? String(field.value) : null}
                    onChange={(val) => {
                      if (!Number.isNaN(val)) {
                        field.onChange(Number(val));
                      }
                      setValue("settlement", null);
                    }}
                  />

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="settlement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Населений пункт*</FormLabel>

                  <Select
                    disabled={
                      isSettlementsLoading || !region || isCreatingListing
                    }
                    isLoading={isSettlementsLoading}
                    listTitle="Населений пункт"
                    options={settlementsOptions ?? []}
                    value={field.value ? String(field.value) : null}
                    onChange={(val) => {
                      if (!Number.isNaN(val)) {
                        field.onChange(Number(val));
                      } else if (val === null) {
                        field.onChange(val);
                      }
                    }}
                  />

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="engine_capacity_l"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Об'єм двигуна *</FormLabel>

                  <FormControl>
                    <Input
                      type="number"
                      disabled={isCreatingListing}
                      placeholder="Об'єм двигуна (л.)"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="fuel_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Паливо*</FormLabel>

                  <FormControl>
                    <ToggleGroup
                      type="single"
                      disabled={isCreatingListing}
                      value={String(field.value)}
                      onValueChange={(val) => {
                        if (!Number.isNaN(val)) {
                          field.onChange(Number(val));
                        }
                      }}
                      className="flex flex-wrap items-center gap-2"
                    >
                      {commonFilters?.fuel_type?.map((option) => (
                        <ToggleGroupItem
                          key={option.id}
                          value={String(option.id)}
                        >
                          {option.name}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="gearbox"
              disabled={isCreatingListing}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Коробка передач</FormLabel>

                  <FormControl>
                    <ToggleGroup
                      type="single"
                      value={String(field.value)}
                      onValueChange={(val) => {
                        if (!Number.isNaN(val)) {
                          field.onChange(Number(val));
                        }
                      }}
                      className="flex flex-wrap items-center gap-2"
                    >
                      {commonFilters?.gearbox?.map((option) => (
                        <ToggleGroupItem
                          key={option.id}
                          value={String(option.id)}
                        >
                          {option.name}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="body_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тип кузова</FormLabel>

                  <FormControl>
                    <ToggleGroup
                      type="single"
                      disabled={isCreatingListing}
                      value={String(field.value)}
                      onValueChange={(val) => {
                        if (!Number.isNaN(val)) {
                          field.onChange(Number(val));
                        }
                      }}
                      className="flex flex-wrap items-center gap-2"
                    >
                      {commonFilters?.body_type.map((option) => (
                        <ToggleGroupItem
                          key={option.id}
                          value={String(option.id)}
                        >
                          {option.name}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="drive_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Привод</FormLabel>

                  <FormControl>
                    <ToggleGroup
                      type="single"
                      disabled={isCreatingListing}
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex flex-wrap items-center gap-2"
                    >
                      {commonFilters?.drive_type.map((option) => (
                        <ToggleGroupItem
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Рік виробництва*</FormLabel>

                  <Select
                    listTitle="Рік виробництва"
                    disabled={isCreatingListing}
                    options={productionYearOptions}
                    value={field.value ? String(field.value) : null}
                    onChange={(val) => {
                      if (!Number.isNaN(val)) {
                        field.onChange(Number(val));
                      } else if (val === null) {
                        field.onChange(val);
                      }
                    }}
                  />

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="vin_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>VIN номер</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="VIN номер"
                      {...field}
                      disabled={isCreatingListing}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <div
            className="bottom-0 left-0 fixed items-center gap-3 grid grid-cols-2 bg-white px-8.5 pt-5 border-grey border-t rounded-t-2xl w-full"
            style={{ paddingBottom: bottom || "20px" }}
          >
            <Button
              type="button"
              disabled={isCreatingListing}
              variant={"secondary"}
              className="bg-grey hover:bg-grey/90"
              onClick={() => navigate(-1)}
            >
              Скасувати
            </Button>

            <Button
              type="submit"
              form="listing-form"
              disabled={isCreatingListing || isUploadingPhotos}
            >
              {isCreatingListing ? (
                <>
                  Збереження... <LoaderCircle className="size-4 animate-spin" />
                </>
              ) : (
                <>
                  Зберегти <CheckMarkIcon />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}
