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

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        const response = await axios.post(
          `${api.defaults.baseURL}/api/auth/token/refresh/`,
          {
            refresh: refreshToken,
          }
        );

        const { access } = response.data;

        localStorage.setItem("jwtToken", access);

        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("refreshToken");
        globalThis.location.reload();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
