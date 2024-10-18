import globalRouter from "@/globalRouter";
import { store } from "@/redux/store";
import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "https://api.escuelajs.co/api/v1",
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  function (config) {
    const tokens = store.getState().auth.tokens;
    if (tokens?.access_token !== undefined) {
      config.headers.Authorization = `Bearer ${tokens.access_token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
axiosInstance.interceptors.response.use(
  function (response) {
    return response; // Si la respuesta es exitosa, simplemente la retornas.
  },
  function (error) {
    if (
      error.response &&
      error.response.status === 401 &&
      globalRouter.navigate
    ) {
      globalRouter.navigate("/");
    }
    return Promise.reject(error);
  },
);
