import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://18.234.111.248:5000',
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});


API.interceptors.request.use((config) => {
  return config;
});


