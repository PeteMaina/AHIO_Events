import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Inactivity timeout (1 hour = 3600000 ms)
  const INACTIVITY_TIMEOUT = 3600000;
  let inactivityTimer;

  // Mock user data for demo
  const mockUsers = [
    { id: 1, email: 'user@example.com', password: 'password', name: 'John Doe', role: 'attendee' },
    { id: 2, email: 'admin@example.com', password: 'admin', name: 'Admin User', role: 'admin' },
    { id: 3, email: 'organizer@example.com', password: 'organizer', name: 'Event Organizer', role: 'organizer' }
  ];

  // Reset inactivity timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer) clearTimeout(inactivityTimer);
    if (isAuthenticated) {
      inactivityTimer = setTimeout(() => {
        logout();
      }, INACTIVITY_TIMEOUT);
    }
  }, [isAuthenticated]);

  // Activity event listeners
  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    const handleActivity = () => resetInactivityTimer();

    if (isAuthenticated) {
      events.forEach(event => document.addEventListener(event, handleActivity));
      resetInactivityTimer();
    }

    return () => {
      events.forEach(event => document.removeEventListener(event, handleActivity));
      if (inactivityTimer) clearTimeout(inactivityTimer);
    };
  }, [isAuthenticated, resetInactivityTimer]);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedUser && storedAuth === 'true') {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock authentication - replace with real API call
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const userData = { id: foundUser.id, email: foundUser.email, name: foundUser.name, role: foundUser.role };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isAuthenticated', 'true');
      resetInactivityTimer();
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const signup = async (name, email, password) => {
    // Mock signup - replace with real API call
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      return { success: false, error: 'User already exists' };
    }
    const newUser = { id: mockUsers.length + 1, email, password, name, role: 'attendee' };
    mockUsers.push(newUser);
    const userData = { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role };
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isAuthenticated', 'true');
    resetInactivityTimer();
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    if (inactivityTimer) clearTimeout(inactivityTimer);
    navigate('/login');
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    signup,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
