import axios from "axios";
import { getToken } from "../utils/token";

const config = {
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
};

export const api = axios.create(config);

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
