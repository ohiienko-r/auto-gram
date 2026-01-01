import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import listingService from "@/services/listing-service";

import { type AxiosError } from "axios";

export default function useListingDetails(id: number | string | undefined) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["listing-details", id],
    queryFn: () => listingService.getListingDetails(Number(id)),
    enabled: !!id,
  });

  useEffect(() => {
    if (isError) {
      const axiosError = error as AxiosError;
      console.error(
        "Error fetching listing details:",
        axiosError.message,
        axiosError.response?.data
      );
    }
  }, [isError, error]);

  return { data, isLoading };
}
