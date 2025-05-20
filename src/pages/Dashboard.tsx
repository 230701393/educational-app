
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ProgressStats } from "@/components/dashboard/ProgressStats";
import { EnrolledCourses } from "@/components/dashboard/EnrolledCourses";
import { RecommendedPaths } from "@/components/dashboard/RecommendedPaths";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, MapPin, Award, Settings, UserPlus } from "lucide-react";

function Dashboard() {
  const { user, isAuthenticated, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-6">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold">Welcome to LEarnX</h1>
          <p className="text-gray-600 max-w-md">
            Please log in or sign up to access your learning dashboard
          </p>
        </div>
        <div className="flex gap-4">
          <Button onClick={() => navigate("/login")}>Login</Button>
          <Button variant="outline" onClick={() => navigate("/signup")}>
            Sign Up
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user?.fullName || "Learner"}</h1>
          <p className="text-gray-600 mt-1">Track your progress and continue learning</p>
        </div>
        
        <div className="flex space-x-4">
          {isAdmin && (
            <Button onClick={() => navigate("/admin")} className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>Admin Panel</span>
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <ProgressStats />
      </div>

      <div className="space-y-10">
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">My Courses</h2>
            <Button variant="outline" onClick={() => navigate("/courses")}>
              <BookOpen className="mr-2 h-4 w-4" />
              <span>Browse All Courses</span>
            </Button>
          </div>
          <EnrolledCourses />
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Learning Paths</h2>
            <Button variant="outline" onClick={() => navigate("/learning-paths")}>
              <MapPin className="mr-2 h-4 w-4" />
              <span>View All Paths</span>
            </Button>
          </div>
          <RecommendedPaths />
        </div>

        <div className="my-10">
          <h2 className="text-2xl font-bold mb-6">My Achievements</h2>
          <div className="bg-gray-50 rounded-lg p-8 text-center border">
            <Award className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium mb-2">No Achievements Yet</h3>
            <p className="text-gray-600 mb-6">
              Complete courses and quizzes to earn certificates and badges
            </p>
            <Button onClick={() => navigate("/courses")}>
              Start Learning
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
