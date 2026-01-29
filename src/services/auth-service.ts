import api from "@/lib/axios";

import type {
  AuthResponse,
  ProfileData,
  UpdateProfilePayload,
} from "@/types/auth-types";

export default {
  BASE_URL: "/api/auth",

  async telegramLogin(initDataRaw: string | undefined): Promise<AuthResponse> {
    const { data } = await api.post(`${this.BASE_URL}/login/`, {
      init_data: initDataRaw,
    });
    return data;
  },

  async getProfileData(): Promise<ProfileData> {
    const { data } = await api.get(`${this.BASE_URL}/me/`);
    return data;
  },

  async updateProfile(data: UpdateProfilePayload) {
    await api.patch(`${this.BASE_URL}/change_user/`, data);
  },
};
