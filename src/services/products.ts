
import { supabase } from '@/lib/supabase';
import { Product } from '@/types';

export const getProducts = async (): Promise<{ data: Product[] | null; error: any }> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  return { data, error };
};

export const getProductsByCategory = async (category: string): Promise<{ data: Product[] | null; error: any }> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false });

  return { data, error };
};

export const getFeaturedProducts = async (): Promise<{ data: Product[] | null; error: any }> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false });

  return { data, error };
};

export const getProductById = async (id: string): Promise<{ data: Product | null; error: any }> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  return { data, error };
};

export const getProductsByFarmer = async (farmerId: string): Promise<{ data: Product[] | null; error: any }> => {
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
