import { useForm } from "react-hook-form";
import { viewport } from "@tma.js/sdk-react";

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
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

import CheckMarkIcon from "@/icons/CheckMarkIcon";

export default function SearchForm() {
  const { bottom } = viewport.safeAreaInsets();
  const form = useForm({
    defaultValues: {
      priceRange: [0, 75] as [number, number],
      possibleBargain: false,
      typeofTransport: TYPEOF_TRANSPORT.ALL,
      carBrands: [] as string[],
      carModels: [] as string[],
      condition: CAR_CONDITION.ALL,
      carAccident: CAR_ACCIDENT.ALL,
      fuelType: FUEL_TYPE.ALL,
      transmission: TRANSMISSION_TYPE.ALL,
      regions: [] as string[],
      bodyType: BODY_TYPE.SEDAN,
      suspension: SUSPENSION_TYPE.PARTIAL,
      driveType: DRIVE_TYPE.FWD,
      carCountries: [] as string[],
      productionYearFrom: undefined,
      productionYearTo: undefined,
      kilometrageFrom: "",
      kilometrageTo: "",
      noKilometrage: false,
    },
  });

  const { control, watch, setValue, reset, handleSubmit } = form;

  const [noKilometrage] = watch(["noKilometrage"]);

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-8"
        style={{ paddingBottom: (bottom || 20) + 90 }}
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
              )?.style.setProperty("--slider-value", `"$${field.value[0]}"`);

              (
                document.querySelector(
                  "#range-input .range-slider__thumb[data-upper]"
                ) as HTMLElement | null
              )?.style.setProperty("--slider-value", `"$${field.value[1]}"`);

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
                        value={field.value[0]}
                        onChange={(e) =>
                          field.onChange([e.target.value, field.value[1]])
                        }
                      />

                      <Input
                        placeholder="До"
                        value={field.value[1]}
                        onChange={(e) =>
                          field.onChange([field.value[0], e.target.value])
                        }
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
          name="typeofTransport"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Тип траспорта</FormLabel>

              <FormControl>
                <ToggleGroup
                  type="single"
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex flex-wrap items-center gap-2"
                >
                  {TRANSPORT_OPTIONS.map((option) => (
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
          name="carBrands"
          render={() => (
            <FormItem>
              <FormLabel>Марка</FormLabel>

              <div className="flex flex-wrap items-center gap-1.5">
                <Dialog>
                  <DialogTrigger asChild>
                    <Toggle pressed={false} className="w-fit">
                      Обрати
                    </Toggle>
                  </DialogTrigger>

                  <DialogContent
                    aria-describedby={undefined}
                    className="size-full"
                  >
                    <DialogHeader>
                      <DialogTitle className="justify-self-center">
                        Марка авто
                      </DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col flex-1 gap-3 px-4 overflow-y-scroll">
                      <hr className="border-black/30" />

                      {CAR_BRANDS_OPTIONS.map((option) => (
                        <button
                          key={option.value}
                          className="flex flex-col gap-3 font-medium text-start"
                        >
                          <p>{option.label}</p>
                          <hr className="border-black/30" />
                        </button>
                      ))}
                    </div>

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button onClick={() => console.log("click")}>
                          Зберегти <CheckMarkIcon />
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="carModels"
          render={() => (
            <FormItem>
              <FormLabel>Модель</FormLabel>

              <div className="flex flex-wrap items-center gap-1.5">
                <Dialog>
                  <DialogTrigger asChild>
                    <Toggle pressed={false} className="w-fit">
                      Обрати
                    </Toggle>
                  </DialogTrigger>

                  <DialogContent
                    aria-describedby={undefined}
                    className="size-full"
                  >
                    <DialogHeader>
                      <DialogTitle className="justify-self-center">
                        Модель авто
                      </DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col flex-1 gap-3 px-4 overflow-y-scroll">
                      <hr className="border-black/30" />

                      {CAR_BRANDS_OPTIONS.map((option) => (
                        <button
                          key={option.value}
                          className="flex flex-col gap-3 font-medium text-start"
                        >
                          <p>{option.label}</p>
                          <hr className="border-black/30" />
                        </button>
                      ))}
                    </div>

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button onClick={() => console.log("click")}>
                          Зберегти <CheckMarkIcon />
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
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
                  {CAR_CONDITION_OPTIONS.map((option) => (
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
                  {FUEL_TYPE_OPTIONS.map((option) => (
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
                  {TRANSMISSION_TYPE_OPTIONS.map((option) => (
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
          name="regions"
          render={() => (
            <FormItem>
              <FormLabel>Регіон</FormLabel>

              <div className="flex flex-wrap items-center gap-1.5">
                <Dialog>
                  <DialogTrigger asChild>
                    <Toggle pressed={false} className="w-fit">
                      Обрати
                    </Toggle>
                  </DialogTrigger>

                  <DialogContent
                    aria-describedby={undefined}
                    className="size-full"
                  >
                    <DialogHeader>
                      <DialogTitle className="justify-self-center">
                        Регіон
                      </DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col flex-1 gap-3 px-4 overflow-y-scroll">
                      <hr className="border-black/30" />

                      {REGIONS_OPTIONS.map((option) => (
                        <button
                          key={option.value}
                          className="flex flex-col gap-3 font-medium text-start"
                        >
                          <p>{option.label}</p>
                          <hr className="border-black/30" />
                        </button>
                      ))}
                    </div>

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button onClick={() => console.log("click")}>
                          Зберегти <CheckMarkIcon />
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
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
                  {BODY_TYPE_OPTIONS.map((option) => (
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
                  {DRIVE_TYPE_OPTIONS.map((option) => (
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
          name="carCountries"
          render={() => (
            <FormItem>
              <FormLabel>Країна виробник</FormLabel>

              <div className="flex flex-wrap items-center gap-1.5">
                <Dialog>
                  <DialogTrigger asChild>
                    <Toggle pressed={false} className="w-fit">
                      Обрати
                    </Toggle>
                  </DialogTrigger>

                  <DialogContent
                    aria-describedby={undefined}
                    className="size-full"
                  >
                    <DialogHeader>
                      <DialogTitle className="justify-self-center">
                        Країна виробник
                      </DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col flex-1 gap-3 px-4 overflow-y-scroll">
                      <hr className="border-black/30" />

                      {CAR_COUNTRIES_OPTIONS.map((option) => (
                        <button
                          key={option.value}
                          className="flex flex-col gap-3 font-medium text-start"
                        >
                          <p>{option.label}</p>
                          <hr className="border-black/30" />
                        </button>
                      ))}
                    </div>

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button onClick={() => console.log("click")}>
                          Зберегти <CheckMarkIcon />
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
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
                  <Input {...field} placeholder="Від" />
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
                  <Input {...field} placeholder="До" />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="items-end gap-3 grid grid-cols-2">
          <FormField
            control={control}
            name="kilometrageFrom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пробіг (тис км)</FormLabel>

                <FormControl>
                  <Input
                    {...field}
                    placeholder="Від"
                    disabled={noKilometrage}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="kilometrageTo"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="До" disabled={noKilometrage} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="noKilometrage"
            render={({ field }) => (
              <FormItem className="justify-items-start">
                <FormControl>
                  <Toggle
                    pressed={field.value}
                    onPressedChange={(val) => {
                      field.onChange(val);

                      if (val) {
                        setValue("kilometrageFrom", "");
                        setValue("kilometrageTo", "");
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
