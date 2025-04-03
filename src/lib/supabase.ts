
import { createClient } from '@supabase/supabase-js';

// Use environment variables for Supabase credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL and Anon Key must be provided!');
}

// Create a single supabase client for the entire app
export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

export type SupabaseUser = {
  id: string;
  email: string;
  role: 'farmer' | 'consumer' | null;
};

