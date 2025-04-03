import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useUserRole } from "@/context/UserRoleContext";
import { ShoppingBag, Tractor } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { isUsingRealSupabase } from "@/lib/supabase";

const AuthScreen = () => {
  const { userRole, isLoading } = useUserRole();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<"farmer" | "consumer" | null>(null);
  const [authMode, setAuthMode] = useState<"role-select" | "login" | "signup">("role-select");
  const isDemoMode = !isUsingRealSupabase();

  useEffect(() => {
    // Redirect if user already has a role and is authenticated
    if (!isLoading && userRole) {
      navigate(userRole === "farmer" ? "/dashboard" : "/marketplace");
    }
  }, [userRole, navigate, isLoading]);

  const handleRoleSelect = (role: "farmer" | "consumer") => {
    setSelectedRole(role);
    setAuthMode("login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-200">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-200 p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-dark font-serif">FarmFresh</h1>
          <p className="text-neutral-700 mt-2">Farm-to-Consumer Marketplace</p>
        </div>

        {isDemoMode ? (
          <Alert className="mb-6 border-yellow-500 bg-yellow-50">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertTitle className="text-yellow-800">Demo Mode Active</AlertTitle>
            <AlertDescription className="text-yellow-700">
              The app is running with mock data. For a full experience with a real database, please connect to Supabase.
              <br />
              <strong>Demo accounts:</strong>
              <ul className="list-disc ml-5 mt-1">
                <li>Farmer: farmer@gmail.com (any password)</li>
                <li>Consumer: consumer@gmail.com (any password)</li>
              </ul>
              Or sign up with any email to create a new demo account.
            </AlertDescription>
          </Alert>
        ) : (
          <Alert className="mb-6 border-green-500 bg-green-50">
            <AlertCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Connected to Supabase</AlertTitle>
            <AlertDescription className="text-green-700">
              Your app is connected to a real Supabase backend.
              <br />
              <strong>Test accounts:</strong>
              <ul className="list-disc ml-5 mt-1">
                <li>Farmer: farmer@gmail.com (password: farm)</li>
                <li>Consumer: consumer@gmail.com (password: farm)</li>
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {authMode === "role-select" && (
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
        )}

        {authMode !== "role-select" && selectedRole && (
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <div 
                className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                  selectedRole === "farmer" 
                    ? "bg-primary-light text-white" 
                    : "bg-secondary text-neutral-800"
                }`}
              >
                {selectedRole === "farmer" ? <Tractor size={32} /> : <ShoppingBag size={32} />}
              </div>
              <CardTitle>
                {selectedRole === "farmer" ? "Farmer" : "Consumer"} Account
              </CardTitle>
              <CardDescription>
                {authMode === "login" 
                  ? "Sign in to your account" 
                  : "Create a new account"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs 
                defaultValue={authMode} 
                value={authMode}
                onValueChange={(value) => setAuthMode(value as "login" | "signup")}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <LoginForm />
                </TabsContent>
                <TabsContent value="signup">
                  <SignupForm role={selectedRole} />
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button 
                variant="ghost" 
                onClick={() => setAuthMode("role-select")}
                className="text-sm text-neutral-600"
              >
                Choose a different role
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AuthScreen;
