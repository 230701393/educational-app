
// Enhanced authentication service with user role management

interface User {
  id: string;
  email: string;
  fullName?: string;
  role: 'admin' | 'publisher' | 'sme' | 'learner';
  organization?: string;
}

interface AuthResponse {
  user: User | null;
  error: string | null;
}

// Mock database - will be replaced with actual Supabase database
const mockUsers: User[] = [
  {
    id: 'admin-id-1',
    email: 'admin@example.com',
    fullName: 'Admin User',
    role: 'admin',
    organization: 'Rajalakshmi Engineering College'
  },
  {
    id: 'learner-id-1',
    email: 'student@example.com',
    fullName: 'Student User',
    role: 'learner',
    organization: 'Rajalakshmi Engineering College'
  }
];

// For mock password resets
interface PasswordResetRequest {
  email: string;
  token: string;
  createdAt: Date;
}

// Mock store for password reset requests
const passwordResetRequests: PasswordResetRequest[] = [];

export const authService = {
  // Login with email and password
  async login(email: string, password: string): Promise<AuthResponse> {
    console.log('Login attempt:', { email });
    
    // Mock login - find user by email
    const user = mockUsers.find(user => user.email === email);
    
    if (user && password) {
      return {
        user,
        error: null,
      };
    }

    return { user: null, error: 'Invalid credentials' };
  },

  // Sign up with email and password
  async signUp(email: string, password: string, fullName: string, role: 'admin' | 'publisher' | 'sme' | 'learner' = 'learner', organization?: string): Promise<AuthResponse> {
    console.log('Sign up attempt:', { email, fullName, role, organization });
    
    // Check if user already exists
    const existingUser = mockUsers.find(user => user.email === email);
    if (existingUser) {
      return { user: null, error: 'User with this email already exists' };
    }
    
    // Mock successful signup
    if (email && password && fullName) {
      const newUser: User = { 
        id: `user-${Date.now()}`,
        email,
        fullName,
        role,
        organization
      };
      
      // In a real implementation, we would save to database
      mockUsers.push(newUser);
      
      return {
        user: newUser,
        error: null,
      };
    }

    return { user: null, error: 'Registration failed' };
  },

  // Admin function to add a new user
  async addUser(email: string, fullName: string, role: 'admin' | 'publisher' | 'sme' | 'learner', organization?: string): Promise<AuthResponse> {
    // Generate a temporary password (in a real system, would send email)
    const tempPassword = 'temp' + Math.floor(Math.random() * 10000);
    return this.signUp(email, tempPassword, fullName, role, organization);
  },

  // Admin function to import users from CSV/Excel
  async importUsers(userData: Array<{email: string, fullName: string, role: 'admin' | 'publisher' | 'sme' | 'learner', organization?: string}>): Promise<{success: number, failed: number, errors: string[]}> {
    let success = 0;
    let failed = 0;
    const errors: string[] = [];
    
    for (const user of userData) {
      const result = await this.addUser(user.email, user.fullName, user.role, user.organization);
      if (result.error) {
        failed++;
        errors.push(`${user.email}: ${result.error}`);
      } else {
        success++;
      }
    }
    
    return { success, failed, errors };
  },

  // Request password reset
  async forgotPassword(email: string): Promise<{ success: boolean; error: string | null }> {
    console.log('Password reset request for:', email);
    
    // Check if user exists
    const user = mockUsers.find(user => user.email === email);
    if (!user) {
      return { success: false, error: 'No user found with this email' };
    }
    
    // Generate reset token
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    // In a real app, we'd store this token with the user and set an expiration
    // Here we'll just store it in our mock array
    passwordResetRequests.push({
      email,
      token,
      createdAt: new Date()
    });
    
    // In a real app, this would send an actual email with a reset link
    // Here we just log it
    console.log(`Reset link for ${email}: https://yourapp.com/reset-password?token=${token}`);
    
    return { success: true, error: null };
  },

  // Verify reset token
  async verifyResetToken(token: string): Promise<{ valid: boolean; email: string | null }> {
    // Find the token in our reset requests
    const resetRequest = passwordResetRequests.find(r => r.token === token);
    
    if (!resetRequest) {
      return { valid: false, email: null };
    }
    
    // Check if token is expired (24 hours)
    const now = new Date();
    const expirationTime = new Date(resetRequest.createdAt);
    expirationTime.setHours(expirationTime.getHours() + 24);
    
    if (now > expirationTime) {
      return { valid: false, email: null };
    }
    
    return { valid: true, email: resetRequest.email };
  },
  
  // Reset password with token
  async resetPassword(token: string, newPassword: string): Promise<{ success: boolean; error: string | null }> {
    // Verify the token
    const { valid, email } = await this.verifyResetToken(token);
    
    if (!valid || !email) {
      return { success: false, error: 'Invalid or expired reset token' };
    }
    
    // In a real app, we'd update the user's password in the database
    // Here we just log it
    console.log(`Password reset for ${email} to "${newPassword}"`);
    
    // Remove the used token
    const tokenIndex = passwordResetRequests.findIndex(r => r.token === token);
    if (tokenIndex !== -1) {
      passwordResetRequests.splice(tokenIndex, 1);
    }
    
    return { success: true, error: null };
  },

  // Log out current user
  async logout(): Promise<void> {
    console.log('User logged out');
  },
  
  // Get all users (admin function)
  async getAllUsers(): Promise<User[]> {
    return mockUsers;
  }
};

// Export User type for use in other files
export type { User };
