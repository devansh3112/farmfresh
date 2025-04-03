
import { supabase } from '@/lib/supabase';
import { Order, CartItem } from '@/types';

// Check if we're using real Supabase or placeholder credentials
const isUsingRealSupabase = !supabase.supabaseUrl.includes('your-project.supabase.co');

// Mock orders for when we don't have real Supabase credentials
const mockOrders: Order[] = [
  {
    id: '1',
    consumerId: 'user1',
    farmerId: 'farm1',
    items: [
      {
        product: {
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
        quantity: 2
      }
    ],
    status: 'delivered',
    totalAmount: 5.98,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const createOrder = async (
  consumerId: string,
  items: CartItem[],
  totalAmount: number
): Promise<{ data: Order | null; error: any }> => {
  if (!isUsingRealSupabase) {
    const newOrder: Order = {
      id: `mock-${Date.now()}`,
      consumerId,
      farmerId: items[0]?.product.farmerId || 'unknown',
      items,
      status: 'pending',
      totalAmount,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    mockOrders.push(newOrder);
    return { data: newOrder, error: null };
  }

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
  if (!isUsingRealSupabase) {
    const filtered = mockOrders.filter(o => o.consumerId === consumerId);
    return { data: filtered, error: null };
  }

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('consumerId', consumerId)
    .order('createdAt', { ascending: false });

  return { data, error };
};

export const getOrdersByFarmer = async (farmerId: string): Promise<{ data: Order[] | null; error: any }> => {
  if (!isUsingRealSupabase) {
    const filtered = mockOrders.filter(o => o.farmerId === farmerId);
    return { data: filtered, error: null };
  }

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('farmerId', farmerId)
    .order('createdAt', { ascending: false });

  return { data, error };
};

export const getOrderById = async (id: string): Promise<{ data: Order | null; error: any }> => {
  if (!isUsingRealSupabase) {
    const order = mockOrders.find(o => o.id === id) || null;
    return { data: order, error: null };
  }

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
  if (!isUsingRealSupabase) {
    const orderIndex = mockOrders.findIndex(o => o.id === id);
    if (orderIndex >= 0) {
      mockOrders[orderIndex].status = status;
      mockOrders[orderIndex].updatedAt = new Date().toISOString();
      return { data: mockOrders[orderIndex], error: null };
    }
    return { data: null, error: { message: 'Order not found' } };
  }

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
