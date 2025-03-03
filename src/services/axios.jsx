import axios from "axios";

const api = axios.create({
  baseURL: "https://medease-server.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

api.interceptors.request.use(
  (config) => {
    console.log("Request sent", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
