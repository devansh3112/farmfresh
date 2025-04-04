-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  image TEXT,
  category TEXT NOT NULL,
  farmer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  stock INTEGER NOT NULL DEFAULT 0,
  unit TEXT NOT NULL DEFAULT 'piece',
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  farmer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  items JSONB NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  total NUMERIC NOT NULL,
  customer_info JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Policies for products table
CREATE POLICY "Anyone can view products"
  ON public.products
  FOR SELECT
  USING (true);

CREATE POLICY "Farmers can create their own products"
  ON public.products
  FOR INSERT
  WITH CHECK (auth.uid() = farmer_id AND EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'farmer'
  ));

CREATE POLICY "Farmers can update their own products"
  ON public.products
  FOR UPDATE
  USING (auth.uid() = farmer_id AND EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'farmer'
  ));

CREATE POLICY "Farmers can delete their own products"
  ON public.products
  FOR DELETE
  USING (auth.uid() = farmer_id AND EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'farmer'
  ));

-- Policies for orders table
CREATE POLICY "Consumers can view their own orders"
  ON public.orders
  FOR SELECT
  USING (auth.uid() = user_id AND EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'consumer'
  ));

CREATE POLICY "Farmers can view orders for their products"
  ON public.orders
  FOR SELECT
  USING (auth.uid() = farmer_id AND EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'farmer'
  ));

CREATE POLICY "Consumers can create orders"
  ON public.orders
  FOR INSERT
  WITH CHECK (auth.uid() = user_id AND EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'consumer'
  ));

CREATE POLICY "Farmers can update orders for their products"
  ON public.orders
  FOR UPDATE
  USING (auth.uid() = farmer_id AND EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'farmer'
  ));

-- Indexes for faster lookups
CREATE INDEX IF NOT EXISTS products_farmer_id_idx ON public.products (farmer_id);
CREATE INDEX IF NOT EXISTS products_category_idx ON public.products (category);
CREATE INDEX IF NOT EXISTS products_featured_idx ON public.products (featured);
CREATE INDEX IF NOT EXISTS orders_user_id_idx ON public.orders (user_id);
CREATE INDEX IF NOT EXISTS orders_farmer_id_idx ON public.orders (farmer_id);
CREATE INDEX IF NOT EXISTS orders_status_idx ON public.orders (status); 