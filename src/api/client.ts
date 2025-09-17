import axios from 'axios';

// 🔹 Decide which base URL to use
const API_BASE_URL =
  // 1️⃣ Use env var if present (Render build)
  import.meta.env.VITE_API_URL
    // 2️⃣ If no env and we're in dev, keep empty string
    ?? (import.meta.env.DEV ? '' : 'https://studybuddy-backend-mc3g.onrender.com');

// 👉 If API_BASE_URL === '' in dev, axios will call relative /api/*
//    and Vite's proxy will forward it to your backend.

console.log('➡️ Axios baseURL:', API_BASE_URL);

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ---- Request interceptor ----
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ---- Response interceptor ----
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
