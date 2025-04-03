
import { createClient } from '@supabase/supabase-js';

// Use environment variables for Supabase credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Check if we're in development and missing real credentials
if (supabaseUrl === 'https://your-project.supabase.co' || supabaseAnonKey === 'your-anon-key') {
  console.warn('⚠️ Using placeholder Supabase credentials. For proper functionality, please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
}

// Create a single supabase client for the entire app
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper to check if we're using real Supabase or placeholder credentials
export const isUsingRealSupabase = (): boolean => {
  return supabaseUrl !== 'https://your-project.supabase.co' && supabaseAnonKey !== 'your-anon-key';
};

export type SupabaseUser = {
  id: string;
  email: string;
  role: 'farmer' | 'consumer' | null;
};
