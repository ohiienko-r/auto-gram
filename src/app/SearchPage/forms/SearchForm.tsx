import { useForm } from "react-hook-form";

import {
  TYPEOF_TRANSPORT,
  TYPES_OF_TRANSPORT,
  CAR_BRANDS,
  CAR_CONDITION,
  CAR_CONDITION_FILTERS,
  CAR_ACCIDENT,
  CAR_ACCIDENT_FILTERS,
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
  const form = useForm({
    defaultValues: {
      priceRange: [0, 75] as [number, number],
      possibleBargain: false,
      typeofTransport: TYPEOF_TRANSPORT.ALL,
      carBrands: [] as string[],
      carModels: [] as string[],
      carAccident: CAR_ACCIDENT.ALL,
      condition: CAR_CONDITION.ALL,
    },
  });

  const { control } = form;

  return (
    <Form {...form}>
      <form className="flex flex-col gap-8">
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
                  {TYPES_OF_TRANSPORT.map((type) => (
                    <ToggleGroupItem key={type.value} value={type.value}>
                      {type.label}
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

                      {CAR_BRANDS.map((brand) => (
                        <button
                          key={brand.value}
                          className="flex flex-col gap-3 font-medium text-start"
                        >
                          <p>{brand.label}</p>
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

                      {CAR_BRANDS.map((brand) => (
                        <button
                          key={brand.value}
                          className="flex flex-col gap-3 font-medium text-start"
                        >
                          <p>{brand.label}</p>
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
                  {CAR_CONDITION_FILTERS.map((condition) => (
                    <ToggleGroupItem
                      key={condition.value}
                      value={condition.value}
                    >
                      {condition.label}
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
                  {CAR_ACCIDENT_FILTERS.map((accident) => (
                    <ToggleGroupItem
                      key={accident.value}
                      value={accident.value}
                    >
                      {accident.label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
