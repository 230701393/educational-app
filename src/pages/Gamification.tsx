
import { useState } from "react";
import { useAchievementNotification } from "@/components/gamification/AchievementNotification";
import { Leaderboard } from "@/components/gamification/Leaderboard";
import { UserAchievements } from "@/components/profile/UserAchievements";
import { UserLevel } from "@/components/profile/UserLevel";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Flame, Target, BookOpen, Brain } from "lucide-react";

const Gamification = () => {
  const { showNotification } = useAchievementNotification();
  const [userPoints, setUserPoints] = useState(750);
  const [userLevel, setUserLevel] = useState(12);
  const [streakDays, setStreakDays] = useState(5);
  const [pointsToNextLevel, setPointsToNextLevel] = useState(250);
  
  // This function simulates earning an achievement
  const simulateEarnAchievement = () => {
    showNotification({
      type: "achievement",
      title: "New Achievement Unlocked!",
      description: "Dedicated Learner: Complete 10 courses",
      points: 100
    });
    setUserPoints(prevPoints => prevPoints + 100);
    checkLevelUp(userPoints + 100);
  };
  
  // This function simulates leveling up
  const simulateLevelUp = () => {
    const newLevel = userLevel + 1;
    setUserLevel(newLevel);
    showNotification({
      type: "level-up",
      title: "Level Up!",
      description: `You've reached Level ${newLevel}`,
      points: 250
    });
    setUserPoints(prevPoints => prevPoints + 250);
    setPointsToNextLevel(300); // Increase points needed for next level
  };
  
  // This function simulates claiming a streak bonus
  const claimStreakBonus = () => {
    const streakPoints = 10;
    showNotification({
      type: "streak",
      title: "Streak Bonus!",
      description: `${streakDays} day streak maintained`,
      points: streakPoints
    });
    setUserPoints(prevPoints => prevPoints + streakPoints);
    checkLevelUp(userPoints + streakPoints);
  };
  
  // This function simulates completing a daily challenge
  const completeDailyChallenge = () => {
    const challengePoints = 50;
    showNotification({
      type: "points",
      title: "Daily Challenge Complete!",
      description: "You've completed today's learning challenge",
      points: challengePoints
    });
    setUserPoints(prevPoints => prevPoints + challengePoints);
    checkLevelUp(userPoints + challengePoints);
  };
  
  // This function checks if user should level up
  const checkLevelUp = (newPoints: number) => {
    if (newPoints >= userPoints + pointsToNextLevel) {
      simulateLevelUp();
    }
  };
  
  // This function simulates extending streak
  const extendStreak = () => {
    setStreakDays(prevStreak => prevStreak + 1);
    showNotification({
      type: "streak",
      title: "Streak Extended!",
      description: `Your streak is now ${streakDays + 1} days`,
      points: 15
    });
    setUserPoints(prevPoints => prevPoints + 15);
    checkLevelUp(userPoints + 15);
  };
  
  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Gamification & Achievements</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <UserLevel 
          level={userLevel} 
          currentPoints={userPoints} 
          pointsToNextLevel={pointsToNextLevel} 
          streak={streakDays}
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
              <div className="text-xs text-muted-foreground">(+100 XP)</div>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              onClick={simulateLevelUp}
              className="h-auto py-6 flex flex-col items-center justify-center"
            >
              <Zap className="h-8 w-8 mb-2 text-amber-500" />
              <div className="text-lg font-medium">Level Up</div>
              <div className="text-xs text-muted-foreground">(+250 XP)</div>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              size="lg" 
              onClick={claimStreakBonus}
              className="h-auto py-6 flex flex-col items-center justify-center"
            >
              <Flame className="h-8 w-8 mb-2 text-red-500" />
              <div className="text-lg font-medium">Claim Streak Bonus</div>
              <div className="text-xs text-muted-foreground">(+10 XP)</div>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              onClick={extendStreak}
              className="h-auto py-6 flex flex-col items-center justify-center"
            >
              <Target className="h-8 w-8 mb-2 text-green-500" />
              <div className="text-lg font-medium">Extend Streak</div>
              <div className="text-xs text-muted-foreground">(+15 XP)</div>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              size="lg" 
              onClick={completeDailyChallenge}
              className="h-auto py-6 flex flex-col items-center justify-center"
            >
              <Brain className="h-8 w-8 mb-2 text-blue-500" />
              <div className="text-lg font-medium">Complete Challenge</div>
              <div className="text-xs text-muted-foreground">(+50 XP)</div>
            </Button>
            
            <Button 
              variant="default" 
              size="lg" 
              onClick={() => window.location.href = '/courses'}
              className="h-auto py-6 flex flex-col items-center justify-center bg-blue-600 hover:bg-blue-700"
            >
              <BookOpen className="h-8 w-8 mb-2" />
              <div className="text-lg font-medium">Take a Course</div>
              <div className="text-xs">Start Learning Now</div>
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
