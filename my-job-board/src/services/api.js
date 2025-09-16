import axios from 'axios';

const API = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? 'https://your-backend.onrender.com' 
    : 'http://127.0.0.1:5000',
});

// Attach JWT automatically if stored
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;

