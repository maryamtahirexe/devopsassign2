import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://107.21.157.243:5000/api',
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});


API.interceptors.request.use((config) => {
  return config;
});


