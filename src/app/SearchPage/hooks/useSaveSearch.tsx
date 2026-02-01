import { useMutation, useQueryClient } from "@tanstack/react-query";

import savedSearchService from "@/services/saved-search-service";
import { toast } from "sonner";

import type { SaveSearchPayload } from "@/types/search";
import type { AxiosError } from "axios";

export default function useSaveSearch() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["saveSearch"],
    mutationFn: (data: SaveSearchPayload) =>
      savedSearchService.createSavedSearch(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["savedSearches"] });
      toast.success("Пошук успішно збережено");
    },
    onError: (error: AxiosError) => {
      console.error(error);
      toast.error("Помилка при збереженні пошуку");
    },
  });

  return { mutate, isPending };
}
