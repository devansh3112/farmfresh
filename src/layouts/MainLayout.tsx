
import { ReactNode } from "react";
import { useUserRole } from "@/context/UserRoleContext";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Home, Package, BarChart3, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { userRole } = useUserRole();
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Navigation links based on user role
  const navLinks = userRole === "farmer" 
    ? [
        { name: "Dashboard", path: "/dashboard", icon: <Home className="mr-2" /> },
        { name: "Products", path: "/products", icon: <Package className="mr-2" /> },
        { name: "Orders", path: "/manage-orders", icon: <ShoppingCart className="mr-2" /> },
        { name: "Analytics", path: "/analytics", icon: <BarChart3 className="mr-2" /> },
        { name: "Profile", path: "/profile", icon: <User className="mr-2" /> },
      ]
    : [
        { name: "Marketplace", path: "/marketplace", icon: <Home className="mr-2" /> },
        { name: "My Orders", path: "/orders", icon: <Package className="mr-2" /> },
        { name: "Profile", path: "/profile", icon: <User className="mr-2" /> },
      ];

  return (
    <div className="min-h-screen bg-neutral-200">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-primary-dark text-white px-4 py-3 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to={userRole === "farmer" ? "/dashboard" : "/marketplace"} className="flex items-center">
            <span className="text-xl font-bold font-serif">FarmFresh</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className="flex items-center px-3 py-2 rounded-md hover:bg-primary-light transition-colors"
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            
            {userRole === "consumer" && (
              <Link to="/cart" className="relative">
                <Button variant="ghost" className="text-white">
                  <ShoppingCart />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-secondary rounded-full w-5 h-5 flex items-center justify-center text-xs text-primary-dark font-bold">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            className="md:hidden text-white" 
            onClick={toggleMenu}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </header>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden absolute z-20 top-16 left-0 right-0 bg-primary-dark text-white shadow-lg">
          <div className="container mx-auto py-2">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className="flex items-center px-4 py-3 hover:bg-primary-light" 
                onClick={() => setMenuOpen(false)}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            
            {userRole === "consumer" && (
              <Link 
                to="/cart" 
                className="flex items-center px-4 py-3 hover:bg-primary-light" 
                onClick={() => setMenuOpen(false)}
              >
                <ShoppingCart className="mr-2" />
                Cart {totalItems > 0 && `(${totalItems})`}
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto p-4 pb-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary-dark text-white py-6 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-4">
            <p className="text-xl font-bold font-serif">FarmFresh</p>
            <p className="text-sm">Farm-to-Consumer Marketplace</p>
          </div>
          <p className="text-xs">&copy; {new Date().getFullYear()} FarmFresh. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
