import { useMutation } from "@tanstack/react-query";

import authService from "@/services/auth-service";
import { toast } from "sonner";

import type { UpdateProfilePayload } from "@/types/auth-types";

export default function useUpdateProfile(onSettled?: () => void) {
  const { mutate, isPending } = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: (data: UpdateProfilePayload) => authService.updateProfile(data),
    onSuccess: () => {
      // TODO: invalidate profile query when applicable
      toast.success("Профіль оновлено");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Виникла помилка при оновлені профілю");
    },
    onSettled: () => onSettled?.(),
  });

  return { mutate, isPending };
}
