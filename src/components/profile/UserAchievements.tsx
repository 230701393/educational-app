
import { Shield, Award, Trophy, Zap, Star, BadgeCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface AchievementProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  progress?: number;
  date?: string;
}

export function UserAchievements() {
  // Sample achievements data - in a real app, this would come from an API
  const achievements: AchievementProps[] = [
    {
      id: "1",
      title: "First Steps",
      description: "Complete your first course",
      icon: <Star className="h-6 w-6 text-yellow-500" />,
      earned: true,
      date: "2024-03-15",
    },
    {
      id: "2",
      title: "Quiz Master",
      description: "Score 100% on 5 different quizzes",
      icon: <Trophy className="h-6 w-6 text-amber-500" />,
      earned: true,
      date: "2024-03-28",
    },
    {
      id: "3",
      title: "Dedicated Learner",
      description: "Complete 10 courses",
      icon: <Award className="h-6 w-6 text-blue-500" />,
      earned: false,
      progress: 70,
    },
    {
      id: "4",
      title: "Path Pioneer",
      description: "Complete your first learning path",
      icon: <Shield className="h-6 w-6 text-purple-500" />,
      earned: false,
      progress: 45,
    },
    {
      id: "5",
      title: "Discussion Leader",
      description: "Create 20 forum posts that receive replies",
      icon: <Zap className="h-6 w-6 text-orange-500" />,
      earned: false,
      progress: 30,
    },
    {
      id: "6",
      title: "Certificate Collector",
      description: "Earn 3 certificates",
      icon: <BadgeCheck className="h-6 w-6 text-green-500" />,
      earned: true,
      date: "2024-04-10",
    },
  ];

  const earnedCount = achievements.filter(a => a.earned).length;

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Achievements</CardTitle>
          <Badge variant="outline" className="font-normal text-xs">
            {earnedCount}/{achievements.length} Earned
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <Card 
              key={achievement.id} 
              className={`border ${achievement.earned ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-full ${achievement.earned ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    {achievement.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{achievement.title}</h3>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                </div>
                
                {achievement.earned ? (
                  <div className="mt-3 text-xs text-right text-muted-foreground">
                    Earned on {achievement.date}
                  </div>
                ) : (
                  <div className="mt-3 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span>{achievement.progress}%</span>
                    </div>
                    <Progress value={achievement.progress} className="h-2" />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
