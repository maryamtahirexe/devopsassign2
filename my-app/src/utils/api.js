import axios from 'axios';

export const API = axios.create({
  baseURL:  'http://54.159.57.46:5000/',
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});


API.interceptors.request.use((config) => {
  return config;
});


