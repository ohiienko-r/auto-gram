import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import listingService from "@/services/listing-service";

import type { AxiosError } from "axios";

export default function useUploadListingPhotos() {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["uploadPhotos"],
    mutationFn: ({ carId, data }: { carId: number; data: FormData }) =>
      listingService.uploadListingPhotos(carId, data),
    onSuccess: () => {
      toast.success("Фото успішно завантажено");
    },
    onError: (error: AxiosError) => {
      console.error(
        "Failed to upload photos",
        error.message,
        error?.response?.data
      );
      toast.error("Не вдалося завантажити фото");
    },
  });

  return { mutateAsync, isPending };
}
