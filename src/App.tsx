
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { UserRoleProvider } from "@/context/UserRoleContext";
import { CartProvider } from "@/context/CartContext";

// Layouts
import MainLayout from "@/layouts/MainLayout";

// Auth screens
import AuthScreen from "@/pages/Auth";

// Consumer screens
import MarketplaceScreen from "@/pages/consumer/Marketplace";
import ProductDetailScreen from "@/pages/consumer/ProductDetail";
import CartScreen from "@/pages/consumer/Cart";
import OrdersScreen from "@/pages/consumer/Orders";
import ProfileScreen from "@/pages/consumer/Profile";

// Farmer screens
import DashboardScreen from "@/pages/farmer/Dashboard";
import ProductManagementScreen from "@/pages/farmer/ProductManagement";
import OrderManagementScreen from "@/pages/farmer/OrderManagement";
import AnalyticsScreen from "@/pages/farmer/Analytics";

// Shared screens
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <UserRoleProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<AuthScreen />} />
                
                {/* Consumer Routes */}
                <Route path="/marketplace" element={<MainLayout><MarketplaceScreen /></MainLayout>} />
                <Route path="/product/:id" element={<MainLayout><ProductDetailScreen /></MainLayout>} />
                <Route path="/cart" element={<MainLayout><CartScreen /></MainLayout>} />
                <Route path="/orders" element={<MainLayout><OrdersScreen /></MainLayout>} />
                <Route path="/profile" element={<MainLayout><ProfileScreen /></MainLayout>} />
                
                {/* Farmer Routes */}
                <Route path="/dashboard" element={<MainLayout><DashboardScreen /></MainLayout>} />
                <Route path="/products" element={<MainLayout><ProductManagementScreen /></MainLayout>} />
                <Route path="/manage-orders" element={<MainLayout><OrderManagementScreen /></MainLayout>} />
                <Route path="/analytics" element={<MainLayout><AnalyticsScreen /></MainLayout>} />
                
                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </UserRoleProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
