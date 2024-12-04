import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

import axiosInstance, { API_BASE_URL } from '../services/axiosinstance';


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const response = await axios.post(`${API_BASE_URL}token/`, { email, password });
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    setUser({ email });
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    window.location.href = '/';
  };

  const fetchCurrentUser = async () => {
    const response = await axiosInstance.get(`${API_BASE_URL}user/`);
    setUser(response.data);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, fetchCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);