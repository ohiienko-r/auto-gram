import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import filtersService from "@/services/filters-service";

import type { AxiosError } from "axios";

export default function useModels(brand_id?: number) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["models", brand_id],
    queryFn: () => filtersService.getBrandModels(brand_id!),
    enabled: !!brand_id,
  });

  useEffect(() => {
    const axiosError = error as AxiosError;
    if (isError) {
      console.error(
        "Failed to get brand models",
        axiosError.message,
        axiosError?.response?.data
      );
    }
  }, [error, isError]);

  return { data, isLoading };
}
