import axios from 'axios';

const api = axios.create({
  baseURL: 'https://social-media-analyzer-u575.onrender.com/api',
});

// ✅ ADD THIS INTERCEPTOR (VERY IMPORTANT)
api.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default api;