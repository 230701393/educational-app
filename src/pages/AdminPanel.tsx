
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserManagement } from '@/components/admin/UserManagement';
import { CourseManagement } from '@/components/admin/CourseManagement';
import { Navigate } from 'react-router-dom';
import { Users, BookOpen, BarChart3 } from 'lucide-react';

function AdminPanel() {
  const { isAdmin, isPublisher, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('users');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAdmin && !isPublisher) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:w-[400px]">
          {isAdmin && (
            <TabsTrigger value="users" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              <span>Users</span>
            </TabsTrigger>
          )}
          <TabsTrigger value="courses" className="flex items-center">
            <BookOpen className="mr-2 h-4 w-4" />
            <span>Courses</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center">
            <BarChart3 className="mr-2 h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger>
        </TabsList>
        
        {isAdmin && (
          <TabsContent value="users" className="rounded-lg border p-4 bg-white shadow-sm">
            <UserManagement />
          </TabsContent>
        )}
        
        <TabsContent value="courses" className="rounded-lg border p-4 bg-white shadow-sm">
          <CourseManagement />
        </TabsContent>
        
        <TabsContent value="analytics" className="rounded-lg border p-4 bg-white shadow-sm">
          <div className="p-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Analytics Dashboard</h2>
            <p className="text-gray-500">Course and user analytics will be available here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AdminPanel;
