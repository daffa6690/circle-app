import axios from 'axios';
import Cookies from 'js-cookie';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // Do something before request is sent
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);
