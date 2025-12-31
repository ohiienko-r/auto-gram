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
