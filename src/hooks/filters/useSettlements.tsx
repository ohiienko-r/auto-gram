import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import filtersService from "@/services/filters-service";

import type { AxiosError } from "axios";

export default function useSettlements(region_id?: number) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["settlements", region_id],
    queryFn: () => filtersService.getRegionSettlements(region_id!),
    enabled: !!region_id,
  });

  useEffect(() => {
    const axiosError = error as AxiosError;
    if (isError) {
      console.error(
        "Failed to get region settlements",
        axiosError.message,
        axiosError?.response?.data
      );
    }
  }, [error, isError]);

  return { data, isLoading };
}
