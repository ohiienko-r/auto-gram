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

import EditIcon from "@/icons/EditIcon";

export default function ProfileForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      mobilePhone: "",
    },
  });

  const { control } = form;

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ім'я</FormLabel>

              <FormControl>
                <Input {...field} placeholder="Ім'я" className="h-[43px]" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="mobilePhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Номер телефону</FormLabel>

              <FormControl>
                <Input
                  {...field}
                  placeholder="+38 ___ ___ __ __"
                  className="h-[43px]"
                  type="tel"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <button
          type="button"
          className="flex items-center gap-1.5 font-semibold text-primary active:text-primary/80 text-base transition-colors cursor-pointer"
        >
          Змінити <EditIcon />
        </button>
      </form>
    </Form>
  );
}
