
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { UserRole } from "@/types";
import { getCurrentUser, signOut } from "@/services/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

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
  const navigate = useNavigate();

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
          console.log("User authenticated:", user.email, "with role:", role);
        } else {
          // Check local storage as fallback
          const savedRole = localStorage.getItem("userRole") as UserRole["role"] | null;
          if (savedRole) {
            setUserRole(savedRole);
          }
        }
      } catch (error) {
        console.error("Error loading user:", error);
        toast({
          title: "Authentication Error",
          description: "There was a problem authenticating your session. Please try logging in again.",
          variant: "destructive",
        });
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
    try {
      const { error } = await signOut();
      if (!error) {
        setUserRole(null);
        setUserId(null);
        setUserEmail(null);
        localStorage.removeItem("userRole");
        navigate("/");
        toast({
          title: "Logged out successfully",
          description: "You have been logged out of your account.",
        });
      } else {
        console.error("Error logging out:", error);
        toast({
          title: "Logout error",
          description: error.message || "Failed to log out. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Unexpected error during logout:", error);
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
