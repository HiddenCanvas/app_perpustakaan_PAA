import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');

      if (
        savedUser &&
        savedUser !== 'undefined' &&
        savedUser !== 'null'
      ) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('Error parsing user:', error);
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const payload = {
      email: email.trim(),
      username: email.trim(),
      password,
    };

    const response = await api.post('/auth/login', payload);

    console.log('LOGIN RESPONSE:', response.data);

    const accessToken =
      response.data?.accessToken ||
      response.data?.token ||
      response.data?.data?.accessToken ||
      response.data?.data?.token;

    const userData =
      response.data?.user ||
      response.data?.data?.user ||
      response.data?.data;

    if (!accessToken) {
      throw new Error('Token tidak ditemukan');
    }

    if (!userData) {
      throw new Error('User data tidak ditemukan');
    }

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(userData));

    setUser(userData);

    return userData;
  };

  const register = async (userData) => {
    return await api.post('/auth/register', userData);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);