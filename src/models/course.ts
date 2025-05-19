
export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  instructor: {
    id: string;
    name: string;
  };
  duration: string; // e.g., "2 hours 30 minutes"
  lessons: Lesson[];
  enrolledCount: number;
  rating: number;
  image?: string;
  isPublished: boolean;
  organization?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: LessonContent[];
  quiz?: Quiz;
  durationMinutes: number;
}

export type LessonContent = VideoContent | TextContent | SlideContent | InteractiveContent;

interface BaseContent {
  id: string;
  type: string;
  title: string;
}

export interface VideoContent extends BaseContent {
  type: 'video';
  url: string;
  durationMinutes: number;
}

export interface TextContent extends BaseContent {
  type: 'text';
  content: string;
}

export interface SlideContent extends BaseContent {
  type: 'slides';
  slides: {
    imageUrl: string;
    caption?: string;
  }[];
}

export interface InteractiveContent extends BaseContent {
  type: 'interactive';
  interactiveType: 'exercise' | 'simulation' | 'game';
  content: any; // This would be defined based on the specific interactive content
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  passingScore: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation?: string;
}

export interface UserProgress {
  userId: string;
  courseId: string;
  lastAccessedDate: string;
  completedLessons: string[]; // lesson IDs
  quizResults: QuizResult[];
  certificateIssued: boolean;
  overallProgress: number; // 0-100%
}

export interface QuizResult {
  quizId: string;
  score: number;
  passedAt?: string;
  attempts: number;
}

export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  issuedAt: string;
  template: string;
  badges?: string[];
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  courses: string[]; // course IDs in sequence
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTimeToComplete: string;
  featured: boolean;
  organization?: string;
}
