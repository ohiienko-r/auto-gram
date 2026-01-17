import { useState } from "react";
import { useForm } from "react-hook-form";
import useUpdateProfile from "../hooks/useUpdateProfile";

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
import CheckMarkIcon from "@/icons/CheckMarkIcon";
import { LoaderCircle } from "lucide-react";

export default function ProfileForm() {
  const [editing, setEditing] = useState(false);
  const { mutate, isPending } = useUpdateProfile(() => setEditing(false));

  const form = useForm({
    defaultValues: {
      first_name: "",
      phone_number: "+380",
    },
  });

  const { control, handleSubmit } = form;

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit((formValues) => {
          mutate(formValues);
        })}
      >
        <FormField
          control={control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ім'я</FormLabel>

              <FormControl>
                {editing ? (
                  <Input
                    {...field}
                    placeholder="Ім'я"
                    className="h-[43px]"
                    disabled={isPending}
                  />
                ) : (
                  <p>{field.value || "-"}</p>
                )}
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Номер телефону</FormLabel>

              <FormControl>
                {editing ? (
                  <Input
                    {...field}
                    value={field.value || "+380"}
                    onChange={(e) => {
                      let val = e.target.value;

                      if (!val.startsWith("+380")) {
                        val = "+380";
                      }

                      const cleanVal = "+" + val.replace(/[^\d]/g, "");

                      field.onChange(cleanVal);
                    }}
                    placeholder="+38 ___ ___ __ __"
                    className="h-[43px]"
                    type="tel"
                    disabled={isPending}
                  />
                ) : (
                  <p>{field.value || "-"}</p>
                )}
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-start items-center gap-2">
          {editing ? (
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-1.5 font-semibold text-primary hover:text-primary/80 active:text-primary/80 text-base transition-colors cursor-pointer"
            >
              {isPending ? (
                <>
                  Зберігаємо... <LoaderCircle className="animate-spin" />
                </>
              ) : (
                <>
                  Зберегти <CheckMarkIcon />
                </>
              )}
            </button>
          ) : (
            <button
              disabled={isPending}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setEditing(true);
              }}
              type="button"
              className="flex items-center gap-1.5 font-semibold text-primary hover:text-primary/80 active:text-primary/80 text-base transition-colors cursor-pointer"
            >
              Змінити <EditIcon />
            </button>
          )}
        </div>
      </form>
    </Form>
  );
}
