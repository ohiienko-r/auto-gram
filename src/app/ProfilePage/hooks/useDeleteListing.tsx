import { useMutation, useQueryClient } from "@tanstack/react-query";

import listingService from "@/services/listing-service";

import { toast } from "sonner";

export default function useDeleteListing(onSettled?: () => void) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["deleteListing"],
    mutationFn: (id: number) => listingService.deleteListing(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myListings"] });
      toast.success("Оголошення видалено");
    },
    onError: (error) => {
      toast.error("Виникла помилка при видаленні оголошення");
      console.error(error);
    },
    onSettled: () => onSettled?.(),
  });
  return { mutate, isPending };
}
