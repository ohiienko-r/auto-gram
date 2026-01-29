import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import searchService from "@/services/search-service";

import type { AxiosError } from "axios";

export default function useListingSearch(query?: string) {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
    isError,
  } = useInfiniteQuery({
    queryKey: ["listingsSearch", query],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      searchService.search({
        query,
        offset: pageParam,
        limit: 10,
      }),
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
        axiosError?.response?.data,
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
