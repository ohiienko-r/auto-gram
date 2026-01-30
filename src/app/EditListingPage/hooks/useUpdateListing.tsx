import { useMutation, useQueryClient } from "@tanstack/react-query";
import useDeleteListingPhotos from "./useDeleteListingPhotos";
import useUploadListingPhotos from "@/hooks/useUploadListingPhotos";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import listingService from "@/services/listing-service";

import type { EditListingFormValues } from "../validation/validation";
import type { UpdateListingPayload } from "@/types/listing";

export default function useUpdateListing() {
  const queryClient = useQueryClient();
  const {
    mutateAsync: deleteListingPhotos,
    isPending: isDeletingListingPhotos,
  } = useDeleteListingPhotos();
  const {
    mutateAsync: uploadListingPhotos,
    isPending: isUploadingListingPhotos,
  } = useUploadListingPhotos();
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (params: {
      carId: number;
      values: Partial<UpdateListingPayload>;
      newPhotos: EditListingFormValues["newPhotos"];
      removePhotos: number[];
    }) => {
      const { carId, values, newPhotos, removePhotos } = params;

      if (removePhotos.length > 0) {
        await deleteListingPhotos(removePhotos);
      }

      if (newPhotos && newPhotos.length > 0) {
        const formData = new FormData();

        newPhotos.forEach((photo) => {
          if (photo.url instanceof File) {
            formData.append(newPhotos.length > 1 ? "files" : "file", photo.url);
          }
        });

        await uploadListingPhotos({
          carId: carId,
          data: formData,
        });
      }

      if (values && Object.keys(values).length > 0) {
        await listingService.updateListing(carId, values);
      } else {
        Promise.resolve();
      }
    },
    onSuccess: () => {
      toast.success("Оголошення оновлено успішно");

      queryClient.invalidateQueries({ queryKey: ["myListings"] });
      queryClient.invalidateQueries({ queryKey: ["listingsSearch"] });

      navigate(-1);
    },
    onError: (error) => {
      toast.error("Не вдалося оновити оголошення");
      console.error(error);
    },
  });

  return {
    mutateAsync,
    isPending: isPending || isDeletingListingPhotos || isUploadingListingPhotos,
  };
}
