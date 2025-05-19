
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { courseService } from '@/services/courseService';
import { LearningPath } from '@/models/course';
import { PathCard } from '@/components/cards/PathCard';
import { Skeleton } from '@/components/ui/skeleton';

export function RecommendedPaths() {
  const navigate = useNavigate();
  const [paths, setPaths] = useState<LearningPath[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLearningPaths = async () => {
      try {
        setLoading(true);
        const fetchedPaths = await courseService.getLearningPaths();
        setPaths(fetchedPaths);
      } catch (error) {
        console.error('Error fetching learning paths:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLearningPaths();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-36 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  if (paths.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-xl font-semibold mb-2">No Learning Paths Available</h3>
        <p className="text-gray-600">
          There are no learning paths available at the moment. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {paths.map((path) => (
        <PathCard
          key={path.id}
          id={path.id}
          title={path.title}
          description={path.description}
          courseCount={path.courses.length}
          difficulty={path.difficulty}
          estimatedTime={path.estimatedTimeToComplete}
          featured={path.featured}
        />
      ))}
    </div>
  );
}
