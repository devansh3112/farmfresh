
import { supabase, isUsingRealSupabase } from '@/lib/supabase';
import { UserRole } from '@/types';

// Mock users for when we don't have real Supabase credentials
const mockUsers = [
  { id: 'farm1', email: 'farmer@gmail.com', role: 'farmer' as const },
  { id: 'user1', email: 'consumer@gmail.com', role: 'consumer' as const }
];

let mockCurrentUser: { id: string; email: string; role: UserRole['role'] } | null = null;

export const signUp = async (
  email: string, 
  password: string, 
  role: UserRole['role']
): Promise<{ user: any; error: any }> => {
  if (!isUsingRealSupabase()) {
    // Simple mock implementation
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      return { user: null, error: { message: 'User already exists' } };
    }
    
    const newUser = { id: `mock-${Date.now()}`, email, role };
    mockUsers.push(newUser);
    mockCurrentUser = newUser;
    
    // Store in localStorage for persistence across refreshes
    localStorage.setItem('mockUser', JSON.stringify(newUser));
    
    return { user: newUser, error: null };
  }

  // Register the user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error("Error during signup:", error);
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
          created_at: new Date().toISOString()
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
  if (!isUsingRealSupabase()) {
    // Simple mock implementation
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      return { user: null, error: { message: 'Invalid credentials' }, role: null };
    }
    
    mockCurrentUser = user;
    // Store in localStorage for persistence across refreshes
    localStorage.setItem('mockUser', JSON.stringify(user));
    
    return { user, error: null, role: user.role };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Sign in error:", error);
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
      
      // Check if it's a not found error, which means we need to create a profile
      if (profileError.code === 'PGRST116') {
        // Attempt to determine role from email for demo purposes
        // In a real app, you'd have a proper profile setup flow
        const role = email.includes('farmer') ? 'farmer' as const : 'consumer' as const;
        
        // Create a default profile
        const { error: insertError } = await supabase
          .from('profiles')
          .insert([{
            id: data.user.id,
            email: data.user.email,
            role: role,
            name: '',
            phone: '',
            address: '',
            created_at: new Date().toISOString()
          }]);
        
        if (insertError) {
          console.error('Error creating user profile:', insertError);
          return { user: data.user, error: null, role: null };
        }
        
        return { user: data.user, error: null, role };
      }
      
      return { user: data.user, error: null, role: null };
    }

    return { 
      user: data.user, 
      error: null,
      role: profileData?.role as UserRole['role'] || null
    };
  } catch (error) {
    console.error("Unexpected error during sign in:", error);
    return { user: null, error, role: null };
  }
};

export const signOut = async (): Promise<{ error: any }> => {
  if (!isUsingRealSupabase()) {
    mockCurrentUser = null;
    // Clear from localStorage
    localStorage.removeItem('mockUser');
    return { error: null };
  }

  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (error) {
    console.error("Error during sign out:", error);
    return { error };
  }
};

export const getCurrentUser = async (): Promise<{ user: any; error: any, role: UserRole['role'] | null }> => {
  if (!isUsingRealSupabase()) {
    // Try to get user from memory first
    if (mockCurrentUser) {
      return { user: mockCurrentUser, error: null, role: mockCurrentUser.role };
    }
    
    // If not in memory, try localStorage
    const storedUser = localStorage.getItem('mockUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      mockCurrentUser = user;
      return { user, error: null, role: user.role };
    }
    
    return { user: null, error: null, role: null };
  }

  try {
    const { data, error } = await supabase.auth.getUser();
    
    if (error || !data?.user) {
      return { user: null, error, role: null };
    }
    
    console.log("Current authenticated user:", data.user.email);
    
    // Get the user's role from the profiles table
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single();

    if (profileError) {
      console.error('Error fetching user profile:', profileError);
      
      // If profile doesn't exist, try to create a default one
      if (profileError.code === 'PGRST116') {
        // For demo, determine role from email pattern
        const role = data.user.email?.includes('farmer') 
          ? 'farmer' as const 
          : 'consumer' as const;
        
        // Create a default profile
        await supabase
          .from('profiles')
          .insert([{
            id: data.user.id,
            email: data.user.email,
            role: role,
            name: '',
            phone: '',
            address: '',
            created_at: new Date().toISOString()
          }]);
        
        return { user: data.user, error: null, role };
      }
      
      return { user: data.user, error: null, role: null };
    }

    return { 
      user: data.user, 
      error: null,
      role: profileData?.role as UserRole['role'] || null
    };
  } catch (error) {
    console.error("Unexpected error getting current user:", error);
    return { user: null, error, role: null };
  }
};

export const updateUserProfile = async (
  userId: string,
  profileData: {
    name?: string;
    phone?: string;
    address?: string;
  }
): Promise<{ data: any; error: any }> => {
  if (!isUsingRealSupabase()) {
    // In a real implementation, you would update the user profile here
    return { data: { ...profileData, id: userId }, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', userId)
      .select();

    return { data, error };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { data: null, error };
  }
};
