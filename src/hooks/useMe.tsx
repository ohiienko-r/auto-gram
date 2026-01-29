import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import authService from "@/services/auth-service";

import type { AxiosError } from "axios";

export default function useMe() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["me"],
    queryFn: () => authService.getProfileData(),
  });

  useEffect(() => {
    if (isError) {
      const axiosError = error as AxiosError;

      console.error(
        "Error fetching profile data:",
        axiosError?.message,
        axiosError?.response?.data,
      );
    }
  }, [isError, error]);

  return {
    data,
    isLoading,
  };
}
