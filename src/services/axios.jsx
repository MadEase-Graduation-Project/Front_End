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
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: DEFAULT_TIMEOUT,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // eslint-disable-next-line no-undef
    if (process.env.NODE_ENV !== "production") {
      console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        // Unauthorized - could handle token refresh or logout here
        console.error("Authentication error. Please login again.");
      } else if (status === 403) {
        // Forbidden
        console.error("You don't have permission to access this resource.");
      } else if (status === 404) {
        // Not found
        console.error("The requested resource was not found.");
      } else if (status === 500) {
        // Server error
        console.error("Internal server error. Please try again later.");
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error("Network error. Please check your connection.");
    } else {
      console.error("Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
