import { supabase, isUsingRealSupabase } from '@/lib/supabase';
import { Product } from '@/types';

// Mock data for when we don't have real Supabase credentials
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Carrots',
    description: 'Fresh locally grown organic carrots',
    price: 2.99,
    unit: 'bunch',
    stock: 50,
    category: 'Root Vegetables',
    farmerId: 'farm1',
    organic: true,
    featured: true,
    images: ['/placeholder.svg'],
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Spinach',
    description: 'Fresh leafy spinach',
    price: 3.49,
    unit: 'bag',
    stock: 30,
    category: 'Leafy Greens',
    farmerId: 'farm1',
    organic: true,
    featured: false,
    images: ['/placeholder.svg'],
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Tomatoes',
    description: 'Vine-ripened tomatoes',
    price: 4.99,
    unit: 'lb',
    stock: 45,
    category: 'Vegetables',
    farmerId: 'farm2',
    organic: false,
    featured: true,
    images: ['/placeholder.svg'],
    created_at: new Date().toISOString()
  }
];

export const getProducts = async (): Promise<{ data: Product[] | null; error: any }> => {
  if (!isUsingRealSupabase()) {
    return { data: mockProducts, error: null };
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  return { data, error };
};

export const getProductsByCategory = async (category: string): Promise<{ data: Product[] | null; error: any }> => {
  if (!isUsingRealSupabase()) {
    const filtered = mockProducts.filter(p => p.category === category);
    return { data: filtered, error: null };
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false });

  return { data, error };
};

export const getFeaturedProducts = async (): Promise<{ data: Product[] | null; error: any }> => {
  if (!isUsingRealSupabase()) {
    const featured = mockProducts.filter(p => p.featured);
    return { data: featured, error: null };
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false });

  return { data, error };
};

export const getProductById = async (id: string): Promise<{ data: Product | null; error: any }> => {
  if (!isUsingRealSupabase()) {
    const product = mockProducts.find(p => p.id === id) || null;
    return { data: product, error: null };
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  return { data, error };
};

export const getProductsByFarmer = async (farmerId: string): Promise<{ data: Product[] | null; error: any }> => {
  if (!isUsingRealSupabase()) {
    const filtered = mockProducts.filter(p => p.farmerId === farmerId);
    return { data: filtered, error: null };
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('farmerId', farmerId)
    .order('created_at', { ascending: false });

  return { data, error };
};

export const createProduct = async (product: Omit<Product, 'id'>): Promise<{ data: Product | null; error: any }> => {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()
    .single();

  return { data, error };
};

export const updateProduct = async (id: string, updates: Partial<Product>): Promise<{ data: Product | null; error: any }> => {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  return { data, error };
};

export const deleteProduct = async (id: string): Promise<{ error: any }> => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  return { error };
};
