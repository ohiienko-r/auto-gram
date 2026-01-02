import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import listingService from "@/services/listing-service";

import type { AxiosError } from "axios";

export default function useFavorites() {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
    isError,
  } = useInfiniteQuery({
    queryKey: ["favorites"],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      listingService.getFavorites({ offset: pageParam, limit: 2 }),
    getNextPageParam: (lastPage) => {
      const { offset, limit, count } = lastPage;

      const nextOffset = offset + limit;
      return nextOffset < count ? nextOffset : undefined;
    },
  });

  useEffect(() => {
    if (isError) {
      const axiosError = error as AxiosError;
      console.error(
        "Error fetching search results:",
        axiosError?.message,
        axiosError?.response?.data
      );
    }
  }, [isError, error]);

  return {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
