
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authService } from "@/services/authService";

interface User {
  id: string;
  email: string;
  fullName?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error: string | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ success: boolean; error: string | null }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is stored in localStorage on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // For now, just check localStorage - this will be replaced with Supabase auth
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { user: authUser, error } = await authService.login(email, password);
      
      if (authUser && !error) {
        setUser(authUser);
        localStorage.setItem("user", JSON.stringify(authUser));
        return { success: true, error: null };
      }
      
      return { success: false, error: error || "Login failed" };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: "An unexpected error occurred" };
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { user: authUser, error } = await authService.signUp(email, password, fullName);
      
      if (authUser && !error) {
        // Don't set user here - typically require email verification first
        return { success: true, error: null };
      }
      
      return { success: false, error: error || "Registration failed" };
    } catch (error) {
      console.error("Sign up error:", error);
      return { success: false, error: "An unexpected error occurred" };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signUp,
    logout
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
