export interface AuthResponse {
  created: boolean;
  user: {
    id: number;
    telegram_id: number;
    username: string;
  };
  tokens: {
    access: string;
    refresh: string;
  };
}

export interface UpdateProfilePayload {
  first_name?: string;
  phone_number?: string;
}
