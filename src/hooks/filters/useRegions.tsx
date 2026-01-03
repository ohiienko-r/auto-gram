import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useFiltersStore } from "@/stores/filters-store";

import filtersService from "@/services/filters-service";

import type { AxiosError } from "axios";

export default function useRegions({ enabled = true }: { enabled: boolean }) {
  const { setRegions } = useFiltersStore();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["regions"],
    queryFn: () => filtersService.getRegions(),
    staleTime: Infinity,
    enabled,
  });

  useEffect(() => {
    if (data) {
      const regionsOptions = data.map((item) => ({
        value: String(item.id),
        label: item.name,
      }));
      setRegions(regionsOptions);
    }
  }, [data]);

  useEffect(() => {
    const axiosError = error as AxiosError;
    if (isError) {
      console.error(
        "Error fetching region filters:",
        axiosError.message,
        axiosError.response?.data
      );
    }
  }, [isError, error]);

  return { data, isLoading };
}
