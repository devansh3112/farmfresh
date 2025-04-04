import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

// Use provided environment variables or fallback to demo ones
const supabaseUrl = 'https://kyyekdllfurafhaclsac.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5eWVrZGxsZnVyYWZoYWNsc2FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MDQxMDYsImV4cCI6MjA1OTI4MDEwNn0.QuOs4q4zsb76ZMbLofUi-IKd3cFGfnQGz-E5zLKkLFI';

// Create a single supabase client for the entire app with AsyncStorage
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  global: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
});

// Helper to check if we're using real Supabase or placeholder credentials
export const isUsingRealSupabase = (): boolean => {
  return true; // We're using real credentials in our example
};

// Helper to detect Supabase connection problems
export const checkSupabaseConnection = async (): Promise<boolean> => {
  try {
    const { error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
    return !error;
  } catch (e) {
    console.error('Supabase connection check failed:', e);
    return false;
  }
};

export type SupabaseUser = {
  id: string;
  email: string;
  role: 'farmer' | 'consumer';
}; 