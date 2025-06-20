import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { User, Nunny, Client } from '../types';

interface AuthContextType {
  user: User | null;
  supabaseUser: SupabaseUser | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: Partial<Nunny | Client>, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
  sendVerificationEmail: (email: string) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (updates: Partial<User>) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setSupabaseUser(session.user);
        await fetchUserProfile(session.user.id);
      }
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setSupabaseUser(session.user);
        await fetchUserProfile(session.user.id);
      } else {
        setSupabaseUser(null);
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      if (profile) {
        const userData: User = {
          id: profile.id,
          email: profile.email,
          firstName: profile.first_name,
          lastName: profile.last_name,
          gender: profile.gender,
          idNumber: profile.id_number,
          region: profile.region,
          county: profile.county,
          profilePicture: profile.profile_picture_url,
          idImage: profile.id_image_url,
          isVerified: profile.is_verified,
          createdAt: new Date(profile.created_at),
          rating: profile.rating,
          reviewCount: profile.review_count,
          ...(profile.user_type === 'nunny' ? {
            type: 'nunny' as const,
            phoneNumber: profile.phone_number || '',
            services: profile.services || [],
            ageRange: profile.age_range || ''
          } : {
            type: 'client' as const,
            serviceDescription: profile.service_description || '',
            dailyRate: profile.daily_rate || 0
          })
        };
        setUser(userData);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const register = async (userData: Partial<Nunny | Client>, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Register user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email!,
        password: password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (authError) {
        return { success: false, error: authError.message };
      }

      if (!authData.user) {
        return { success: false, error: 'Registration failed' };
      }

      // Create profile in database
      const profileData = {
        user_id: authData.user.id,
        email: userData.email!,
        first_name: userData.firstName!,
        last_name: userData.lastName!,
        gender: userData.gender!,
        id_number: userData.idNumber!,
        region: userData.region!,
        county: userData.county!,
        profile_picture_url: userData.profilePicture,
        id_image_url: userData.idImage,
        user_type: userData.type!,
        ...(userData.type === 'nunny' ? {
          phone_number: (userData as Partial<Nunny>).phoneNumber,
          services: (userData as Partial<Nunny>).services,
          age_range: (userData as Partial<Nunny>).ageRange
        } : {
          service_description: (userData as Partial<Client>).serviceDescription,
          daily_rate: (userData as Partial<Client>).dailyRate
        })
      };

      const { error: profileError } = await supabase
        .from('profiles')
        .insert([profileData]);

      if (profileError) {
        console.error('Profile creation error:', profileError);
        return { success: false, error: 'Failed to create profile' };
      }

      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const logout = async (): Promise<void> => {
    await supabase.auth.signOut();
  };

  const sendVerificationEmail = async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Send verification email error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const resetPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Password reset error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const updateProfile = async (updates: Partial<User>): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!user) {
        return { success: false, error: 'No user logged in' };
      }

      const profileUpdates: any = {
        first_name: updates.firstName,
        last_name: updates.lastName,
        gender: updates.gender,
        region: updates.region,
        county: updates.county,
        profile_picture_url: updates.profilePicture,
        updated_at: new Date().toISOString()
      };

      // Add type-specific fields
      if (user.type === 'nunny' && 'services' in updates) {
        profileUpdates.services = (updates as Partial<Nunny>).services;
        profileUpdates.phone_number = (updates as Partial<Nunny>).phoneNumber;
        profileUpdates.age_range = (updates as Partial<Nunny>).ageRange;
      } else if (user.type === 'client' && 'serviceDescription' in updates) {
        profileUpdates.service_description = (updates as Partial<Client>).serviceDescription;
        profileUpdates.daily_rate = (updates as Partial<Client>).dailyRate;
      }

      const { error } = await supabase
        .from('profiles')
        .update(profileUpdates)
        .eq('id', user.id);

      if (error) {
        return { success: false, error: error.message };
      }

      // Refresh user profile
      await fetchUserProfile(user.id);
      return { success: true };
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const value: AuthContextType = {
    user,
    supabaseUser,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    loading,
    sendVerificationEmail,
    resetPassword,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};