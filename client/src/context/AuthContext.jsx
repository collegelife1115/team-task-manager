import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const res = await api.get('/auth/me');
      setUser(res.data.data);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setError(null);
    try {
      const res = await api.post('/auth/login', { email, password });
      setUser(res.data.user);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
      throw err;
    }
  };

  const signup = async (userData) => {
    setError(null);
    try {
      const res = await api.post('/auth/signup', userData);
      setUser(res.data.user);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
      throw err;
    }
  };

  const logout = async () => {
    try {
      await api.get('/auth/logout');
      setUser(null);
    } catch (err) {
      console.error('Logout error', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, signup, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
