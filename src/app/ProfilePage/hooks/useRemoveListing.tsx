import { useMutation, useQueryClient } from "@tanstack/react-query";

import listingService from "@/services/listing-service";

import { toast } from "sonner";

export default function useRemoveListing(onSettled?: () => void) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["removeListing"],
    mutationFn: (id: number) => listingService.removeMyListing(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myListings"] });
      toast.success("Оголошення знято");
    },
    onError: (error) => {
      toast.error("Виникла помилка при знятті оголошення");
      console.error(error);
    },
    onSettled: () => onSettled?.(),
  });

  return { mutate, isPending };
}
