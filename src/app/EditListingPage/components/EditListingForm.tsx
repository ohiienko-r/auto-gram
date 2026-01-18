import { useMemo, useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { useFiltersStore } from "@/stores/filters-store";
import useModels from "@/hooks/filters/useModels";
import useSettlements from "@/hooks/filters/useSettlements";
import useListingPhotos from "../hooks/useListingPhotos";
import useListingDetails from "@/hooks/useListingDetails";
import useResetEditListingForm from "../hooks/useResetEditListingForm";
import useDeleteListingPhotos from "../hooks/useDeleteListingPhotos";

import type { ListingPhotos } from "@/types/listing";

import { viewport } from "@tma.js/sdk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EditListingFormSchema,
  type EditListingFormValues,
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
import { Skeleton } from "@/components/ui/skeleton";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import CheckMarkIcon from "@/icons/CheckMarkIcon";
import { LoaderCircle } from "lucide-react";

type PhotoItem =
  | ListingPhotos
  | { id: string; url: File | string; name?: string };

export default function EditListingForm() {
  const [existingPhotos, setExistingPhotos] = useState<ListingPhotos[]>([]);
  const [removePhotos, setRemovePhotos] = useState<number[]>([]);
  const [mergedContent, setMergedContent] = useState<PhotoItem[]>([]);

  const { id } = useParams();

  const { data: listingPhotos, isLoading: loadingListingPhotos } =
    useListingPhotos(id);
  const { data: details, isLoading: loadingDetails } = useListingDetails(id);
  const { commonFilters, regions, brands } = useFiltersStore();
  const { mutateAsync, isPending } = useDeleteListingPhotos();

  const { bottom } = viewport.safeAreaInsets();
  const navigate = useNavigate();

  const form = useForm<EditListingFormValues>({
    resolver: zodResolver(EditListingFormSchema),
    defaultValues: {
      newPhotos: [],
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
      vin_number: "",
    },
  });

  const { control, watch, setValue, reset, handleSubmit } = form;

  useEffect(() => {
    if (listingPhotos?.results) {
      setExistingPhotos(listingPhotos?.results);
    }
  }, [listingPhotos]);

  const {
    fields: newPhotos,
    append: appendNewPhoto,
    remove: removeNewPhoto,
  } = useFieldArray({
    control: control,
    name: "newPhotos",
    keyName: "id",
  });

  useEffect(() => {
    setMergedContent([...existingPhotos, ...newPhotos]);
  }, [existingPhotos, newPhotos]);

  const handleAddNewPhoto = (photo: File) => [
    appendNewPhoto({ id: globalThis.crypto.randomUUID(), url: photo }),
  ];

  const handleRemovePhoto = (index: number) => {
    const itemToRemoveId = mergedContent[index]?.id;

    if (typeof itemToRemoveId === "number") {
      setRemovePhotos((prev) => [...prev, itemToRemoveId]);
      setExistingPhotos((prev) =>
        prev.filter((photo) => photo.id !== itemToRemoveId)
      );
    } else {
      removeNewPhoto(index);
    }
  };

  const [carBrand, noMilage, region] = watch(["brand", "noMileage", "region"]);

  const { data: models, isLoading: isModelsLoading } = useModels(carBrand);
  const { data: settlements, isLoading: isSettlementsLoading } =
    useSettlements(region);

  const carBrandModels = useMemo(
    () =>
      models?.map((model) => ({
        label: model.name,
        value: String(model.id),
      })) || [],
    [models]
  );

  const settlementsOptions = useMemo(
    () =>
      settlements?.map((settlement) => ({
        label: settlement.name,
        value: String(settlement.id),
      })) || [],
    [settlements]
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

  const resetting = useResetEditListingForm({
    details,
    brands,
    carBrandModels,
    commonFilters,
    regions,
    settlements,
    reset,
  });

  const isLoading = useMemo(
    () => loadingListingPhotos || loadingDetails || resetting,
    [loadingListingPhotos, loadingDetails, resetting]
  );

  return (
    <Card style={{ paddingBottom: (bottom || 20) + 90 }}>
      <Form {...form}>
        <form id="edit-listing-form" className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            {isLoading ? (
              <Skeleton className="rounded-2xl w-full h-[220px]" />
            ) : (
              <ListingPhotosCarouselWithFileUpload
                data={mergedContent}
                onPhotoAdd={handleAddNewPhoto}
                onPhotoRemove={handleRemovePhoto}
              />
            )}

            {/* {mergedContent.length === 0 && !loadingListingPhotos && (
              <FormMessage>Додайте хоча б одне фото автомобіля</FormMessage>
            )} */}
          </div>

          <CardContent className="pt-0">
            <FormField
              control={control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Марка*</FormLabel>

                  {isLoading ? (
                    <Skeleton className="rounded-md w-full h-[35px]" />
                  ) : (
                    <Select
                      listTitle="Марка"
                      options={brands ?? []}
                      value={field.value ? String(field.value) : null}
                      onChange={(val) => {
                        if (!Number.isNaN(val)) {
                          field.onChange(Number(val));
                        }
                        setValue("model", null);
                      }}
                    />
                  )}

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

                  {isLoading ? (
                    <Skeleton className="rounded-md w-full h-[35px]" />
                  ) : (
                    <Select
                      disabled={isModelsLoading || !carBrand}
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
                  )}

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
                      {isLoading ? (
                        <Skeleton className="rounded-md w-full h-[35px]" />
                      ) : (
                        <Input
                          placeholder="Ціна USD"
                          type="number"
                          {...field}
                        />
                      )}
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
                      {!isLoading && (
                        <Toggle
                          pressed={field.value}
                          onPressedChange={field.onChange}
                        >
                          Можливен торг
                        </Toggle>
                      )}
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
                    {isLoading ? (
                      <Skeleton className="rounded-md w-full h-[35px]" />
                    ) : (
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
                        {commonFilters?.type_of_car?.map((option) => (
                          <ToggleGroupItem
                            key={option.id}
                            value={String(option.id)}
                          >
                            {option.name}
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    )}
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

                  {isLoading ? (
                    <Skeleton className="rounded-md w-full h-[35px]" />
                  ) : (
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
                      {commonFilters?.condition?.map((option) => (
                        <ToggleGroupItem
                          key={option.id}
                          value={String(option.id)}
                        >
                          {option.name}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  )}

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
                      {isLoading ? (
                        <Skeleton className="rounded-md w-full h-[35px]" />
                      ) : (
                        <Input
                          {...field}
                          disabled={noMilage}
                          placeholder="тис. км."
                          type="number"
                        />
                      )}
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
                      {!isLoading && (
                        <Toggle
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
                      )}
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

                  {isLoading ? (
                    <Skeleton className="rounded-md w-full h-[35px]" />
                  ) : (
                    <Select
                      listTitle="Регіон"
                      options={regions ?? []}
                      value={field.value ? String(field.value) : null}
                      onChange={(val) => {
                        if (!Number.isNaN(val)) {
                          field.onChange(Number(val));
                        }
                        setValue("settlement", null);
                      }}
                    />
                  )}

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

                  {isLoading ? (
                    <Skeleton className="rounded-md w-full h-[35px]" />
                  ) : (
                    <Select
                      disabled={isSettlementsLoading || !region}
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
                  )}

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
                    {isLoading ? (
                      <Skeleton className="rounded-md w-full h-[35px]" />
                    ) : (
                      <Input
                        type="number"
                        placeholder="Об'єм двигуна (л.)"
                        {...field}
                      />
                    )}
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
                    {isLoading ? (
                      <Skeleton className="rounded-md w-full h-[35px]" />
                    ) : (
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
                        {commonFilters?.fuel_type?.map((option) => (
                          <ToggleGroupItem
                            key={option.id}
                            value={String(option.id)}
                          >
                            {option.name}
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    )}
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="gearbox"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Коробка передач</FormLabel>

                  {isLoading ? (
                    <Skeleton className="rounded-md w-full h-[35px]" />
                  ) : (
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
                  )}
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
                    {isLoading ? (
                      <Skeleton className="rounded-md w-full h-[35px]" />
                    ) : (
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
                        {commonFilters?.body_type.map((option) => (
                          <ToggleGroupItem
                            key={option.id}
                            value={String(option.id)}
                          >
                            {option.name}
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    )}
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
                    {isLoading ? (
                      <Skeleton className="rounded-md w-full h-[35px]" />
                    ) : (
                      <ToggleGroup
                        type="single"
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
                    )}
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

                  {isLoading ? (
                    <Skeleton className="rounded-md w-full h-[35px]" />
                  ) : (
                    <Select
                      listTitle="Рік виробництва"
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
                  )}

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
                    {isLoading ? (
                      <Skeleton className="rounded-md w-full h-[35px]" />
                    ) : (
                      <Input placeholder="VIN номер" {...field} />
                    )}
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
              variant={"secondary"}
              className="bg-grey hover:bg-grey/90"
              onClick={() => navigate(-1)}
            >
              Скасувати
            </Button>

            <Button
              type="submit"
              form="listing-form"
              disabled={isLoading}
              onClick={handleSubmit(async (formValues) => {
                // TODO: UPDATE and TEST when new endpoin is applicable
                const payload = {
                  ...formValues,
                  price: Number(formValues.price),
                  mileage: Number(formValues.mileage),
                };

                if (!details) return;

                const updateValues = Object.entries(payload)?.reduce(
                  (acc, [key, value]) => {
                    if (!Object.hasOwn(details, key)) return acc;

                    const originalValue = details[key as keyof typeof details];

                    if (value != originalValue) {
                      if (!value && !originalValue) return acc;
                      const isBothEmpty =
                        (value === "" || value === null) &&
                        (originalValue === "" || originalValue === null);

                      if (!isBothEmpty) {
                        return { ...acc, [key]: value };
                      }

                      return { ...acc, [key]: value };
                    }

                    return acc;
                  },
                  {} as Partial<typeof formValues>
                );

                if (removePhotos.length > 0) {
                  await mutateAsync(removePhotos);
                }
              }, console.warn)}
            >
              Зберегти
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}
