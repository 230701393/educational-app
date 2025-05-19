
import { Course, Lesson, UserProgress, Certificate, LearningPath } from "@/models/course";

// Mock courses database
const mockCourses: Course[] = [
  {
    id: "course-1",
    title: "Introduction to Web Development",
    description: "Learn the basics of HTML, CSS, and JavaScript to build modern web applications.",
    category: "Web Development",
    level: "Beginner",
    instructor: {
      id: "instructor-1",
      name: "Prof. Jane Smith"
    },
    duration: "6 hours",
    lessons: [
      {
        id: "lesson-1-1",
        title: "HTML Fundamentals",
        description: "Learn the basic structure of HTML documents",
        content: [
          {
            id: "content-1-1-1",
            type: "video",
            title: "Introduction to HTML",
            url: "https://example.com/videos/html-intro",
            durationMinutes: 15
          },
          {
            id: "content-1-1-2",
            type: "text",
            title: "HTML Tags Reference",
            content: "HTML tags are the building blocks of web pages..."
          }
        ],
        durationMinutes: 45
      },
      {
        id: "lesson-1-2",
        title: "CSS Styling",
        description: "Learn how to style your HTML with CSS",
        content: [
          {
            id: "content-1-2-1",
            type: "video",
            title: "CSS Basics",
            url: "https://example.com/videos/css-basics",
            durationMinutes: 20
          }
        ],
        durationMinutes: 60
      }
    ],
    enrolledCount: 1250,
    rating: 4.7,
    isPublished: true,
    organization: "Rajalakshmi Engineering College"
  },
  {
    id: "course-2",
    title: "Advanced JavaScript",
    description: "Master advanced JavaScript concepts including closures, promises, and async programming.",
    category: "Programming",
    level: "Intermediate",
    instructor: {
      id: "instructor-2",
      name: "Dr. Alex Johnson"
    },
    duration: "8 hours",
    lessons: [
      {
        id: "lesson-2-1",
        title: "JavaScript Fundamentals Review",
        description: "Quick review of JavaScript basics",
        content: [
          {
            id: "content-2-1-1",
            type: "text",
            title: "JavaScript Overview",
            content: "JavaScript is a programming language that adds interactivity to your website..."
          }
        ],
        durationMinutes: 30
      }
    ],
    enrolledCount: 850,
    rating: 4.5,
    isPublished: true,
    organization: "Rajalakshmi Engineering College"
  }
];

// Mock user progress data
const mockUserProgress: UserProgress[] = [];

// Mock certificates data
const mockCertificates: Certificate[] = [];

// Mock learning paths
const mockLearningPaths: LearningPath[] = [
  {
    id: "path-1",
    title: "Become a Full Stack Developer",
    description: "Master both frontend and backend development with this comprehensive learning path",
    courses: ["course-1", "course-2"],
    difficulty: "Intermediate",
    estimatedTimeToComplete: "3 months",
    featured: true,
    organization: "Rajalakshmi Engineering College"
  }
];

