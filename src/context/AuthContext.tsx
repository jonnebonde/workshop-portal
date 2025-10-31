import React, { createContext, useContext, useState, useEffect } from 'react';
import { Wrench } from 'lucide-react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  loading: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  avatar: string;
  authenticationPath: string;
  strongAuthMethod: string;
  lastLogin: string;
  organizationNumber: string;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => false,
  logout: () => {},
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState<User | null>({
    id: 'demo-user',
    name: 'Erik Hansen',
    email: 'erik.hansen@autoworkshop.no',
    phone: '+4795808091',
    company: 'Hurtigruta AS',
    role: 'manager', // Set role to manager for testing
    avatar: 'https://i.pravatar.cc/150?u=erik.hansen@autoworkshop.no',
    authenticationPath: 'IRIS',
    strongAuthMethod: 'SMS',
    lastLogin: '18/08/2025 11:11:33',
    organizationNumber: '918 695 788'
  });
  const [loading, setLoading] = useState(false);

  const login = async () => {
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};