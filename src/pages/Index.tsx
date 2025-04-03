
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserRole } from "@/context/UserRoleContext";

const Index = () => {
  const { userRole } = useUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect based on user role
    if (userRole === "farmer") {
      navigate("/dashboard");
    } else if (userRole === "consumer") {
      navigate("/marketplace");
    } else {
      // If no role is set, go to auth screen
      navigate("/");
    }
  }, [userRole, navigate]);

  // Show loading while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-200">
      <p className="text-lg text-neutral-600">Redirecting...</p>
    </div>
  );
};

export default Index;
