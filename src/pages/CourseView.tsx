
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PlayCircle, Clock, Star, Users, BookOpen, CheckCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CourseView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState<any>(null);

  useEffect(() => {
    // Mock fetching course data
    const fetchCourse = async () => {
      setIsLoading(true);
      try {
        // Simulate API call - in a real app, this would fetch from your backend
        setTimeout(() => {
          // Find the course by ID from our mock data
          const mockCourses = [
            {
              id: "1",
              title: "Introduction to Data Science",
              instructor: "Dr. Sarah Johnson",
              category: "Data Science",
              level: "Beginner",
              duration: "8 weeks",
              enrolled: 2430,
              rating: 4.7,
              progress: 65,
              description: "Learn the fundamentals of data science including data analysis, visualization, and machine learning basics.",
              videoUrl: "https://www.youtube.com/embed/ua-CiDNNj30",
              modules: [
                { title: "Introduction to Data Science", complete: true },
                { title: "Data Collection and Preprocessing", complete: true },
                { title: "Exploratory Data Analysis", complete: false },
                { title: "Introduction to Machine Learning", complete: false },
                { title: "Data Visualization", complete: false },
              ]
            },
            // Additional mock courses would be defined here
            {
              id: "2",
              title: "Advanced Python Programming",
              instructor: "Michael Chen",
              category: "Programming",
              level: "Advanced",
              duration: "10 weeks",
              enrolled: 1850,
              rating: 4.8,
              progress: 32,
              description: "Master advanced Python concepts including decorators, generators, concurrency, and design patterns.",
              videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
              modules: [
                { title: "Advanced Functions and Decorators", complete: true },
                { title: "Generators and Iterators", complete: false },
                { title: "Concurrency and Parallelism", complete: false },
                { title: "Design Patterns in Python", complete: false },
                { title: "Building Robust Applications", complete: false },
              ]
            }
          ];
          
          const foundCourse = mockCourses.find(c => c.id === id) || mockCourses[0];
          setCourse(foundCourse);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error("Error fetching course:", error);
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </main>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Course not found</h2>
            <p className="mt-2 text-gray-600">The course you're looking for doesn't exist or has been removed.</p>
            <Button className="mt-4" onClick={() => navigate("/courses")}>
              Back to Courses
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container py-6">
        <Button 
          variant="outline" 
          className="mb-6" 
          onClick={() => navigate("/courses")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content - left two thirds */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <div className="bg-white rounded-lg border overflow-hidden">
              <div className="aspect-video w-full">
                <iframe 
                  className="w-full h-full" 
                  src={course.videoUrl}
                  title={course.title}
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              </div>
              <div className="p-4">
                <h1 className="text-2xl font-bold">{course.title}</h1>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    {course.duration}
                  </span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    {course.enrolled.toLocaleString()} enrolled
                  </span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {course.rating.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Course Tabs */}
            <Tabs defaultValue="overview" className="bg-white rounded-lg border p-4">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="discussion">Discussion</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <h3 className="text-lg font-semibold mb-2">About This Course</h3>
                <p className="text-gray-700">{course.description}</p>
                
                <h3 className="text-lg font-semibold mt-6 mb-2">What You'll Learn</h3>
                <ul className="space-y-2">
                  {course.modules.map((module, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                      <span>{module.title}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              
              <TabsContent value="curriculum">
                <h3 className="text-lg font-semibold mb-4">Course Content</h3>
                <div className="space-y-3">
                  {course.modules.map((module, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        {module.complete ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        ) : (
                          <PlayCircle className="h-5 w-5 text-blue-500 mr-3" />
                        )}
                        <span>{module.title}</span>
                      </div>
                      <Badge variant={module.complete ? "outline" : "secondary"}>
                        {module.complete ? "Completed" : "Not started"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="discussion">
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <p>Join the discussion with fellow learners and instructors!</p>
                  <Button className="mt-4">Start Discussion</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="resources">
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <p>Download course materials and additional resources</p>
                  <Button className="mt-4">Download Resources</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar - right third */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">Your Progress</h3>
                  <Progress value={course.progress} className="h-2" />
                  <p className="text-sm text-gray-500">{course.progress}% complete</p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold">Course Information</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Instructor:</div>
                    <div className="font-medium">{course.instructor}</div>
                    <div>Category:</div>
                    <div className="font-medium">{course.category}</div>
                    <div>Level:</div>
                    <div className="font-medium">{course.level}</div>
                    <div>Duration:</div>
                    <div className="font-medium">{course.duration}</div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button className="w-full">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Continue Learning
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Need Help?</h3>
                <p className="text-sm text-gray-500 mb-4">Have questions about this course? Reach out to your instructor or browse our FAQ.</p>
                <Button variant="outline" className="w-full">Contact Instructor</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
