
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { UserRole } from "@/types";
import { getCurrentUser, signOut } from "@/services/auth";
import { useNavigate } from "react-router-dom";

interface UserRoleContextType {
  userRole: UserRole["role"] | null;
  setUserRole: (role: UserRole["role"]) => void;
  userId: string | null;
  userEmail: string | null;
  isLoading: boolean;
  logout: () => Promise<void>;
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);

export const UserRoleProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<UserRole["role"] | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserFromSupabase = async () => {
      setIsLoading(true);
      
      try {
        const { user, role } = await getCurrentUser();
        
        if (user && role) {
          setUserId(user.id);
          setUserEmail(user.email);
          setUserRole(role);
          localStorage.setItem("userRole", role);
        } else {
          // Check local storage as fallback
          const savedRole = localStorage.getItem("userRole") as UserRole["role"] | null;
          if (savedRole) {
            setUserRole(savedRole);
          }
        }
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserFromSupabase();
  }, []);

  const handleSetUserRole = (role: UserRole["role"]) => {
    setUserRole(role);
    localStorage.setItem("userRole", role);
  };

  const logout = async () => {
    const { error } = await signOut();
    if (!error) {
      setUserRole(null);
      setUserId(null);
      setUserEmail(null);
      localStorage.removeItem("userRole");
    } else {
      console.error("Error logging out:", error);
    }
  };

  return (
    <UserRoleContext.Provider 
      value={{ 
        userRole, 
        setUserRole: handleSetUserRole, 
        userId, 
        userEmail, 
        isLoading, 
        logout 
      }}
    >
      {children}
    </UserRoleContext.Provider>
  );
};

export const useUserRole = (): UserRoleContextType => {
  const context = useContext(UserRoleContext);
  if (context === undefined) {
    throw new Error("useUserRole must be used within a UserRoleProvider");
  }
  return context;
};
