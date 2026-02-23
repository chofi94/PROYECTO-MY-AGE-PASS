import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api'; // Cambia esto por tu URL de producción luego

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

export const login = async (email, password) => {
  const response = await api.post('/login', { email, password });
  // Laravel devuelve: { user: {...}, access_token: "..." }
  return {
    token: response.data.access_token,
    user: response.data.user
  };
};

export const register = async (userData) => {
  const response = await api.post('/register', userData);
  return {
    token: response.data.access_token,
    user: response.data.user
  };
};

export const validateToken = async (token) => {
  const response = await api.get('/user', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data; // Devuelve el objeto user
};

export const logout = async (token) => {
  return await api.post('/logout', {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};