import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('ecotrack_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (username: string, password: string, role: 'user' | 'admin'): boolean => {
    // Mock authentication - in production, this would verify against a database
    if (role === 'admin' && username === 'admin' && password === 'admin123') {
      const adminUser: User = {
        id: 'admin-1',
        username: 'Admin',
        email: 'admin@ecotrack.com',
        role: 'admin',
        points: 0,
        createdAt: new Date().toISOString(),
        level: 1,
        badges: [],
        streak: 0,
        totalCO2Saved: 0
      };
      setUser(adminUser);
      localStorage.setItem('ecotrack_user', JSON.stringify(adminUser));
      return true;
    } else if (role === 'user' && username && password) {
      // Check if user exists
      const users = JSON.parse(localStorage.getItem('ecotrack_users') || '[]');
      let existingUser = users.find((u: User) => u.username === username);

      if (!existingUser) {
        // Create new user
        existingUser = {
          id: `user-${Date.now()}`,
          username,
          email: `${username}@ecotrack.com`,
          role: 'user',
          points: 0,
          createdAt: new Date().toISOString(),
          level: 1,
          badges: [],
          streak: 0,
          totalCO2Saved: 0
        };
        users.push(existingUser);
        localStorage.setItem('ecotrack_users', JSON.stringify(users));
      }

      setUser(existingUser);
      localStorage.setItem('ecotrack_user', JSON.stringify(existingUser));
      return true;
    }
    return false;
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('ecotrack_user', JSON.stringify(updatedUser));

    // Update in users list
    const users = JSON.parse(localStorage.getItem('ecotrack_users') || '[]');
    const updatedUsers = users.map((u: User) =>
      u.id === user.id ? updatedUser : u
    );
    localStorage.setItem('ecotrack_users', JSON.stringify(updatedUsers));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ecotrack_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
