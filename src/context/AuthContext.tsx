
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authService, User } from "@/services/authService";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();

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
        toast({
          title: "Login successful",
          description: `Welcome back, ${authUser.fullName}!`,
        });
        return { success: true, error: null };
      }
      
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error || "Invalid credentials",
      });
      return { success: false, error: error || "Login failed" };
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
      const { user: authUser, error } = await authService.signUp(email, password, fullName);
      
      if (authUser && !error) {
        toast({
          title: "Registration successful",
          description: "Your account has been created. You can now log in.",
        });
        return { success: true, error: null };
      }
      
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error || "Registration failed",
      });
      return { success: false, error: error || "Registration failed" };
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
    try {
      const { user: newUser, error } = await authService.addUser(email, fullName, role, organization);
      
      if (newUser && !error) {
        toast({
          title: "User added successfully",
          description: `${fullName} (${email}) has been added as a ${role}.`,
        });
        return { success: true, error: null };
      }
      
      toast({
        variant: "destructive",
        title: "Failed to add user",
        description: error || "Failed to add user",
      });
      return { success: false, error: error || "Failed to add user" };
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
      await authService.logout();
      setUser(null);
      localStorage.removeItem("user");
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
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
