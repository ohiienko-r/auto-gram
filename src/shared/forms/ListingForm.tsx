import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ListingFormSchema,
  type ListingFormValues,
} from "../validation/validation";

import ListingPhotosCarousel from "@/components/ListingPhotosCarousel";
import {
  Form,
  // FormField,
  // FormItem,
  // FormLabel,
  // FormControl,
  // FormMessage,
} from "@/components/ui/form";

export default function ListingForm() {
  const form = useForm<ListingFormValues>({
    resolver: zodResolver(ListingFormSchema),
    defaultValues: {
      photos: [],
    },
  });

  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "photos",
    keyName: "id",
  });

  const handleAddPhoto = (photo: File) => [
    append({ id: window.crypto.randomUUID(), photo }),
  ];

  return (
    <Form {...form}>
      <form id="listing-form" className="flex flex-col gap-8">
        <ListingPhotosCarousel
          data={fields}
          onPhotoAdd={handleAddPhoto}
          onPhotoRemove={remove}
        />
      </form>
    </Form>
  );
}
