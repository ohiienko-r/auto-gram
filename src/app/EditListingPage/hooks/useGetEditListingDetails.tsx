import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import listingService from "@/services/listing-service";

export default function useGetEditListingDetails(listingId?: number) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["edit-listing-details", listingId],
    queryFn: () => listingService.getEditListingDetails(listingId),
    enabled: !!listingId,
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      toast.error("Помилка при завантаженні даних оголошення.");
    }
  }, [error]);

  return { data, isLoading };
}
