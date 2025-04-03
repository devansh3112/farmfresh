
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserRole } from "@/context/UserRoleContext";
import { ShoppingBag, Tractor } from "lucide-react";

const AuthScreen = () => {
  const { userRole, setUserRole } = useUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if user already has a role
    if (userRole === "farmer") {
      navigate("/dashboard");
    } else if (userRole === "consumer") {
      navigate("/marketplace");
    }
  }, [userRole, navigate]);

  const handleRoleSelect = (role: "farmer" | "consumer") => {
    setUserRole(role);
    navigate(role === "farmer" ? "/dashboard" : "/marketplace");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-200 p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-dark font-serif">FarmFresh</h1>
          <p className="text-neutral-700 mt-2">Farm-to-Consumer Marketplace</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-2 border-primary hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary-light w-16 h-16 rounded-full flex items-center justify-center text-white mb-4">
                <Tractor size={32} />
              </div>
              <CardTitle>I'm a Farmer</CardTitle>
              <CardDescription>List and sell your fresh produce directly to consumers</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="text-sm text-neutral-600 space-y-2 mb-6">
                <li>✓ List your farm products</li>
                <li>✓ Manage orders from customers</li>
                <li>✓ Track sales performance</li>
                <li>✓ Build a direct relationship with consumers</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-primary hover:bg-primary-dark" onClick={() => handleRoleSelect("farmer")}>
                Continue as Farmer
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-2 border-secondary hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto bg-secondary w-16 h-16 rounded-full flex items-center justify-center text-neutral-800 mb-4">
                <ShoppingBag size={32} />
              </div>
              <CardTitle>I'm a Consumer</CardTitle>
              <CardDescription>Shop for fresh produce directly from local farmers</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="text-sm text-neutral-600 space-y-2 mb-6">
                <li>✓ Browse fresh produce from local farms</li>
                <li>✓ Support sustainable farming</li>
                <li>✓ Know where your food comes from</li>
                <li>✓ Get farm-fresh quality at fair prices</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-secondary hover:bg-secondary-dark text-neutral-800" onClick={() => handleRoleSelect("consumer")}>
                Continue as Consumer
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
