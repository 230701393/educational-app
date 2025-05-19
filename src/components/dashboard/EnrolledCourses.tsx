
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { courseService } from '@/services/courseService';
import { Course } from '@/models/course';
import { CourseCard } from '@/components/cards/CourseCard';
import { Skeleton } from '@/components/ui/skeleton';

export function EnrolledCourses() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<(Course & { progress?: number })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const enrolledCourses = await courseService.getUserEnrolledCourses(user.id);
        
        // Fetch progress for each course
        const coursesWithProgress = await Promise.all(
          enrolledCourses.map(async (course) => {
            const progress = await courseService.getUserCourseProgress(user.id, course.id);
            return {
              ...course,
              progress: progress?.overallProgress || 0
            };
          })
        );
        
        setCourses(coursesWithProgress);
      } catch (error) {
        console.error('Error fetching enrolled courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [user]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2">No Courses Enrolled</h3>
        <p className="text-gray-600 mb-6">
          You haven't enrolled in any courses yet. Explore available courses to get started.
        </p>
        <button
          onClick={() => navigate('/courses')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Explore Courses
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          id={course.id}
          title={course.title}
          instructor={course.instructor.name}
          category={course.category}
          level={course.level}
          duration={course.duration}
          enrolled={course.enrolledCount}
          rating={course.rating}
          progress={course.progress}
          image={course.image}
        />
      ))}
    </div>
  );
}
