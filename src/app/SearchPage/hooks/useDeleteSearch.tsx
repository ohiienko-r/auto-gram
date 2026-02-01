import { useMutation, useQueryClient } from "@tanstack/react-query";

import savedSearchService from "@/services/saved-search-service";
import { toast } from "sonner";

export default function useDeleteSavedSearch() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["deleteSavedSearch"],
    mutationFn: (searchId: number) =>
      savedSearchService.deleteSavedSearch(searchId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["savedSearches"] });
      toast.success("Пошук успішно видлено");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Помилка при видленні пошуку");
    },
  });

  return { mutate, isPending };
}
