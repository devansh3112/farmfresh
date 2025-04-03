
import { createClient } from '@supabase/supabase-js';

// Use the provided environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://kyyekdllfurafhaclsac.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5eWVrZGxsZnVyYWZoYWNsc2FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MDQxMDYsImV4cCI6MjA1OTI4MDEwNn0.QuOs4q4zsb76ZMbLofUi-IKd3cFGfnQGz-E5zLKkLFI';

// Create a single supabase client for the entire app
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper to check if we're using real Supabase or placeholder credentials
export const isUsingRealSupabase = (): boolean => {
  return supabaseUrl !== 'https://placeholder-project.supabase.co';
};

export type SupabaseUser = {
  id: string;
  email: string;
  role: 'farmer' | 'consumer';
};
