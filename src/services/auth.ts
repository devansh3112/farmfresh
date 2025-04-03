
import { supabase } from '@/lib/supabase';
import { UserRole } from '@/types';

// Check if we're using real Supabase or placeholder credentials
const isUsingRealSupabase = !supabase.supabaseUrl.includes('your-project.supabase.co');

// Mock users for when we don't have real Supabase credentials
const mockUsers = [
  { id: 'farm1', email: 'farmer@example.com', role: 'farmer' },
  { id: 'user1', email: 'consumer@example.com', role: 'consumer' }
];

let mockCurrentUser: { id: string; email: string; role: UserRole['role'] } | null = null;

export const signUp = async (
  email: string, 
  password: string, 
  role: UserRole['role']
): Promise<{ user: any; error: any }> => {
  if (!isUsingRealSupabase) {
    // Simple mock implementation
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      return { user: null, error: { message: 'User already exists' } };
    }
    
    const newUser = { id: `mock-${Date.now()}`, email, role };
    mockUsers.push(newUser);
    mockCurrentUser = newUser;
    
    return { user: newUser, error: null };
  }

  // Register the user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return { user: null, error };
  }

  // Store the user's role in the profiles table
  if (data?.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        { 
          id: data.user.id, 
          email: data.user.email,
          role: role,
          name: '',
          phone: '',
          address: '',
          created_at: new Date()
        }
      ]);

    if (profileError) {
      console.error('Error saving user profile:', profileError);
      return { user: null, error: profileError };
    }
  }

  return { user: data?.user || null, error: null };
};

export const signIn = async (email: string, password: string): Promise<{ user: any; error: any, role: UserRole['role'] | null }> => {
  if (!isUsingRealSupabase) {
    // Simple mock implementation
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      return { user: null, error: { message: 'Invalid credentials' }, role: null };
    }
    
    mockCurrentUser = user;
    return { user, error: null, role: user.role as UserRole['role'] };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { user: null, error, role: null };
  }

  // Get the user's role from the profiles table
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', data.user.id)
    .single();

  if (profileError) {
    console.error('Error fetching user profile:', profileError);
    return { user: data.user, error: null, role: null };
  }

  return { 
    user: data.user, 
    error: null,
    role: profileData?.role as UserRole['role'] || null
  };
};

export const signOut = async (): Promise<{ error: any }> => {
  if (!isUsingRealSupabase) {
    mockCurrentUser = null;
    return { error: null };
  }

  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async (): Promise<{ user: any; error: any, role: UserRole['role'] | null }> => {
  if (!isUsingRealSupabase) {
    if (!mockCurrentUser) {
      return { user: null, error: null, role: null };
    }
    return { user: mockCurrentUser, error: null, role: mockCurrentUser.role };
  }

  const { data, error } = await supabase.auth.getUser();
  
  if (error || !data?.user) {
    return { user: null, error, role: null };
  }
  
  // Get the user's role from the profiles table
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', data.user.id)
    .single();

  if (profileError) {
    console.error('Error fetching user profile:', profileError);
    return { user: data.user, error: null, role: null };
  }

  return { 
    user: data.user, 
    error: null,
    role: profileData?.role as UserRole['role'] || null
  };
};

export const updateUserProfile = async (
  userId: string,
  profileData: {
    name?: string;
    phone?: string;
    address?: string;
  }
): Promise<{ data: any; error: any }> => {
  if (!isUsingRealSupabase) {
    // In a real implementation, you would update the user profile here
    return { data: { ...profileData, id: userId }, error: null };
  }

  const { data, error } = await supabase
    .from('profiles')
    .update(profileData)
    .eq('id', userId)
    .select();

  return { data, error };
};
