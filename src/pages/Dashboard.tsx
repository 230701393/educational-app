
import { Header } from "@/components/layout/Header";
import { ProgressStats } from "@/components/dashboard/ProgressStats";
import { CourseCard } from "@/components/cards/CourseCard";
import { PathCard } from "@/components/cards/PathCard";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { Button } from "@/components/ui/button";
import { BookOpen, GraduationCap, MapPin, BarChart } from "lucide-react";

export default function Dashboard() {
  // Mock data for in-progress courses
  const inProgressCourses = [
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
    },
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
    },
    {
      id: "3",
      title: "UX Research Fundamentals",
      instructor: "Emily Rodriguez",
      category: "Design",
      level: "Intermediate",
      duration: "6 weeks",
      enrolled: 1240,
      rating: 4.5,
      progress: 78,
    },
  ];

  // Mock data for learning paths
  const learningPaths = [
    {
      id: "1",
      title: "Data Science Career Path",
      description: "Master the skills needed to become a data scientist, from statistics to machine learning.",
      courseCount: 7,
      difficulty: "Intermediate",
      estimatedTime: "6 months",
      progress: 45,
      featured: true,
    },
    {
      id: "2",
      title: "Web Development Mastery",
      description: "Learn frontend and backend development to build complete web applications.",
      courseCount: 9,
      difficulty: "Beginner",
      estimatedTime: "8 months",
      progress: 25,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Alex!</h1>
          <p className="text-gray-600">Continue your learning journey where you left off.</p>
        </div>

        {/* Progress Stats */}
        <section className="mb-8">
          <ProgressStats />
        </section>

        {/* Main Content - 2 Columns on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Courses & Paths */}
          <div className="lg:col-span-2 space-y-8">
            {/* Courses In Progress */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-blue-500" />
                  Courses In Progress
                </h2>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {inProgressCourses.map((course) => (
                  <CourseCard key={course.id} {...course} />
                ))}
              </div>
            </section>

            {/* Learning Paths */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-purple-500" />
                  Your Learning Paths
                </h2>
                <Button variant="outline" size="sm">Explore Paths</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {learningPaths.map((path) => (
                  <PathCard key={path.id} {...path} />
                ))}
              </div>
            </section>

            {/* Recommendations */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center">
                  <GraduationCap className="mr-2 h-5 w-5 text-green-500" />
                  Recommended For You
                </h2>
                <Button variant="outline" size="sm">See More</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <CourseCard
                  id="4"
                  title="Machine Learning Fundamentals"
                  instructor="Dr. James Wilson"
                  category="Artificial Intelligence"
                  level="Intermediate"
                  duration="12 weeks"
                  enrolled={3245}
                  rating={4.9}
                />
                <CourseCard
                  id="5"
                  title="Digital Marketing Essentials"
                  instructor="Lisa Thompson"
                  category="Marketing"
                  level="Beginner"
                  duration="4 weeks"
                  enrolled={1820}
                  rating={4.6}
                />
                <CourseCard
                  id="6"
                  title="Project Management Professional"
                  instructor="Robert Garcia"
                  category="Business"
                  level="Advanced"
                  duration="10 weeks"
                  enrolled={2105}
                  rating={4.7}
                />
              </div>
            </section>
          </div>

          {/* Right Column - Profile & Analytics */}
          <div className="space-y-6">
            {/* Profile Card */}
            <ProfileCard
              name="Alex Morgan"
              title="Software Engineer"
              bio="Passionate about learning new technologies and skills. Currently focusing on data science and AI."
              interests={["Programming", "Data Science", "UX Design", "AI"]}
              joinDate="January 2023"
              isCurrentUser={true}
            />

            {/* Learning Goals */}
            <div className="bg-white rounded-lg border p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold">Learning Goals</h3>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs mr-2 mt-0.5">1</div>
                  <div>
                    <p className="font-medium">Master Python Programming</p>
                    <p className="text-xs text-gray-500">2 courses in progress</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-xs mr-2 mt-0.5">2</div>
                  <div>
                    <p className="font-medium">Learn Data Visualization</p>
                    <p className="text-xs text-gray-500">Next in learning path</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs mr-2 mt-0.5">3</div>
                  <div>
                    <p className="font-medium">Complete UX Certificate</p>
                    <p className="text-xs text-gray-500">1 of 3 courses completed</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Learning Analytics */}
            <div className="bg-white rounded-lg border p-4">
              <h3 className="font-bold flex items-center mb-3">
                <BarChart className="mr-2 h-4 w-4 text-blue-500" />
                Learning Analytics
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Weekly Study Goal</span>
                    <span className="font-medium">8h / 10h</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "80%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Monthly Quiz Score</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Course Completion Rate</span>
                    <span className="font-medium">7/11</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "63%" }}></div>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                View Detailed Analytics
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
