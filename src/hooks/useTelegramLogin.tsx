import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/auth-store";

import authService from "@/services/auth-service";

import type { AxiosError } from "axios";

export default function useTelegramLogin(initDataRaw: string | undefined) {
  const { currentUser, setCurrentUser, auth, setAuth } = useAuthStore();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["tgLogin"],
    queryFn: () => authService.telegramLogin(initDataRaw),
    enabled: !!initDataRaw,
  });

  useEffect(() => {
    if (!currentUser && data && !auth) {
      setAuth({ tokens: data.tokens });
      setCurrentUser({ user: data.user, created: data.created });
      console.log(data);
    }
  }, [data, auth, currentUser]);

  useEffect(() => {
    if (isError) {
      console.error(
        "Failed to login",
        error.message,
        (error as AxiosError)?.response?.data
      );
    }
  }, [error, isError]);

  return { data, isLoading };
}
