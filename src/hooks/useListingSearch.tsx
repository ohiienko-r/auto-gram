import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/auth-store";

import searchService from "@/services/search-service";

import type { AxiosError } from "axios";

export default function useListingSearch(query?: string) {
  const { auth } = useAuthStore();
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["listingsSearch"],
    queryFn: () => searchService.search(query),
    enabled: !!auth,
  });

  useEffect(() => {
    if (isError) {
      console.error(
        "Failed to get listings",
        error.message,
        (error as AxiosError)?.response?.data
      );
    }
  }, [error, isError]);

  return { data, isLoading };
}
