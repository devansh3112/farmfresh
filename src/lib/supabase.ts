
import { createClient } from '@supabase/supabase-js';

// Use environment variables for Supabase credentials or fallback to demo mode
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

// Create a single supabase client for the entire app
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper to check if we're using real Supabase or placeholder credentials
export const isUsingRealSupabase = (): boolean => {
  const usingDemo = supabaseUrl === 'https://placeholder-project.supabase.co' || 
                   supabaseAnonKey === 'placeholder-anon-key';
                   
  if (usingDemo) {
    console.warn("⚠️ Running in demo mode with mock data. To connect to a real Supabase backend, please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.");
  }
  
  return !usingDemo;
};

export type SupabaseUser = {
  id: string;
  email: string;
  role: 'farmer' | 'consumer' | null;
};
