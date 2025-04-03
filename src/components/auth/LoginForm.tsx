
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { signIn } from "@/services/auth";
import { useUserRole } from "@/context/UserRoleContext";
import { isUsingRealSupabase } from "@/lib/supabase";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setUserRole } = useUserRole();
  const isDemoMode = !isUsingRealSupabase();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In demo mode, any password works but we still need a valid email
      const { user, error, role } = await signIn(email, password);
      
      if (error) {
        console.log("Login error:", error);
        toast({
          title: "Login failed",
          description: error.message || "Invalid email or password",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      if (user && role) {
        setUserRole(role);
        toast({
          title: "Login successful",
          description: `Welcome back${user.email ? `, ${user.email}` : ''}!`,
        });
        navigate(role === "farmer" ? "/dashboard" : "/marketplace");
      } else {
        toast({
          title: "Login incomplete",
          description: "Your account exists but role information is missing. Please contact support.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFillCredentials = (type: 'farmer' | 'consumer') => {
    if (type === 'farmer') {
      setEmail('farmer@gmail.com');
      setPassword('farm');
    } else {
      setEmail('consumer@gmail.com');
      setPassword('farm');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
        />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="password">Password</Label>
          <a href="#" className="text-xs text-primary hover:underline">
            Forgot password?
          </a>
        </div>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />
      </div>
      
      {isDemoMode ? (
        <div className="space-y-2 pt-2">
          <div className="text-xs text-gray-500 mb-1">Quick login with demo accounts:</div>
          <div className="flex gap-2">
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              className="text-xs flex-1"
              onClick={() => handleFillCredentials('farmer')}
            >
              Farmer Demo
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              className="text-xs flex-1"
              onClick={() => handleFillCredentials('consumer')}
            >
              Consumer Demo
            </Button>
          </div>
        </div>
      ) : null}
      
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}
