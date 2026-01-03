import { useForm } from "react-hook-form";
import { useFiltersStore } from "@/stores/filters-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { viewport } from "@tma.js/sdk-react";

import {
  SearchFormValidationSchema,
  type SearchFormValues,
} from "../validation/validation";

import {
  TYPEOF_TRANSPORT,
  TRANSPORT_OPTIONS,
  CAR_BRANDS_OPTIONS,
  CAR_CONDITION,
  CAR_CONDITION_OPTIONS,
  CAR_ACCIDENT,
  CAR_ACCIDENT_OPTIONS,
  FUEL_TYPE,
  FUEL_TYPE_OPTIONS,
  TRANSMISSION_TYPE,
  TRANSMISSION_TYPE_OPTIONS,
  REGIONS_OPTIONS,
  BODY_TYPE,
  BODY_TYPE_OPTIONS,
  SUSPENSION_TYPE,
  SUSPENSION_TYPE_OPTIONS,
  DRIVE_TYPE,
  DRIVE_TYPE_OPTIONS,
  CAR_COUNTRIES_OPTIONS,
} from "@/constants/transport";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import Multiselect from "@/components/Multiselect";

export default function SearchForm() {
  const { commonFilters, regions, brands } = useFiltersStore();
  const { bottom } = viewport.safeAreaInsets();

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(SearchFormValidationSchema),
    defaultValues: {
      priceRange: [0, 75],
      possibleBargain: false,
      carBrands: [],
      carModels: [],
      condition: CAR_CONDITION.ALL,
      carAccident: CAR_ACCIDENT.ALL,
      fuelType: FUEL_TYPE.ALL,
      transmission: TRANSMISSION_TYPE.ALL,
      regions: [],
      bodyType: BODY_TYPE.SEDAN,
      suspension: SUSPENSION_TYPE.PARTIAL,
      driveType: DRIVE_TYPE.FWD,
      carCountries: [],
      productionYearFrom: commonFilters?.ranges?.year?.min,
      productionYearTo: commonFilters?.ranges?.year?.max,
      milageFrom: commonFilters?.ranges?.mileage?.min,
      milageTo: commonFilters?.ranges?.mileage?.max,
      noMilage: false,
    },
  });

  const { control, watch, setValue, reset, handleSubmit } = form;

  const [noMilage] = watch(["noMilage"]);

  console.log("commonFilters", commonFilters);

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-8"
        style={{ paddingBottom: (bottom || 20) + 70 }}
        onSubmit={handleSubmit((formValues) => {
          console.log(formValues);
        })}
      >
        <div className="flex flex-col gap-3">
          <FormField
            control={control}
            name="priceRange"
            render={({ field }) => {
              (
                document.querySelector(
                  "#range-input .range-slider__thumb[data-lower]"
                ) as HTMLElement | null
              )?.style.setProperty("--slider-value", `"$${field.value?.[0]}"`);

              (
                document.querySelector(
                  "#range-input .range-slider__thumb[data-upper]"
                ) as HTMLElement | null
              )?.style.setProperty("--slider-value", `"$${field.value?.[1]}"`);

              return (
                <FormItem className="gap-8">
                  <FormLabel>Ціна</FormLabel>

                  <div className="flex flex-col gap-5">
                    <RangeSlider
                      value={field.value}
                      id="range-input"
                      defaultValue={[0, 75]}
                      onInput={field.onChange}
                    />

                    <div className="gap-3 grid grid-cols-2">
                      <Input
                        placeholder="Від"
                        value={field.value?.[0]}
                        onChange={(e) =>
                          field.onChange([e.target.value, field.value?.[1]])
                        }
                        type="number"
                      />

                      <Input
                        placeholder="До"
                        value={field.value?.[1]}
                        onChange={(e) =>
                          field.onChange([field.value?.[0], e.target.value])
                        }
                        type="number"
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
            name="possibleBargain"
            render={({ field }) => (
              <FormItem className="justify-items-start">
                <FormControl>
                  <Toggle
                    pressed={field.value}
                    onPressedChange={field.onChange}
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
          name="typeOfCar"
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
                  {commonFilters?.type_of_car.map((option) => (
                    <ToggleGroupItem key={option.id} value={String(option.id)}>
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
          name="carBrands"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Марка</FormLabel>

              <Multiselect
                listTitle="Марка"
                options={brands ?? []}
                value={field.value ?? []}
                onChange={(val) => {
                  console.log(val);
                  field.onChange(val);
                }}
              />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="carModels"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Модель</FormLabel>

              <Multiselect
                listTitle="Модель"
                options={CAR_BRANDS_OPTIONS}
                value={field.value ?? []}
                onChange={field.onChange}
              />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="condition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Стан</FormLabel>

              <FormControl>
                <ToggleGroup
                  type="single"
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex flex-wrap items-center gap-2"
                >
                  {commonFilters?.condition?.map((option) => (
                    <ToggleGroupItem key={option.id} value={String(option.id)}>
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
          name="carAccident"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Участь в ДТП</FormLabel>

              <FormControl>
                <ToggleGroup
                  type="single"
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex flex-wrap items-center gap-2"
                >
                  {CAR_ACCIDENT_OPTIONS.map((option) => (
                    <ToggleGroupItem key={option.value} value={option.value}>
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
          name="fuelType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Паливо</FormLabel>

              <FormControl>
                <ToggleGroup
                  type="single"
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex flex-wrap items-center gap-2"
                >
                  {commonFilters?.fuel_type?.map((option) => (
                    <ToggleGroupItem key={option.id} value={String(option.id)}>
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
          name="transmission"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Коробка передач</FormLabel>

              <FormControl>
                <ToggleGroup
                  type="single"
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex flex-wrap items-center gap-2"
                >
                  {commonFilters?.gearbox?.map((option) => (
                    <ToggleGroupItem key={option.id} value={String(option.id)}>
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
          name="regions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Регіон</FormLabel>

              <Multiselect
                listTitle="Регіон"
                options={regions ?? []}
                value={field.value ?? []}
                onChange={field.onChange}
              />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="bodyType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Тип кузова</FormLabel>

              <FormControl>
                <ToggleGroup
                  type="single"
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex flex-wrap items-center gap-2"
                >
                  {commonFilters?.body_type.map((option) => (
                    <ToggleGroupItem key={option.id} value={String(option.id)}>
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
          name="suspension"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Підвіска</FormLabel>

              <FormControl>
                <ToggleGroup
                  type="single"
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex flex-wrap items-center gap-2"
                >
                  {SUSPENSION_TYPE_OPTIONS.map((option) => (
                    <ToggleGroupItem key={option.value} value={option.value}>
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
          name="driveType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Привод</FormLabel>

              <FormControl>
                <ToggleGroup
                  type="single"
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex flex-wrap items-center gap-2"
                >
                  {commonFilters?.drive_type.map((option) => (
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

        <FormField
          control={control}
          name="carCountries"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Країна виробник</FormLabel>

              <Multiselect
                listTitle="Країна"
                options={CAR_COUNTRIES_OPTIONS}
                value={field.value ?? []}
                onChange={field.onChange}
              />
            </FormItem>
          )}
        />

        <div className="items-end gap-3 grid grid-cols-2">
          <FormField
            control={control}
            name="productionYearFrom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Рік виробництва</FormLabel>

                <FormControl>
                  <Input
                    {...field}
                    placeholder="Від"
                    type="number"
                    min={commonFilters?.ranges?.year?.min}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="productionYearTo"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="До"
                    type="number"
                    max={commonFilters?.ranges?.year?.max}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="items-end gap-3 grid grid-cols-2">
          <FormField
            control={control}
            name="milageFrom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пробіг (тис км)</FormLabel>

                <FormControl>
                  <Input
                    {...field}
                    placeholder="Від"
                    disabled={noMilage}
                    type="number"
                    min={commonFilters?.ranges?.mileage?.min}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="milageTo"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="До"
                    disabled={noMilage}
                    type="number"
                    max={commonFilters?.ranges?.mileage?.max}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="noMilage"
            render={({ field }) => (
              <FormItem className="justify-items-start">
                <FormControl>
                  <Toggle
                    pressed={field.value}
                    onPressedChange={(val) => {
                      field.onChange(val);

                      if (val) {
                        setValue("milageFrom", undefined);
                        setValue("milageTo", undefined);
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

        <div
          className="bottom-0 left-0 fixed flex items-center gap-1.5 bg-white px-4 pt-5 border-grey border-t rounded-t-2xl w-full"
          style={{ paddingBottom: bottom || "20px" }}
        >
          <div className="opacity-60 font-medium text-black">
            <p>Знайдено</p>
            <p>6500 авто</p>
          </div>

          <Button
            onClick={() => reset()}
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
  );
}
