
import { Farmer, Product, Order, Review } from "@/types";

// Mock Farmers
export const farmers: Farmer[] = [
  {
    id: "f1",
    name: "John Smith",
    farmName: "Green Valley Farm",
    location: "Springfield, IL",
    bio: "Third-generation farmer specializing in organic vegetables.",
    rating: 4.8,
    profileImage: "https://images.unsplash.com/photo-1593672715438-d88a59564d98?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "f2",
    name: "Maria Rodriguez",
    farmName: "Sunshine Orchards",
    location: "Riverside, CA",
    bio: "Family-owned orchard with a focus on sustainable farming practices.",
    rating: 4.6,
    profileImage: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "f3",
    name: "Robert Johnson",
    farmName: "Heritage Acres",
    location: "Lancaster, PA",
    bio: "Traditional farming with modern sustainable techniques.",
    rating: 4.7,
    profileImage: "https://images.unsplash.com/photo-1571512599940-9db5fe7287c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  },
];

// Mock Products
export const products: Product[] = [
  {
    id: "p1",
    farmerId: "f1",
    name: "Organic Carrots",
    category: "Vegetables",
    price: 3.99,
    unit: "bunch",
    description: "Fresh organic carrots harvested this week. Perfect for salads and juicing.",
    stock: 50,
    images: ["https://images.unsplash.com/photo-1447175008436-054170c2e979?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"],
    organic: true,
    featured: true,
  },
  {
    id: "p2",
    farmerId: "f1",
    name: "Red Tomatoes",
    category: "Vegetables",
    price: 4.50,
    unit: "lb",
    description: "Vine-ripened tomatoes, perfect for salads and sandwiches.",
    stock: 30,
    images: ["https://images.unsplash.com/photo-1607305387299-a3d9611cd469?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"],
    organic: true,
  },
  {
    id: "p3",
    farmerId: "f2",
    name: "Fresh Spinach",
    category: "Leafy Greens",
    price: 3.25,
    unit: "bunch",
    description: "Tender spinach leaves, washed and ready to use.",
    stock: 25,
    images: ["https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"],
    organic: true,
    featured: true,
  },
  {
    id: "p4",
    farmerId: "f2",
    name: "Green Bell Peppers",
    category: "Vegetables",
    price: 2.99,
    unit: "lb",
    description: "Crisp green bell peppers, great for stir-fries and salads.",
    stock: 40,
    images: ["https://images.unsplash.com/photo-1594282486552-05a4a0f6d0b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"],
    organic: false,
  },
  {
    id: "p5",
    farmerId: "f3",
    name: "Organic Potatoes",
    category: "Root Vegetables",
    price: 5.99,
    unit: "5 lb bag",
    description: "Versatile organic potatoes, perfect for roasting, mashing, or frying.",
    stock: 35,
    images: ["https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"],
    organic: true,
  },
  {
    id: "p6",
    farmerId: "f3",
    name: "Fresh Cucumbers",
    category: "Vegetables",
    price: 2.75,
    unit: "each",
    description: "Crisp cucumbers, perfect for salads and sandwiches.",
    stock: 45,
    images: ["https://images.unsplash.com/photo-1604977042946-1eecc30f269e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"],
    organic: false,
    featured: true,
  },
  {
    id: "p7",
    farmerId: "f1",
    name: "Yellow Onions",
    category: "Vegetables",
    price: 1.99,
    unit: "lb",
    description: "Versatile yellow onions for cooking.",
    stock: 60,
    images: ["https://images.unsplash.com/photo-1587735243615-c03f25aaff15?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"],
    organic: false,
  },
  {
    id: "p8",
    farmerId: "f2",
    name: "Organic Kale",
    category: "Leafy Greens",
    price: 4.25,
    unit: "bunch",
    description: "Nutrient-rich kale, perfect for salads and smoothies.",
    stock: 20,
    images: ["https://images.unsplash.com/photo-1515543904379-3d757afe93e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"],
    organic: true,
  },
];

// Mock Orders
export const orders: Order[] = [
  {
    id: "o1",
    consumerId: "c1",
    farmerId: "f1",
    items: [
      { product: products[0], quantity: 2 },
      { product: products[1], quantity: 1 },
    ],
    status: "delivered",
    totalAmount: 12.48,
    createdAt: "2023-03-15T10:30:00Z",
    updatedAt: "2023-03-16T14:20:00Z",
  },
  {
    id: "o2",
    consumerId: "c2",
    farmerId: "f2",
    items: [
      { product: products[2], quantity: 1 },
      { product: products[3], quantity: 2 },
    ],
    status: "out-for-delivery",
    totalAmount: 9.23,
    createdAt: "2023-03-16T15:45:00Z",
    updatedAt: "2023-03-17T09:10:00Z",
  },
];

// Mock Reviews
export const reviews: Review[] = [
  {
    id: "r1",
    consumerId: "c1",
    farmerId: "f1",
    productId: "p1",
    rating: 5,
    comment: "The carrots were incredibly fresh and sweet. Will definitely buy again!",
    createdAt: "2023-03-20T08:15:00Z",
  },
  {
    id: "r2",
    consumerId: "c2",
    farmerId: "f2",
    productId: "p3",
    rating: 4,
    comment: "Fresh spinach, but some leaves were a bit wilted.",
    createdAt: "2023-03-21T11:30:00Z",
  },
];

// Get products by category
export const getProductsByCategory = (category: string): Product[] => {
  if (category === "All") {
    return products;
  }
  return products.filter(product => product.category === category);
};

// Get products by farmer
export const getProductsByFarmer = (farmerId: string): Product[] => {
  return products.filter(product => product.farmerId === farmerId);
};

// Get featured products
export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

// Get farmer by ID
export const getFarmerById = (farmerId: string): Farmer | undefined => {
  return farmers.find(farmer => farmer.id === farmerId);
};

// Get product by ID
export const getProductById = (productId: string): Product | undefined => {
  return products.find(product => product.id === productId);
};

// Get orders by consumer
export const getOrdersByConsumer = (consumerId: string): Order[] => {
  return orders.filter(order => order.consumerId === consumerId);
};

// Get orders by farmer
export const getOrdersByFarmer = (farmerId: string): Order[] => {
  return orders.filter(order => order.farmerId === farmerId);
};
