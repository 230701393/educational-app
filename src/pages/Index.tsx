
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-3xl text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-600">
          KnowledgeCraft
        </h1>
        <p className="text-2xl text-gray-700 mb-8">
          Your personalized learning journey begins here
        </p>
        <div className="space-y-4 max-w-md mx-auto">
          <p className="text-gray-600">
            Craft your unique learning experience with personalized profiles, adaptive paths, interactive assessments, and detailed progress tracking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="w-full bg-blue-500 hover:bg-blue-600">
                Go to Dashboard
              </Button>
            </Link>
            <Link to="/analytics">
              <Button size="lg" variant="outline" className="w-full">
                View Analytics
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
