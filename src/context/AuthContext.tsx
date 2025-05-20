import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { useNavigate } from "react-router-dom";

export interface User {
  id: string;
  email: string;
  fullName?: string;
  role: 'admin' | 'publisher' | 'sme' | 'learner';
  organization?: string;
  avatar_url?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  isPublisher: boolean;
  isSME: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error: string | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ success: boolean; error: string | null }>;
  logout: () => Promise<void>;
  addUser: (email: string, fullName: string, role: 'admin' | 'publisher' | 'sme' | 'learner', organization?: string) => Promise<{ success: boolean; error: string | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        if (session?.user) {
          // Don't fetch profile here directly to avoid Supabase deadlock
          // Instead use setTimeout
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        } else {
          setUser(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        setIsLoading(false);
        return;
      }

      if (profile) {
        const userData: User = {
          id: userId,
          email: session?.user?.email || '',
          fullName: profile.full_name,
          role: profile.role as 'admin' | 'publisher' | 'sme' | 'learner',
          organization: profile.organization,
          avatar_url: profile.avatar_url
        };
        setUser(userData);
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: error.message || "Invalid credentials",
        });
        return { success: false, error: error.message };
      }
      
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      return { success: true, error: null };
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Login error",
        description: "An unexpected error occurred",
      });
      return { success: false, error: "An unexpected error occurred" };
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: 'learner'
          }
        }
      });
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: error.message || "Registration failed",
        });
        return { success: false, error: error.message };
      }
      
      toast({
        title: "Registration successful",
        description: "Please check your email to verify your account.",
      });
      return { success: true, error: null };
    } catch (error) {
      console.error("Sign up error:", error);
      toast({
        variant: "destructive",
        title: "Registration error",
        description: "An unexpected error occurred",
      });
      return { success: false, error: "An unexpected error occurred" };
    }
  };

  const addUser = async (email: string, fullName: string, role: 'admin' | 'publisher' | 'sme' | 'learner', organization?: string) => {
    if (!isAdmin) {
      toast({
        variant: "destructive",
        title: "Permission denied",
        description: "Only administrators can add users",
      });
      return { success: false, error: "Permission denied" };
    }

    try {
      // Generate a random password - in a real implementation, you'd send an email
      const tempPassword = Math.random().toString(36).slice(-8);
      
      const { data, error } = await supabase.auth.admin.createUser({
        email,
        password: tempPassword,
        email_confirm: true,
        user_metadata: {
          full_name: fullName,
          role,
          organization
        }
      });
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Failed to add user",
          description: error.message || "Failed to add user",
        });
        return { success: false, error: error.message };
      }
      
      toast({
        title: "User added successfully",
        description: `${fullName} (${email}) has been added as a ${role}.`,
      });
      return { success: true, error: null };
    } catch (error) {
      console.error("Add user error:", error);
      toast({
        variant: "destructive",
        title: "Error adding user",
        description: "An unexpected error occurred",
      });
      return { success: false, error: "An unexpected error occurred" };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
      // After logout, redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        variant: "destructive",
        title: "Logout error",
        description: "An error occurred during logout",
      });
    }
  };

  const isAdmin = user?.role === 'admin';
  const isPublisher = user?.role === 'publisher';
  const isSME = user?.role === 'sme';

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    isAdmin,
    isPublisher,
    isSME,
    login,
    signUp,
    logout,
    addUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
