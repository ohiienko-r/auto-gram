import { useMutation } from "@tanstack/react-query";

import listingService from "@/services/listing-service";

export default function useDeleteListingPhotos() {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["deleteListingPhotos"],
    mutationFn: (filesIds: number[]) => {
      const promises = filesIds?.map((fileId) =>
        listingService.deleteListingPhoto(fileId)
      );

      return Promise.allSettled(promises);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { mutateAsync, isPending };
}
