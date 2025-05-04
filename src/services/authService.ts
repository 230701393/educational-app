
// This file will be updated with actual Supabase integration once connected
// For now, it provides a mock implementation that will be replaced

interface User {
  id: string;
  email: string;
  fullName?: string;
}

interface AuthResponse {
  user: User | null;
  error: string | null;
}

// Mock authentication service - will be replaced with Supabase auth
export const authService = {
  // Login with email and password
  async login(email: string, password: string): Promise<AuthResponse> {
    // This will be replaced with actual Supabase auth
    console.log('Login attempt:', { email });
    
    // Mock successful login
    if (email && password) {
      return {
        user: { 
          id: 'mock-user-id',
          email: email,
          fullName: 'Mock User',
        },
        error: null,
      };
    }

    return { user: null, error: 'Invalid credentials' };
  },

  // Sign up with email and password
  async signUp(email: string, password: string, fullName: string): Promise<AuthResponse> {
    // This will be replaced with actual Supabase auth
    console.log('Sign up attempt:', { email, fullName });
    
    // Mock successful signup
    if (email && password && fullName) {
      return {
        user: { 
          id: 'new-user-id',
          email: email,
          fullName: fullName,
        },
        error: null,
      };
    }

    return { user: null, error: 'Registration failed' };
  },

  // Request password reset
  async forgotPassword(email: string): Promise<{ success: boolean; error: string | null }> {
    // This will be replaced with actual Supabase auth
    console.log('Password reset request for:', email);
    
    // Mock successful password reset request
    if (email) {
      return { success: true, error: null };
    }

    return { success: false, error: 'Failed to send reset email' };
  },

  // Log out current user
  async logout(): Promise<void> {
    // This will be replaced with actual Supabase auth
    console.log('User logged out');
  }
};
