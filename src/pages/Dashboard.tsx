
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ProgressStats } from "@/components/dashboard/ProgressStats";
import { EnrolledCourses } from "@/components/dashboard/EnrolledCourses";
import { RecommendedPaths } from "@/components/dashboard/RecommendedPaths";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, MapPin, Award, Settings, UserPlus } from "lucide-react";
import { useEffect } from "react";

function Dashboard() {
  const { user, isAuthenticated, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated users to Analytics page
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate("/analytics");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // Only show dashboard content for non-authenticated users
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-6">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold">Welcome to KnowledgeCraft</h1>
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

  // This part should never execute due to the redirect, but included as a fallback
  return null;
}

export default Dashboard;
