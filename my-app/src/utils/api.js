import axios from 'axios';

export const API = axios.create({
  baseURL:  'http://backend:5000/' || 'http://localhost:5000/',
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});


API.interceptors.request.use((config) => {
  return config;
});


