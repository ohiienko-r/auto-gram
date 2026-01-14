import { useMutation, useQueryClient } from "@tanstack/react-query";

import listingService from "@/services/listing-service";

import type { AxiosError } from "axios";

import type { InfiniteData } from "@tanstack/react-query";
import type { PaginatedResponse, CarListing } from "@/types/app";

export default function useToggleListingLike() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["toggleListingLike"],
    mutationFn: (id: number) => listingService.toggleListingLike(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["listingsSearch"] });
      await queryClient.cancelQueries({ queryKey: ["listingDetails", id] });
      await queryClient.cancelQueries({ queryKey: ["favorites"] });

      const previousSearchData = queryClient.getQueryData(["listingsSearch"]);
      const previousDetailsData = queryClient.getQueryData([
        "listingDetails",
        id,
      ]);
      const previousFavoritesData = queryClient.getQueryData(["favorites"]);

      queryClient.setQueriesData<InfiniteData<PaginatedResponse<CarListing>>>(
        { queryKey: ["listingsSearch"] },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              results: page.results.map((car) =>
                car.id === id ? { ...car, is_liked: !car.is_liked } : car
              ),
            })),
          };
        }
      );

      queryClient.setQueryData<CarListing>(["listingDetails", id], (old) => {
        if (!old) return old;
        return { ...old, is_liked: !old.is_liked };
      });

      queryClient.setQueryData<InfiniteData<PaginatedResponse<CarListing>>>(
        ["favorites"],
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              results: page.results.filter((car) => {
                if (car.id === id && car.is_liked) return false;
                return true;
              }),
              count: page.results.some((c) => c.id === id)
                ? page.count - 1
                : page.count,
            })),
          };
        }
      );

      return {
        previousSearchData,
        previousDetailsData,
        previousFavoritesData,
        id,
      };
    },

    onError: (error: AxiosError, _id, context) => {
      if (context?.previousSearchData) {
        queryClient.setQueriesData(
          { queryKey: ["listingsSearch"] },
          context.previousSearchData
        );
      }
      if (context?.previousDetailsData) {
        queryClient.setQueryData(
          ["listingDetails", context.id],
          context.previousDetailsData
        );
      }
      if (context?.previousFavoritesData) {
        queryClient.setQueryData(["favorites"], context.previousFavoritesData);
      }
      console.error("Failed to toggle like:", error.message);
    },

    onSettled: (_data, _error, listingId) => {
      queryClient.invalidateQueries({ queryKey: ["listingsSearch"] });
      queryClient.invalidateQueries({
        queryKey: ["listingDetails", listingId],
      });
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  return { mutate, isPending };
}
