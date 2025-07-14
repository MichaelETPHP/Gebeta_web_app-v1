import axios from "axios";

const api = axios.create({
  baseURL: "https://gebeta-delivery1.onrender.com/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Automatically attach token if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Use sessionStorage if preferred
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
