import { useState, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router";
import { useFiltersStore } from "@/stores/filters-store";
import { useSearchStore } from "@/stores/search-store";
import useModels from "@/hooks/filters/useModels";
import useSettlements from "@/hooks/filters/useSettlements";
import { zodResolver } from "@hookform/resolvers/zod";
import { viewport } from "@tma.js/sdk-react";
import clsx from "clsx";

import {
  SearchFormValidationSchema,
  type SearchFormValues,
} from "../validation/validation";
import { ROUTES_NAMES } from "@/constants/router";

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
import Select from "@/components/Select";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import RangeSlider from "react-range-slider-input";
import SaveButtonWithDrawer from "../components/SaveButtonWithDrawer";
import "react-range-slider-input/dist/style.css";

export default function SearchForm() {
  const [inputFocused, setInputFocused] = useState(false);
  const { commonFilters, regions, brands } = useFiltersStore();
  const { formValues, setFormValues } = useSearchStore();
  const { bottom } = viewport.safeAreaInsets();
  const navigate = useNavigate();

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(SearchFormValidationSchema),
    defaultValues: (formValues && {
      ...formValues,
      price_range: [
        formValues.price_min || 0,
        formValues.price_max || commonFilters?.ranges?.price?.max || 0,
      ],
    }) || {
      price_range: [0, commonFilters?.ranges?.price?.max],
      bargaining: false,
      year_min: null,
      year_max: null,
      mileage_max: null,
    },
  });

  const { control, reset, setValue, handleSubmit } = form;

  const brand = useWatch({ control, name: "brand_id" });
  const region = useWatch({ control, name: "region_id" });

  const { data: models, isLoading: isModelsLoading } = useModels(brand);
  const { data: settlements, isLoading: isSettlementsLoading } =
    useSettlements(region);

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

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
  };

  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-8"
            style={{ paddingBottom: (bottom || 20) + 70 }}
            onSubmit={handleSubmit((formValues) => {
              const actualValues: Partial<SearchFormValues> = {};

              Object.entries(formValues).forEach(([key, value]) => {
                if (
                  value !== null &&
                  value !== undefined &&
                  value !== "" &&
                  key !== "price_range" &&
                  key !== "bargaining"
                ) {
                  Object.assign(actualValues, { [key]: value });
                } else if (
                  key === "price_range" &&
                  Array.isArray(value) &&
                  value?.[0] !== 0 &&
                  value?.[1] !== 400000
                ) {
                  Object.assign(actualValues, {
                    price_min: value[0],
                    price_max: value[1],
                  });
                } else if (key === "bargaining" && value !== false) {
                  Object.assign(actualValues, { [key]: value });
                }
              });

              setFormValues(actualValues);
              navigate(ROUTES_NAMES.ROOT);
            }, console.warn)}
          >
            <div className="flex flex-col gap-3">
              <FormField
                control={control}
                name="price_range"
                render={({ field }) => {
                  (
                    document.querySelector(
                      "#range-input .range-slider__thumb[data-lower]",
                    ) as HTMLElement | null
                  )?.style.setProperty(
                    "--slider-value",
                    `"$${field.value?.[0]}"`,
                  );

                  (
                    document.querySelector(
                      "#range-input .range-slider__thumb[data-upper]",
                    ) as HTMLElement | null
                  )?.style.setProperty(
                    "--slider-value",
                    `"$${field.value?.[1]}"`,
                  );

                  return (
                    <FormItem className="gap-8">
                      <FormLabel>Ціна</FormLabel>

                      <div className="flex flex-col gap-5">
                        <RangeSlider
                          value={field.value}
                          id="range-input"
                          onInput={field.onChange}
                          max={commonFilters?.ranges?.price?.max}
                        />

                        <div className="gap-3 grid grid-cols-2">
                          <Input
                            placeholder="Від"
                            value={field.value?.[0]}
                            onChange={(e) =>
                              field.onChange([e.target.value, field.value?.[1]])
                            }
                            type="number"
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                          />

                          <Input
                            placeholder="До"
                            value={field.value?.[1]}
                            onChange={(e) =>
                              field.onChange([field.value?.[0], e.target.value])
                            }
                            type="number"
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                          />
                        </div>
                      </div>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={control}
                name="bargaining"
                render={({ field }) => (
                  <FormItem className="justify-items-start">
                    <FormControl>
                      <Toggle
                        pressed={field.value}
                        onPressedChange={field.onChange}
                      >
                        Можливий торг
                      </Toggle>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name="type_of_car_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тип траспорта</FormLabel>

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
              name="brand_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Марка</FormLabel>

                  <Select
                    listTitle="Марка"
                    options={brands ?? []}
                    value={field.value ? String(field.value) : null}
                    onChange={(val) => {
                      if (!Number.isNaN(val)) {
                        field.onChange(Number(val));
                      }
                      setValue("model_id", null);
                    }}
                  />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="model_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Модель</FormLabel>

                  <Select
                    disabled={isModelsLoading || !brand}
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
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="condition_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Стан</FormLabel>

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
                      {commonFilters?.condition?.map((option) => (
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
              name="fuel_type_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Паливо</FormLabel>

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
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="gearbox_id"
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
              name="region_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Регіон</FormLabel>

                  <Select
                    listTitle="Регіон"
                    options={regions ?? []}
                    value={field.value ? String(field.value) : null}
                    onChange={(val) => {
                      if (!Number.isNaN(val)) {
                        field.onChange(Number(val));
                      }
                      setValue("settlement_id", null);
                    }}
                  />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="settlement_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Населений пункт*</FormLabel>

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
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="body_type_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тип кузова</FormLabel>

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
                      {commonFilters?.body_type?.map((option) => (
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
                      value={field.value ?? ""}
                      onValueChange={field.onChange}
                      className="flex flex-wrap items-center gap-2"
                    >
                      {commonFilters?.drive_type?.map((option) => (
                        <ToggleGroupItem
                          key={option.value}
                          value={String(option.value)}
                        >
                          {option.label}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="items-end gap-3 grid grid-cols-2">
              <FormField
                control={control}
                name="year_min"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Рік виробництва</FormLabel>

                    <FormControl>
                      <Input
                        value={field.value || ""}
                        onChange={(e) => {
                          if (e.target.value === "") {
                            field.onChange(null);
                          } else if (!Number.isNaN(Number(e.target.value))) {
                            field.onChange(Number(e.target.value));
                          }
                        }}
                        placeholder="Від"
                        type="number"
                        min={commonFilters?.ranges?.year?.min}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="year_max"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        value={field.value || ""}
                        onChange={(e) => {
                          if (e.target.value === "") {
                            field.onChange(null);
                          } else if (!Number.isNaN(Number(e.target.value))) {
                            field.onChange(Number(e.target.value));
                          }
                        }}
                        placeholder="До"
                        type="number"
                        max={commonFilters?.ranges?.year?.max}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name="mileage_max"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Макс. Пробіг</FormLabel>
                  <FormControl>
                    <Input
                      value={field.value || ""}
                      onChange={(e) => {
                        if (e.target.value === "") {
                          field.onChange(null);
                        } else if (!Number.isNaN(Number(e.target.value))) {
                          field.onChange(Number(e.target.value));
                        }
                      }}
                      placeholder="Максимальний пробіг (тис. км)"
                      type="number"
                      max={commonFilters?.ranges?.mileage?.max}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div
              className={clsx(
                "left-0 fixed flex items-center gap-1.5 bg-white px-4 pt-5 border-grey border-t rounded-t-2xl w-full transition-all",
                inputFocused ? "-bottom-4/5" : "bottom-0 ",
              )}
              style={{
                paddingBottom: bottom || "20px",
              }}
            >
              <SaveButtonWithDrawer />

              <Button
                onClick={() => {
                  reset();
                  setFormValues(null);
                  navigate(ROUTES_NAMES.ROOT);
                }}
                variant={"secondary"}
                className="bg-grey hover:bg-grey/90"
                type="button"
              >
                Скинути
              </Button>

              <Button className="flex-1" type="submit">
                Показати
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
