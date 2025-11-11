import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api",
  withCredentials: true,
});

// Add response interceptor to suppress 401 errors in console (expected when not logged in)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 is expected when user is not logged in - don't log to console
    if (error.response?.status === 401) {
      // Silently handle 401 - it's expected behavior
      return Promise.reject(error);
    }
    // Log other errors
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);
