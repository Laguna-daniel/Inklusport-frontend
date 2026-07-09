import axios from 'axios';

// Configura la URL base apuntando al puerto de tu API GATEWAY (ej: 8080)
const API = axios.create({
  baseURL: 'http://localhost:8080/api/v1', 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para inyectar automáticamente el JWT en cada petición
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
