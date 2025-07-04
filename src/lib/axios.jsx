import axios from "axios";

/**
 * Axios instance configuration
 * Central configuration for API requests
 */

// API base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Default timeout in milliseconds
const DEFAULT_TIMEOUT = 10000;

// Create axios instance with configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: DEFAULT_TIMEOUT,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    if (import.meta.env.MODE !== "production") {
      console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue = [];

function processQueue(error) {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve()));
  failedQueue = [];
}

function isAuthEndpoint(url = "") {
  return (
    url.endsWith("/login") ||
    url.endsWith("/register") ||
    url.endsWith("/resetpass")
  );
}

// Response interceptor
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const { response, config } = err;
    const code = response?.status;

    if (isAuthEndpoint(config.url)) return Promise.reject(err);

    if ((code === 401 || code === 403) && !config._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) =>
          failedQueue.push({ resolve, reject })
        ).then(() => api(config));
      }

      config._retry = true;
      isRefreshing = true;

      try {
        await api.post("/users/refresh");
        processQueue(null);
        return api(config);
      } catch (e) {
        processQueue(e);
        window.location.href = "/login";
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    if (code === 404) console.error("Resource not found");
    if (code === 500) console.error("Server error");
    if (!response) console.error("Network error");

    return Promise.reject(err);
  }
);

export default api;
