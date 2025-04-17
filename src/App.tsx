
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import LearningPaths from "./pages/LearningPaths";
import Profile from "./pages/Profile";
import CourseBuilder from "./pages/CourseBuilder";
import Quiz from "./pages/Quiz";
import Analytics from "./pages/Analytics";
import Gamification from "./pages/Gamification";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/learning-paths" element={<LearningPaths />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/course-builder" element={<CourseBuilder />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/gamification" element={<Gamification />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
