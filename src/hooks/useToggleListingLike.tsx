import { useMutation, useQueryClient } from "@tanstack/react-query";

import listingService from "@/services/listing-service";

export default function useToggleListingLike() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["toggleListingLike"],
    mutationFn: (id: number) => listingService.toggleListingLike(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["listingsSearch"] });
      await queryClient.invalidateQueries({ queryKey: ["listingDetails"] });
    },
    onError: (error) => {
      console.error("Error toggling listing like:", error);
    },
  });

  return { mutate, isPending };
}
