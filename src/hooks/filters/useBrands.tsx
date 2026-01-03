import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useFiltersStore } from "@/stores/filters-store";

import filtersService from "@/services/filters-service";

import type { AxiosError } from "axios";

export default function useBrands({ enabled = true }: { enabled: boolean }) {
  const { setBrands } = useFiltersStore();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["brands"],
    queryFn: () => filtersService.getBrands(),
    staleTime: Infinity,
    enabled,
  });

  useEffect(() => {
    if (data) {
      const brandsOptions = data.map((item) => ({
        value: String(item.id),
        label: item.name,
      }));

      setBrands(brandsOptions);
    }
  }, [data]);

  useEffect(() => {
    const axiosError = error as AxiosError;
    if (isError) {
      console.error(
        "Error fetching brands filters:",
        axiosError.message,
        axiosError.response?.data
      );
    }
  }, [isError, error]);

  return { data, isLoading };
}
