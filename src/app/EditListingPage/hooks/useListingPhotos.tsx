import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import listingService from "@/services/listing-service";

export default function useListingPhotos(id?: number | string) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["listingPhotos", id],
    queryFn: () => listingService.getListingPhotos(Number(id!)),
    enabled: !!id,
  });

  useEffect(() => {
    if (isError) {
      console.error("Failed to load listing photos", error);
    }
  }, [isError, error]);

  return { data, isLoading };
}
