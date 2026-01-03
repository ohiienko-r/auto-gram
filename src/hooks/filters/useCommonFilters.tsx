import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useFiltersStore } from "@/stores/filters-store";

import filtersService from "@/services/filters-service";

import type { AxiosError } from "axios";

export default function useCommonFilters({
  enabled = true,
}: {
  enabled: boolean;
}) {
  const { setCommonFilters } = useFiltersStore();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["commonFilters"],
    queryFn: () => filtersService.getCommonFilters(),
    staleTime: Infinity,
    enabled,
  });

  useEffect(() => {
    if (data) {
      setCommonFilters(data);
    }
  }, [data]);

  useEffect(() => {
    const axiosError = error as AxiosError;
    if (isError) {
      console.error(
        "Error fetching common filters:",
        axiosError.message,
        axiosError.response?.data
      );
    }
  }, [isError, error]);

  return { data, isLoading };
}
