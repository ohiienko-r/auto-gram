import { useInfiniteQuery } from "@tanstack/react-query";
import searchService from "@/services/search-service";

export default function useListingSearch(query?: string) {
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["listingsSearch", query],
      initialPageParam: 0,
      queryFn: ({ pageParam }) =>
        searchService.search({
          query,
          offset: pageParam,
          limit: 2,
        }),
      getNextPageParam: (lastPage) => {
        const { offset, limit, count } = lastPage;

        const nextOffset = offset + limit;
        return nextOffset < count ? nextOffset : undefined;
      },
    });

  return {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
