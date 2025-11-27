import { useForm } from "react-hook-form";

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
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

export default function SearchForm() {
  const form = useForm({
    defaultValues: {
      priceRange: [0, 75] as [number, number],
      possibleBargain: false,
      typeofTransport: "",
    },
  });

  const { control } = form;

  return (
    <Form {...form}>
      <form className="">
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
      </form>
    </Form>
  );
}
