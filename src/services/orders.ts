
import { supabase } from '@/lib/supabase';
import { Order, CartItem } from '@/types';

export const createOrder = async (
  consumerId: string,
  items: CartItem[],
  totalAmount: number
): Promise<{ data: Order | null; error: any }> => {
  // Extract the farmerId from the first product (assuming all products are from same farmer for now)
  const farmerId = items[0]?.product.farmerId;
  
  const orderData = {
    consumerId,
    farmerId,
    items,
    status: 'pending',
    totalAmount,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const { data, error } = await supabase
    .from('orders')
    .insert([orderData])
    .select()
    .single();

  // If order creation successful, update product stock
  if (!error) {
    for (const item of items) {
      const newStock = item.product.stock - item.quantity;
      
      await supabase
        .from('products')
        .update({ stock: newStock })
        .eq('id', item.product.id);
    }
  }

  return { data, error };
};

export const getOrdersByConsumer = async (consumerId: string): Promise<{ data: Order[] | null; error: any }> => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('consumerId', consumerId)
    .order('createdAt', { ascending: false });

  return { data, error };
};

export const getOrdersByFarmer = async (farmerId: string): Promise<{ data: Order[] | null; error: any }> => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('farmerId', farmerId)
    .order('createdAt', { ascending: false });

  return { data, error };
};

export const getOrderById = async (id: string): Promise<{ data: Order | null; error: any }> => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single();

  return { data, error };
};

export const updateOrderStatus = async (
  id: string,
  status: Order['status']
): Promise<{ data: Order | null; error: any }> => {
  const { data, error } = await supabase
    .from('orders')
    .update({
      status,
      updatedAt: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  return { data, error };
};
