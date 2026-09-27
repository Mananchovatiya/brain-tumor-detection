import axios from "axios";

// Central axios instance so every API call uses the same base URL and headers.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

const SERVER_ROOT = (import.meta.env.VITE_API_URL || "http://localhost:5001/api").replace(
  "/api",
  ""
);

export const getAssetUrl = (path) => {
  if (!path) return "";
  return `${SERVER_ROOT}${path}`;
};