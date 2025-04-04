import React, { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// User interface
interface User {
  id: string;
  name: string;
  email: string;
}

// Auth context type
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => false,
  signup: async () => false,
  logout: async () => {},
});

// Sample user for demo
const sampleUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
};

// Sample users with roles for demo
const farmerUser: User = {
  id: '1',
  name: 'Farmer John',
  email: 'farmer@example.com',
};

const consumerUser: User = {
  id: '2',
  name: 'Consumer Sarah',
  email: 'consumer@example.com',
};

// Provider Props
interface AuthProviderProps {
  children: ReactNode;
}

// Provider Component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // This is a mock implementation
    // In a real app, you would validate credentials with an API
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, check if email contains "farmer" or "consumer"
      if (email && password) {
        if (email.toLowerCase().includes('farmer')) {
          setUser(farmerUser);
          // Store the role for UserRoleContext to use
          await AsyncStorage.setItem('userRole', 'farmer');
        } else {
          setUser(consumerUser);
          // Store the role for UserRoleContext to use
          await AsyncStorage.setItem('userRole', 'consumer');
        }
        
        setIsAuthenticated(true);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // Signup function
  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    // This is a mock implementation
    // In a real app, you would create a new user via an API
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any non-empty credentials
      if (name && email && password) {
        const newUser: User = {
          id: '1',
          name,
          email,
        };
        
        setUser(newUser);
        setIsAuthenticated(true);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    // In a real app, you would call a logout API
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext); 