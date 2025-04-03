
import { createContext, useContext, useState, ReactNode } from "react";
import { UserRole } from "@/types";

interface UserRoleContextType {
  userRole: UserRole["role"] | null;
  setUserRole: (role: UserRole["role"]) => void;
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);

export const UserRoleProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<UserRole["role"] | null>(
    localStorage.getItem("userRole") as UserRole["role"] | null
  );

  const handleSetUserRole = (role: UserRole["role"]) => {
    setUserRole(role);
    localStorage.setItem("userRole", role);
  };

  return (
    <UserRoleContext.Provider value={{ userRole, setUserRole: handleSetUserRole }}>
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
