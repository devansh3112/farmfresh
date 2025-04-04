import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define user role types
type UserRole = 'farmer' | 'consumer' | undefined;

// Context type
type UserRoleContextType = {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  toggleUserRole: () => void;
};

// Create context with default values
const UserRoleContext = createContext<UserRoleContextType>({
  userRole: undefined,
  setUserRole: () => {},
  toggleUserRole: () => {},
});

// Provider Props type
interface UserRoleProviderProps {
  children: ReactNode;
}

// Provider component
export const UserRoleProvider = ({ children }: UserRoleProviderProps) => {
  // Start with undefined and check storage on mount
  const [userRole, setUserRole] = useState<UserRole>('consumer');
  
  // Check for stored role on component mount
  useEffect(() => {
    const loadUserRole = async () => {
      try {
        const storedRole = await AsyncStorage.getItem('userRole');
        if (storedRole === 'farmer' || storedRole === 'consumer') {
          setUserRole(storedRole as UserRole);
        }
      } catch (error) {
        console.error('Error reading user role from storage:', error);
      }
    };
    
    loadUserRole();
  }, []);

  // Function to toggle between roles (useful for testing)
  const toggleUserRole = async () => {
    const newRole = userRole === 'farmer' ? 'consumer' : 'farmer';
    setUserRole(newRole);
    // Also update AsyncStorage
    try {
      await AsyncStorage.setItem('userRole', newRole);
    } catch (error) {
      console.error('Error saving user role to storage:', error);
    }
  };

  return (
    <UserRoleContext.Provider value={{ userRole, setUserRole, toggleUserRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};

// Custom hook to use user role context
export const useUserRole = () => useContext(UserRoleContext); 