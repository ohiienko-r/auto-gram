import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ?? "https://7tt5472n-8000.euw.devtunnels.ms",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwtToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
