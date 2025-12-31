import api from "@/lib/axios";

import type { AuthResponse } from "@/types/auth-types";

export default {
  BASE_URL: "/api/auth",

  async telegramLogin(initDataRaw: string | undefined): Promise<AuthResponse> {
    const { data } = await api.post(`${this.BASE_URL}/login/`, {
      init_data: initDataRaw,
    });
    return data;
  },
};
