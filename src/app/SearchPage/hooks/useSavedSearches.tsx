import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import savedSearchService from "@/services/saved-search-service";
import { toast } from "sonner";

export default function useSavedSearches() {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["savedSearches"],
    queryFn: () => savedSearchService.getSavedSearches(),
  });

  useEffect(() => {
    if (isError) {
      console.error(error);
      toast.error("Не вдалося завантажити збережені пошуки");
    }
  }, [error, isError]);

  return { data, isLoading, error, isError };
}
