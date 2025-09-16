import axios from 'axios';

// Use Vercel environment variable if available, otherwise fallback to local
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000',
});

// Attach JWT automatically if stored
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;


