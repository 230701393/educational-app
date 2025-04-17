
import { ArrowUpRight, Flame } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface UserLevelProps {
  level: number;
  currentPoints: number;
  pointsToNextLevel: number;
  streak: number;
}

export function UserLevel({ 
  level, 
  currentPoints, 
  pointsToNextLevel,
  streak
}: UserLevelProps) {
  const totalPointsNeeded = currentPoints + pointsToNextLevel;
  const progress = (currentPoints / totalPointsNeeded) * 100;
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">Your Learning Level</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg">
            <div className="text-5xl font-bold text-blue-600 mb-1">{level}</div>
            <div className="text-sm text-blue-600">Current Level</div>
          </div>
          
          <div className="flex flex-col space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Level Progress</span>
                <span className="text-sm font-medium">{currentPoints}/{totalPointsNeeded} XP</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="mt-1 text-xs text-right text-muted-foreground">
                {pointsToNextLevel} XP to Level {level + 1}
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              className="flex items-center justify-between p-3 bg-amber-50 rounded-md hover:bg-amber-100 h-auto"
              onClick={() => window.location.href = '/dashboard'}
            >
              <div className="flex items-center">
                <Flame className="h-5 w-5 text-amber-500 mr-2" />
                <span className="font-medium">{streak} day streak!</span>
              </div>
              <div className="text-xs text-amber-600 font-medium flex items-center">
                +10 XP bonus <ArrowUpRight className="ml-1 h-3 w-3" />
              </div>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
