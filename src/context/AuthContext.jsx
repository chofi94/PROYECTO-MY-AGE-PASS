
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '@/api/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    validateToken();
  }, []);

  const validateToken = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        const userData = await authService.validateToken(token);
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (err) {
      localStorage.removeItem('authToken');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(email, password);
      localStorage.setItem('authToken', response.token);
      setUser(response.user);
      setIsAuthenticated(true);
      return response;
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.register(userData);
      localStorage.setItem('authToken', response.token);
      setUser(response.user);
      setIsAuthenticated(true);
      return response;
    } catch (err) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.loginWithGoogle();
      localStorage.setItem('authToken', response.token);
      setUser(response.user);
      setIsAuthenticated(true);
      return response;
    } catch (err) {
      setError(err.message || 'Google login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    register,
    loginWithGoogle,
    setError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