export const courseService = {
  // Get all courses
  async getCourses(): Promise<Course[]> {
    return mockCourses;
  },

  // Get a specific course by ID
  async getCourseById(courseId: string): Promise<Course | null> {
    const course = mockCourses.find(c => c.id === courseId);
    return course || null;
  },

  // Create a new course
  async createCourse(courseData: Omit<Course, "id" | "enrolledCount" | "rating">): Promise<Course> {
    const newCourse: Course = {
      ...courseData,
      id: `course-${Date.now()}`,
      enrolledCount: 0,
      rating: 0
    };
    
    mockCourses.push(newCourse);
    return newCourse;
  },

  // Update an existing course
  async updateCourse(courseId: string, courseData: Partial<Course>): Promise<Course | null> {
    const courseIndex = mockCourses.findIndex(c => c.id === courseId);
    if (courseIndex === -1) return null;
    
    mockCourses[courseIndex] = {
      ...mockCourses[courseIndex],
      ...courseData
    };
    
    return mockCourses[courseIndex];
  },

  // Delete a course
  async deleteCourse(courseId: string): Promise<boolean> {
    const courseIndex = mockCourses.findIndex(c => c.id === courseId);
    if (courseIndex === -1) return false;
    
    mockCourses.splice(courseIndex, 1);
    return true;
  },

  // Enroll a user in a course
  async enrollUserInCourse(userId: string, courseId: string): Promise<boolean> {
    const course = mockCourses.find(c => c.id === courseId);
    if (!course) return false;
    
    // Check if user is already enrolled
    const existingProgress = mockUserProgress.find(
      p => p.userId === userId && p.courseId === courseId
    );
    
    if (existingProgress) return true; // Already enrolled
    
    // Create new progress record for the user
    const newProgress: UserProgress = {
      userId,
      courseId,
      lastAccessedDate: new Date().toISOString(),
      completedLessons: [],
      quizResults: [],
      certificateIssued: false,
      overallProgress: 0
    };
    
    mockUserProgress.push(newProgress);
    
    // Update enrollment count
    course.enrolledCount += 1;
    
    return true;
  },
  
  // Get user's progress in a course
  async getUserCourseProgress(userId: string, courseId: string): Promise<UserProgress | null> {
    const progress = mockUserProgress.find(
      p => p.userId === userId && p.courseId === courseId
    );
    
    return progress || null;
  },
  
  // Mark a lesson as completed
  async completeLessonForUser(userId: string, courseId: string, lessonId: string): Promise<UserProgress | null> {
    const progressIndex = mockUserProgress.findIndex(
      p => p.userId === userId && p.courseId === courseId
    );
    
    if (progressIndex === -1) return null;
    
    const progress = mockUserProgress[progressIndex];
    
    // Add the lesson to completed lessons if not already there
    if (!progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
      
      // Update last accessed date
      progress.lastAccessedDate = new Date().toISOString();
      
      // Recalculate overall progress
      const course = mockCourses.find(c => c.id === courseId);
      if (course) {
        progress.overallProgress = Math.round(
          (progress.completedLessons.length / course.lessons.length) * 100
        );
        
        // Issue certificate if all lessons completed and quizzes passed
        if (progress.overallProgress === 100 && this.allQuizzesPassed(progress)) {
          this.issueCertificate(userId, courseId);
          progress.certificateIssued = true;
        }
      }
    }
    
    return progress;
  },
  
  // Submit quiz results
  async submitQuizResults(userId: string, courseId: string, quizId: string, score: number): Promise<UserProgress | null> {
    const progressIndex = mockUserProgress.findIndex(
      p => p.userId === userId && p.courseId === courseId
    );
    
    if (progressIndex === -1) return null;
    
    const progress = mockUserProgress[progressIndex];
    const existingQuizResultIndex = progress.quizResults.findIndex(r => r.quizId === quizId);
    
    const quizResult = {
      quizId,
      score,
      attempts: 1,
      passedAt: score >= 70 ? new Date().toISOString() : undefined
    };
    
    if (existingQuizResultIndex >= 0) {
      quizResult.attempts = progress.quizResults[existingQuizResultIndex].attempts + 1;
      progress.quizResults[existingQuizResultIndex] = quizResult;
    } else {
      progress.quizResults.push(quizResult);
    }
    
    // Update last accessed date
    progress.lastAccessedDate = new Date().toISOString();
    
    // Check if certificate should be issued
    if (progress.overallProgress === 100 && this.allQuizzesPassed(progress)) {
      this.issueCertificate(userId, courseId);
      progress.certificateIssued = true;
    }
    
    return progress;
  },
  
  // Helper to check if all quizzes are passed
  allQuizzesPassed(progress: UserProgress): boolean {
    // Find the course to get all quizzes
    const course = mockCourses.find(c => c.id === progress.courseId);
    if (!course) return false;
    
    // Get all quiz IDs in the course
    const quizIds = course.lessons
      .filter(lesson => lesson.quiz)
      .map(lesson => lesson.quiz!.id);
    
    // Check if all quizzes have been passed
    return quizIds.every(quizId => {
      const quizResult = progress.quizResults.find(r => r.quizId === quizId);
      return quizResult && quizResult.passedAt;
    });
  },
  
  // Issue a certificate
  async issueCertificate(userId: string, courseId: string): Promise<Certificate | null> {
    const course = mockCourses.find(c => c.id === courseId);
    if (!course) return null;
    
    // Check if certificate already exists
    const existingCertificate = mockCertificates.find(
      cert => cert.userId === userId && cert.courseId === courseId
    );
    
    if (existingCertificate) return existingCertificate;
    
    // Create new certificate
    const newCertificate: Certificate = {
      id: `cert-${Date.now()}`,
      userId,
      courseId,
      issuedAt: new Date().toISOString(),
      template: "default",
      badges: ["course-completion"]
    };
    
    mockCertificates.push(newCertificate);
    return newCertificate;
  },
  
  // Get all certificates for a user
  async getUserCertificates(userId: string): Promise<Certificate[]> {
    return mockCertificates.filter(cert => cert.userId === userId);
  },
  
  // Get all learning paths
  async getLearningPaths(): Promise<LearningPath[]> {
    return mockLearningPaths;
  },
  
  // Get a specific learning path
  async getLearningPathById(pathId: string): Promise<LearningPath | null> {
    const path = mockLearningPaths.find(p => p.id === pathId);
    return path || null;
  },
  
  // Create a new learning path
  async createLearningPath(pathData: Omit<LearningPath, "id">): Promise<LearningPath> {
    const newPath: LearningPath = {
      ...pathData,
      id: `path-${Date.now()}`
    };
    
    mockLearningPaths.push(newPath);
    return newPath;
  },
  
  // Get courses by organization
  async getCoursesByOrganization(organization: string): Promise<Course[]> {
    return mockCourses.filter(course => course.organization === organization);
  },
  
  // Get learning paths by organization
  async getLearningPathsByOrganization(organization: string): Promise<LearningPath[]> {
    return mockLearningPaths.filter(path => path.organization === organization);
  },
  
  // Get user's enrolled courses
  async getUserEnrolledCourses(userId: string): Promise<Course[]> {
    const enrolledCourseIds = mockUserProgress
      .filter(progress => progress.userId === userId)
      .map(progress => progress.courseId);
    
    return mockCourses.filter(course => enrolledCourseIds.includes(course.id));
  },
  
  // Admin: Get all users enrolled in a course
  async getUsersEnrolledInCourse(courseId: string): Promise<string[]> {
    return mockUserProgress
      .filter(progress => progress.courseId === courseId)
      .map(progress => progress.userId);
  }
};
