import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const DEFAULT_HOD_USER = {
  id: "user_hod",
  name: "Dr. K. S. Sharma",
  title: "Head of Department (CSE)",
  role: "Head of Department",
  shortRole: "HoD",
  department: "Computer Science & Engineering (CSE)",
  email: "hod.cse@institution.edu",
  avatar: "/assets/hod_portrait.jpg",
  clearance: "Level 4 — Executive Departmental Authority",
  clearanceLevel: 4,
  scope: "department"
};

export const DEFAULT_DEAN_USER = {
  id: "user_dean",
  name: "Dr. Eleanor Vance",
  title: "Dean of Academic Affairs",
  role: "Dean",
  shortRole: "Dean",
  department: "Institutional Academic Affairs",
  email: "dean.academics@institution.edu",
  avatar: "/assets/dean_portrait.jpg",
  clearance: "Level 5 — Institutional Senate Authority",
  clearanceLevel: 5,
  scope: "institution"
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('aura_auth_user');
    return saved ? JSON.parse(saved) : DEFAULT_HOD_USER;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    localStorage.setItem('aura_auth_user', JSON.stringify(user));
  }, [user]);

  const login = async (roleKey = 'hod', email = '') => {
    try {
      const res = await api.login({ role: roleKey, email });
      if (res.user) {
        setUser(res.user);
        setIsAuthenticated(true);
        return res.user;
      }
    } catch (err) {
      console.warn('Login API fallback:', err);
      const isDean = roleKey.toLowerCase().includes('dean');
      const selected = isDean ? DEFAULT_DEAN_USER : DEFAULT_HOD_USER;
      setUser(selected);
      setIsAuthenticated(true);
      return selected;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const switchRole = (roleKey) => {
    return login(roleKey);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
