import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://54.227.97.217:5000',
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});


API.interceptors.request.use((config) => {
  return config;
});


