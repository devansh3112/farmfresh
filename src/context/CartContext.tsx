
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { CartItem, Product } from "@/types";
import { useUserRole } from "@/context/UserRoleContext";
import { useToast } from "@/hooks/use-toast";

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { userRole, userId } = useUserRole();
  const { toast } = useToast();

  // Load cart from localStorage on initial render
  useEffect(() => {
    if (userId) {
      const cartKey = `cart-${userId}`;
      const savedCart = localStorage.getItem(cartKey);
      if (savedCart) {
        try {
          setItems(JSON.parse(savedCart));
        } catch (error) {
          console.error("Failed to parse cart from localStorage:", error);
        }
      }
    }
  }, [userId]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (userId) {
      const cartKey = `cart-${userId}`;
      localStorage.setItem(cartKey, JSON.stringify(items));
    }
  }, [items, userId]);

  const addToCart = (product: Product, quantity: number) => {
    if (!userId) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to add items to your cart",
        variant: "destructive",
      });
      return;
    }

    if (userRole !== "consumer") {
      toast({
        title: "Action not allowed",
        description: "Only consumers can add items to cart",
        variant: "destructive",
      });
      return;
    }

    if (quantity <= 0) {
      return;
    }

    if (product.stock < quantity) {
      toast({
        title: "Not enough stock",
        description: `Only ${product.stock} units available`,
        variant: "destructive",
      });
      return;
    }

    setItems((prevItems) => {
      // Check if item is already in cart
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedItems = [...prevItems];
        const newQuantity = updatedItems[existingItemIndex].quantity + quantity;
        
        if (newQuantity > product.stock) {
          toast({
            title: "Not enough stock",
            description: `Cannot add more than available stock (${product.stock})`,
            variant: "destructive",
          });
          return prevItems;
        }

        updatedItems[existingItemIndex].quantity = newQuantity;
        return updatedItems;
      } else {
        // Add new item if it doesn't exist
        return [...prevItems, { product, quantity }];
      }
    });

    toast({
      title: "Added to cart",
      description: `${quantity} ${product.name} added to your cart`,
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prevItems) => 
      prevItems.filter((item) => item.product.id !== productId)
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems((prevItems) => {
      const item = prevItems.find(item => item.product.id === productId);
      if (item && quantity > item.product.stock) {
        toast({
          title: "Not enough stock",
          description: `Cannot add more than available stock (${item.product.stock})`,
          variant: "destructive",
        });
        
        return prevItems.map((item) =>
          item.product.id === productId 
            ? { ...item, quantity: item.product.stock } 
            : item
        );
      }

      return prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  const totalPrice = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
