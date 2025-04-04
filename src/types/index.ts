export type UserRole = {
  role: 'farmer' | 'consumer';
};

export type Profile = {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  role: UserRole['role'];
  created_at?: string;
  updated_at?: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  farmer_id: string;
  stock: number;
  unit: string;
  featured?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type Order = {
  id: string;
  userId: string;
  farmerId: string;
  items: OrderItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
  };
  createdAt: string;
  updatedAt?: string;
};

export type OrderItem = {
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  unit?: string;
};

export type OrderCreate = {
  userId: string;
  farmerId: string;
  items: OrderItem[];
  status: Order['status'];
  total: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
  };
}; 