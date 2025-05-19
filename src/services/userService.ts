
import { User } from "@/services/authService";
import { authService } from "@/services/authService";

export const userService = {
  // Get all users
  async getUsers(): Promise<User[]> {
    return await authService.getAllUsers();
  },
  
  // Import users from CSV/Excel data
  async importUsers(userData: Array<{email: string, fullName: string, role: 'admin' | 'publisher' | 'sme' | 'learner', organization?: string}>): Promise<{success: number, failed: number, errors: string[]}> {
    return await authService.importUsers(userData);
  },
  
  // Parse CSV/Excel data
  parseUserImportData(fileContent: string): Array<{email: string, fullName: string, role: 'admin' | 'publisher' | 'sme' | 'learner', organization?: string}> {
    // This is a simple CSV parser - in a real app, you might use a library
    const lines = fileContent.trim().split('\n');
    const headers = lines[0].split(',');
    
    const emailIndex = headers.findIndex(h => h.trim().toLowerCase() === 'email');
    const nameIndex = headers.findIndex(h => h.trim().toLowerCase() === 'name' || h.trim().toLowerCase() === 'fullname');
    const roleIndex = headers.findIndex(h => h.trim().toLowerCase() === 'role');
    const orgIndex = headers.findIndex(h => h.trim().toLowerCase() === 'organization');
    
    if (emailIndex === -1 || nameIndex === -1) {
      throw new Error('CSV must contain email and name/fullName columns');
    }
    
    return lines.slice(1).map(line => {
      const values = line.split(',');
      
      const email = values[emailIndex].trim();
      const fullName = values[nameIndex].trim();
      let role: 'admin' | 'publisher' | 'sme' | 'learner' = 'learner';
      
      if (roleIndex !== -1) {
        const roleValue = values[roleIndex].trim().toLowerCase();
        if (roleValue === 'admin' || roleValue === 'publisher' || roleValue === 'sme') {
          role = roleValue as 'admin' | 'publisher' | 'sme';
        }
      }
      
      const organization = orgIndex !== -1 ? values[orgIndex].trim() : undefined;
      
      return { email, fullName, role, organization };
    });
  }
};
