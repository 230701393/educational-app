
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { userService } from '@/services/userService';
import { User } from '@/services/authService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { UserPlus, Upload, Search, RefreshCcw } from 'lucide-react';

export function UserManagement() {
  const { isAdmin, user: currentUser, addUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [openAddUser, setOpenAddUser] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  
  // New user form state
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState<'admin' | 'publisher' | 'sme' | 'learner'>('learner');
  
  // Import state
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importResult, setImportResult] = useState<{success: number, failed: number, errors: string[]} | null>(null);
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const fetchedUsers = await userService.getUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load users',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddUser = async () => {
    if (!newEmail || !newName) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Email and name are required',
      });
      return;
    }
    
    const result = await addUser(newEmail, newName, newRole, currentUser?.organization);
    
    if (result.success) {
      setNewEmail('');
      setNewName('');
      setNewRole('learner');
      setOpenAddUser(false);
      fetchUsers();
    }
  };
  
  const handleImportUsers = async () => {
    if (!importFile) {
      toast({
        variant: 'destructive',
        title: 'Error', 
        description: 'Please select a file to import',
      });
      return;
    }
    
    try {
      const fileContent = await importFile.text();
      const userData = userService.parseUserImportData(fileContent);
      
      // Add organization to each user if current user has one
      if (currentUser?.organization) {
        userData.forEach(user => {
          user.organization = user.organization || currentUser.organization;
        });
      }
      
      const result = await userService.importUsers(userData);
      setImportResult(result);
      
      if (result.success > 0) {
        fetchUsers();
      }
      
      toast({
        title: 'Import Complete',
        description: `Successfully added ${result.success} users. ${result.failed > 0 ? `Failed: ${result.failed}` : ''}`,
      });
    } catch (error) {
      console.error('Error importing users:', error);
      toast({
        variant: 'destructive',
        title: 'Import Error',
        description: error instanceof Error ? error.message : 'Failed to import users',
      });
    }
  };
  
  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.fullName && user.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if (!isAdmin) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
        <p>You don't have permission to access this page.</p>
      </div>
    );
  }
  
  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h2 className="text-2xl font-bold">User Management</h2>
        
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-full"
            />
          </div>
          
          <Dialog open={openAddUser} onOpenChange={setOpenAddUser}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Add a new user to the platform. They will receive an email to set their password.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="user@example.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                  <Input 
                    id="name" 
                    placeholder="John Doe"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="role" className="text-sm font-medium">Role</label>
                  <Select 
                    value={newRole}
                    onValueChange={(value) => setNewRole(value as 'admin' | 'publisher' | 'sme' | 'learner')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="publisher">Publisher</SelectItem>
                      <SelectItem value="sme">Subject Matter Expert</SelectItem>
                      <SelectItem value="learner">Learner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenAddUser(false)}>Cancel</Button>
                <Button onClick={handleAddUser}>Add User</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={openImport} onOpenChange={setOpenImport}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Import Users
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Import Users</DialogTitle>
                <DialogDescription>
                  Upload a CSV file with user information. File should contain columns for email, name, and optionally role.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="file" className="text-sm font-medium">CSV File</label>
                  <Input 
                    id="file" 
                    type="file" 
                    accept=".csv"
                    onChange={(e) => setImportFile(e.target.files?.[0] || null)}
                  />
                  <p className="text-xs text-gray-500">
                    File format: email,name,role,organization
                  </p>
                </div>
                
                {importResult && (
                  <div className="p-3 bg-gray-50 rounded border">
                    <h4 className="font-medium">Import Results</h4>
                    <p>Successfully added: {importResult.success}</p>
                    {importResult.failed > 0 && (
                      <>
                        <p>Failed: {importResult.failed}</p>
                        <details>
                          <summary className="cursor-pointer text-sm text-blue-500">View errors</summary>
                          <ul className="text-xs mt-2 space-y-1">
                            {importResult.errors.map((error, i) => (
                              <li key={i} className="text-red-500">{error}</li>
                            ))}
                          </ul>
                        </details>
                      </>
                    )}
                  </div>
                )}
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenImport(false)}>Close</Button>
                <Button onClick={handleImportUsers}>Import Users</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" onClick={fetchUsers}>
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Organization</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  Loading users...
                </TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.fullName || 'N/A'}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                      user.role === 'publisher' ? 'bg-blue-100 text-blue-800' :
                      user.role === 'sme' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role === 'sme' ? 'SME' : user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>{user.organization || 'N/A'}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
