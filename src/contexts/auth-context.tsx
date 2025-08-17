"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export enum UserRole {
  ADMIN = 'ADMIN',
  DANISMAN = 'DANISMAN',
  MUSTERI = 'MUSTERI'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isActive: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (permission: string) => boolean;
  canAccessProperty: (propertyUserId: string) => boolean;
  canAccessCustomer: (customerUserId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Kullanıcı yetkilerini kontrol et
  const hasPermission = (permission: string): boolean => {
    if (!user) return false;

    // Admin tüm yetkilere sahip
    if (user.role === UserRole.ADMIN) return true;

    // Danışman yetkileri
    if (user.role === UserRole.DANISMAN) {
      const danismanPermissions = [
        'dashboard:read',
        'properties:read',
        'properties:write',
        'customers:read',
        'customers:write',
        'financial:read',
        'documents:read',
        'documents:write',
        'media:read',
        'media:write',
        'calendar:read',
        'calendar:write',
        'notifications:read',
        'profile:read',
        'profile:write'
      ];
      return danismanPermissions.includes(permission);
    }

    // Müşteri yetkileri (sınırlı)
    if (user.role === UserRole.MUSTERI) {
      const musteriPermissions = [
        'profile:read',
        'profile:write',
        'notifications:read'
      ];
      return musteriPermissions.includes(permission);
    }

    return false;
  };

  // Emlak erişim kontrolü
  const canAccessProperty = (propertyUserId: string): boolean => {
    if (!user) return false;
    if (user.role === UserRole.ADMIN) return true;
    return user.id === propertyUserId;
  };

  // Müşteri erişim kontrolü
  const canAccessCustomer = (customerUserId: string): boolean => {
    if (!user) return false;
    if (user.role === UserRole.ADMIN) return true;
    return user.id === customerUserId;
  };

  // Giriş fonksiyonu
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData.user);
        localStorage.setItem('user', JSON.stringify(userData.user));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // Çıkış fonksiyonu
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Sayfa yüklendiğinde kullanıcı durumunu kontrol et
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
    hasPermission,
    canAccessProperty,
    canAccessCustomer,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
