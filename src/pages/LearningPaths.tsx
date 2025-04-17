
import { Header } from "@/components/layout/Header";
import { PathCard } from "@/components/cards/PathCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Plus, Search } from "lucide-react";

export default function LearningPaths() {
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
    {
      id: "3",
      title: "UX/UI Design Path",
      description: "Master the fundamentals of user experience and interface design for digital products.",
      courseCount: 5,
      difficulty: "Beginner",
      estimatedTime: "4 months",
      featured: true,
    },
    {
      id: "4",
      title: "Machine Learning Engineer",
      description: "Complete curriculum to become a machine learning engineer with Python and TensorFlow.",
      courseCount: 8,
      difficulty: "Advanced",
      estimatedTime: "9 months",
    },
    {
      id: "5",
      title: "Mobile App Development",
      description: "Learn to build native mobile apps for iOS and Android using React Native.",
      courseCount: 6,
      difficulty: "Intermediate",
      estimatedTime: "5 months",
    },
    {
      id: "6",
      title: "Digital Marketing Specialist",
      description: "Master SEO, social media, content marketing, and analytics to drive digital growth.",
      courseCount: 10,
      difficulty: "Beginner",
      estimatedTime: "6 months",
    },
    {
      id: "7",
      title: "Cybersecurity Professional",
      description: "Learn the skills needed to protect organizations from cyber threats and vulnerabilities.",
      courseCount: 8,
      difficulty: "Advanced",
      estimatedTime: "7 months",
    },
    {
      id: "8",
      title: "Business Analytics",
      description: "Learn to analyze and interpret business data to make data-driven decisions.",
      courseCount: 6,
      difficulty: "Intermediate",
      estimatedTime: "5 months",
    },
  ];

  // Mock data for user enrolled paths
  const enrolledPaths = learningPaths.slice(0, 2);
  
  // Mock data for permissions
  const canCreatePaths = true;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Learning Paths</h1>
            <p className="text-gray-600">Structured learning journeys to help you master new skills and achieve your goals.</p>
          </div>
          {canCreatePaths && (
            <Button className="mt-4 md:mt-0" size="lg">
              <Plus className="mr-2 h-4 w-4" />
              Create Learning Path
            </Button>
          )}
        </div>

        {/* Path Filters */}
        <div className="bg-white p-4 rounded-lg border mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search learning paths..."
                className="pl-9"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Duration</SelectItem>
                <SelectItem value="short">Short (1-3 months)</SelectItem>
                <SelectItem value="medium">Medium (4-6 months)</SelectItem>
                <SelectItem value="long">Long (7+ months)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Path Tabs */}
        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Paths</TabsTrigger>
            <TabsTrigger value="enrolled">Enrolled</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            {canCreatePaths && (
              <TabsTrigger value="created">Created by You</TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningPaths.map((path) => (
                <PathCard key={path.id} {...path} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="enrolled" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledPaths.map((path) => (
                <PathCard key={path.id} {...path} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="featured" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningPaths.filter(path => path.featured).map((path) => (
                <PathCard key={path.id} {...path} />
              ))}
            </div>
          </TabsContent>
          {canCreatePaths && (
            <TabsContent value="created" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <PathCard
                  id="custom1"
                  title="Frontend Development Fundamentals"
                  description="A custom path for frontend development focusing on modern frameworks and tools."
                  courseCount={5}
                  difficulty="Beginner"
                  estimatedTime="4 months"
                />
              </div>
            </TabsContent>
          )}
        </Tabs>

        {/* Path Categories */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Path Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Technology", count: 28, color: "bg-blue-100 text-blue-700", icon: "💻" },
              { name: "Business", count: 15, color: "bg-green-100 text-green-700", icon: "📊" },
              { name: "Design", count: 12, color: "bg-purple-100 text-purple-700", icon: "🎨" },
              { name: "Marketing", count: 9, color: "bg-yellow-100 text-yellow-700", icon: "📱" },
            ].map((category) => (
              <a
                key={category.name}
                href="#"
                className={`${category.color} rounded-lg p-4 text-center hover:shadow-md transition-shadow`}
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <h3 className="font-bold">{category.name}</h3>
                <p className="text-sm">{category.count} paths</p>
              </a>
            ))}
          </div>
        </section>

        {/* Featured Path Detail */}
        <section className="bg-white rounded-lg border overflow-hidden mb-8">
          <div className="bg-purple-600 text-white p-6">
            <span className="inline-block bg-white text-purple-600 px-3 py-1 rounded-full text-sm font-medium mb-3">
              Featured Path
            </span>
            <h2 className="text-2xl font-bold mb-2">Data Science Career Path</h2>
            <p className="text-purple-100 mb-4">
              Master the skills needed to become a data scientist, from statistics to machine learning and beyond.
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <MapPin className="mr-1 h-4 w-4" />
                <span>7 courses</span>
              </div>
              <div>
                <span className="px-2 py-1 bg-purple-700 rounded-full text-sm">
                  Intermediate
                </span>
              </div>
              <div>
                <span>6 months</span>
              </div>
            </div>
          </div>
          <div className="p-6">
            <h3 className="font-bold text-lg mb-3">What You'll Learn</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                "Python programming fundamentals",
                "Data manipulation with pandas",
                "Data visualization techniques",
                "Statistical analysis",
                "Machine learning algorithms",
                "Deep learning concepts",
                "Real-world data science projects",
                "Big data processing"
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs mr-2">✓</div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <h3 className="font-bold text-lg mb-3">Path Curriculum</h3>
            <div className="space-y-3 mb-6">
              {[
                { title: "Introduction to Python for Data Science", duration: "4 weeks", status: "completed" },
                { title: "Data Analysis with Pandas", duration: "4 weeks", status: "completed" },
                { title: "Data Visualization Fundamentals", duration: "3 weeks", status: "in-progress" },
                { title: "Statistical Methods for Data Science", duration: "5 weeks", status: "upcoming" },
                { title: "Machine Learning Fundamentals", duration: "6 weeks", status: "upcoming" },
                { title: "Deep Learning with TensorFlow", duration: "6 weeks", status: "upcoming" },
                { title: "Capstone Data Science Project", duration: "4 weeks", status: "upcoming" },
              ].map((course, index) => (
                <div key={index} className="flex p-3 border rounded-md">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                    {index + 1}
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium">{course.title}</h4>
                    <p className="text-sm text-gray-600">{course.duration}</p>
                  </div>
                  <div>
                    {course.status === "completed" ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                        Completed
                      </span>
                    ) : course.status === "in-progress" ? (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                        In Progress
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        Upcoming
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm mb-1">Path Progress: 45%</div>
                <div className="w-48 bg-gray-100 h-2 rounded-full">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: "45%" }}></div>
                </div>
              </div>
              <Button size="lg">Continue Path</Button>
            </div>
          </div>
        </section>

        {/* Popular Paths */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Popular Learning Paths</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningPaths.slice(2, 5).map((path) => (
              <PathCard key={path.id} {...path} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
