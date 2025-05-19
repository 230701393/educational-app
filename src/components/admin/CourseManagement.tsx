
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { courseService } from '@/services/courseService';
import { Course } from '@/models/course';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Search, Plus, Eye, Edit, Trash2, RefreshCcw } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

export function CourseManagement() {
  const { isAdmin, isPublisher, user: currentUser } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Delete confirmation
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);
  
  useEffect(() => {
    fetchCourses();
  }, []);
  
  const fetchCourses = async () => {
    try {
      setLoading(true);
      let fetchedCourses: Course[];
      
      if (isAdmin) {
        fetchedCourses = await courseService.getCourses();
      } else if (currentUser?.organization) {
        fetchedCourses = await courseService.getCoursesByOrganization(currentUser.organization);
      } else {
        fetchedCourses = [];
      }
      
      setCourses(fetchedCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load courses',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteCourse = async (courseId: string) => {
    try {
      const success = await courseService.deleteCourse(courseId);
      if (success) {
        toast({
          title: 'Success',
          description: 'Course deleted successfully',
        });
        fetchCourses();
      } else {
        throw new Error('Failed to delete course');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete course',
      });
    } finally {
      setCourseToDelete(null);
    }
  };
  
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if (!isAdmin && !isPublisher) {
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
        <h2 className="text-2xl font-bold">Course Management</h2>
        
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-full"
            />
          </div>
          
          <Button onClick={() => navigate('/course-builder')}>
            <Plus className="mr-2 h-4 w-4" />
            New Course
          </Button>
          
          <Button variant="outline" onClick={fetchCourses}>
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Enrolled</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Loading courses...
                </TableCell>
              </TableRow>
            ) : filteredCourses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No courses found
                </TableCell>
              </TableRow>
            ) : (
              filteredCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell>{course.category}</TableCell>
                  <TableCell>{course.level}</TableCell>
                  <TableCell>{course.instructor.name}</TableCell>
                  <TableCell>{course.enrolledCount}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      course.isPublished ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {course.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => navigate(`/courses/${course.id}`)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => navigate(`/course-builder/${course.id}`)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setCourseToDelete(course.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <AlertDialog open={!!courseToDelete} onOpenChange={() => setCourseToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the course and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => courseToDelete && handleDeleteCourse(courseToDelete)}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
