import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useUploadListingPhotos from "./useUploadListingPhotos";
import { toast } from "sonner";

import listingService from "@/services/listing-service";

import type { ListingPayload } from "@/types/listing";
import type { AxiosError } from "axios";

export default function useCreateListing() {
  const { mutateAsync, isPending: isUploadingPhotos } =
    useUploadListingPhotos();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: ["createListing"],
    mutationFn: (data: ListingPayload) => listingService.createListing(data),
    onSuccess: async (response, formValues) => {
      toast.info("Завантажуємо фото");

      const formData = new FormData();

      formValues.photos.forEach((photo) => {
        formData.append(
          formValues.photos.length > 1 ? "files" : "file",
          photo.photo
        );
      });

      await mutateAsync({ carId: response.id, data: formData });

      queryClient.invalidateQueries({ queryKey: ["myListings"] });
      queryClient.invalidateQueries({ queryKey: ["listingsSearch"] });

      navigate(-1);

      toast.success("Оголошення створено!");
    },
    onError: (error: AxiosError) => {
      console.error(
        "Failed to create listing",
        error.message,
        error?.response?.data
      );
      toast.error("Не вдалося створити оголошення");
    },
  });

  return { mutate, isPending, isUploadingPhotos };
}
