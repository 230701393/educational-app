
import { useAchievementNotification } from "@/components/gamification/AchievementNotification";
import { Leaderboard } from "@/components/gamification/Leaderboard";
import { UserAchievements } from "@/components/profile/UserAchievements";
import { UserLevel } from "@/components/profile/UserLevel";
import { Button } from "@/components/ui/button";
import { Shield, Zap } from "lucide-react";

const Gamification = () => {
  const { showNotification } = useAchievementNotification();
  
  // This function simulates earning an achievement
  const simulateEarnAchievement = () => {
    showNotification({
      type: "achievement",
      title: "New Achievement Unlocked!",
      description: "Dedicated Learner: Complete 10 courses",
      points: 100
    });
  };
  
  // This function simulates leveling up
  const simulateLevelUp = () => {
    showNotification({
      type: "level-up",
      title: "Level Up!",
      description: "You've reached Level 13",
      points: 250
    });
  };
  
  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Gamification & Achievements</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <UserLevel 
          level={12} 
          currentPoints={750} 
          pointsToNextLevel={250} 
          streak={5}
        />
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              size="lg" 
              onClick={simulateEarnAchievement}
              className="h-auto py-6 flex flex-col items-center justify-center"
            >
              <Shield className="h-8 w-8 mb-2 text-purple-500" />
              <div className="text-lg font-medium">Unlock Achievement</div>
              <div className="text-xs text-muted-foreground">(Simulation)</div>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              onClick={simulateLevelUp}
              className="h-auto py-6 flex flex-col items-center justify-center"
            >
              <Zap className="h-8 w-8 mb-2 text-amber-500" />
              <div className="text-lg font-medium">Level Up</div>
              <div className="text-xs text-muted-foreground">(Simulation)</div>
            </Button>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg text-sm">
            <p className="font-medium mb-2">About Gamification</p>
            <p className="text-muted-foreground">
              Gamification elements enhance your learning experience with rewards for your progress.
              Earn points by completing courses, quizzes, and daily learning streaks.
              Unlock achievements and climb the leaderboard to showcase your dedication!
            </p>
          </div>
        </div>
      </div>
      
      <UserAchievements />
      
      <Leaderboard />
    </div>
  );
};

export default Gamification;
