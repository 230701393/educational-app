
import { Header } from "@/components/layout/Header";
import { CourseCard } from "@/components/cards/CourseCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, SlidersHorizontal } from "lucide-react";

export default function Courses() {
  // Mock data for courses
  const courses = [
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
    {
      id: "4",
      title: "Machine Learning Fundamentals",
      instructor: "Dr. James Wilson",
      category: "Artificial Intelligence",
      level: "Intermediate",
      duration: "12 weeks",
      enrolled: 3245,
      rating: 4.9
    },
    {
      id: "5",
      title: "Digital Marketing Essentials",
      instructor: "Lisa Thompson",
      category: "Marketing",
      level: "Beginner",
      duration: "4 weeks",
      enrolled: 1820,
      rating: 4.6
    },
    {
      id: "6",
      title: "Project Management Professional",
      instructor: "Robert Garcia",
      category: "Business",
      level: "Advanced",
      duration: "10 weeks",
      enrolled: 2105,
      rating: 4.7
    },
    {
      id: "7",
      title: "Full Stack Web Development",
      instructor: "Alex Reynolds",
      category: "Web Development",
      level: "Intermediate",
      duration: "14 weeks",
      enrolled: 2780,
      rating: 4.8
    },
    {
      id: "8",
      title: "Mobile App Development with React Native",
      instructor: "Daniel Kim",
      category: "Mobile Development",
      level: "Intermediate",
      duration: "10 weeks",
      enrolled: 1950,
      rating: 4.6
    },
  ];

  // Mock data for course creation
  const isInstructor = true;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Courses</h1>
            <p className="text-gray-600">Discover and enroll in a variety of courses to expand your knowledge.</p>
          </div>
          {isInstructor && (
            <Button className="mt-4 md:mt-0" size="lg">
              <Plus className="mr-2 h-4 w-4" />
              Create New Course
            </Button>
          )}
        </div>

        {/* Course Filters */}
        <div className="bg-white p-4 rounded-lg border mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search courses..."
                className="pl-9"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="data-science">Data Science</SelectItem>
                <SelectItem value="programming">Programming</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Course Tabs */}
        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Courses</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            {isInstructor && (
              <TabsTrigger value="teaching">Teaching</TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {courses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="in-progress" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {courses.slice(0, 3).map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="completed" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {courses.slice(5, 7).map((course) => (
                <CourseCard key={course.id} {...course} progress={100} />
              ))}
            </div>
          </TabsContent>
          {isInstructor && (
            <TabsContent value="teaching" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {courses.slice(6, 8).map((course) => (
                  <CourseCard key={course.id} {...course} />
                ))}
              </div>
            </TabsContent>
          )}
        </Tabs>

        {/* Course Categories */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "Data Science", count: 42, color: "bg-blue-100 text-blue-700" },
              { name: "Programming", count: 65, color: "bg-purple-100 text-purple-700" },
              { name: "Design", count: 38, color: "bg-pink-100 text-pink-700" },
              { name: "Business", count: 53, color: "bg-green-100 text-green-700" },
              { name: "Marketing", count: 29, color: "bg-yellow-100 text-yellow-700" },
              { name: "AI & ML", count: 47, color: "bg-indigo-100 text-indigo-700" },
            ].map((category) => (
              <a
                key={category.name}
                href="#"
                className={`${category.color} rounded-lg p-4 text-center hover:shadow-md transition-shadow`}
              >
                <h3 className="font-bold">{category.name}</h3>
                <p className="text-sm">{category.count} courses</p>
              </a>
            ))}
          </div>
        </section>

        {/* Trending Courses */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Trending This Week</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.slice(2, 6).map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
