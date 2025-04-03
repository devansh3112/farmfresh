
export interface Farmer {
  id: string;
  name: string;
  farmName: string;
  location: string;
  bio: string;
  rating: number;
  profileImage?: string;
}

export interface Product {
  id: string;
  farmerId: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  description: string;
  stock: number;
  images: string[];
  organic: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  consumerId: string;
  farmerId: string;
  items: CartItem[];
  status: 'pending' | 'accepted' | 'rejected' | 'preparing' | 'out-for-delivery' | 'delivered';
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  consumerId: string;
  farmerId: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface UserRole {
  role: 'farmer' | 'consumer';
}

