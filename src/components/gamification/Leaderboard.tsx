
import { Medal, Trophy, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";

interface LeaderboardEntry {
  id: string;
  name: string;
  avatar?: string;
  points: number;
  level: number;
  rank: number;
  isCurrentUser?: boolean;
}

export function Leaderboard() {
  const isMobile = useIsMobile();
  
  // Sample leaderboard data - in a real app, this would come from an API
  const leaderboardData: LeaderboardEntry[] = [
    {
      id: "1",
      name: "Alex Johnson",
      avatar: "/placeholder.svg",
      points: 8750,
      level: 12,
      rank: 1,
    },
    {
      id: "2",
      name: "Morgan Smith",
      avatar: "/placeholder.svg",
      points: 7560,
      level: 11,
      rank: 2,
    },
    {
      id: "3",
      name: "Jamie Williams",
      avatar: "/placeholder.svg",
      points: 6820,
      level: 10,
      rank: 3,
    },
    {
      id: "4",
      name: "Taylor Brown",
      avatar: "/placeholder.svg",
      points: 5930,
      level: 9,
      rank: 4,
      isCurrentUser: true,
    },
    {
      id: "5",
      name: "Casey Davis",
      avatar: "/placeholder.svg",
      points: 5450,
      level: 8,
      rank: 5,
    },
    {
      id: "6",
      name: "Jordan Miller",
      avatar: "/placeholder.svg",
      points: 4980,
      level: 8,
      rank: 6,
    },
    {
      id: "7",
      name: "Riley Wilson",
      avatar: "/placeholder.svg",
      points: 4670,
      level: 7,
      rank: 7,
    },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-sm font-medium">{rank}</span>;
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Leaderboard</CardTitle>
          <Badge variant="outline" className="font-normal">This Month</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {leaderboardData.map((entry) => (
            <div 
              key={entry.id} 
              className={`flex items-center p-3 rounded-md ${
                entry.isCurrentUser ? 'bg-blue-50 border border-blue-100' : 'hover:bg-gray-50'
              }`}
            >
              <div className="w-8 flex justify-center mr-3">
                {getRankIcon(entry.rank)}
              </div>
              
              <Avatar className="h-8 w-8 mr-3">
                <AvatarImage src={entry.avatar} alt={entry.name} />
                <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">
                  {entry.name}
                  {entry.isCurrentUser && !isMobile && (
                    <Badge variant="outline" className="ml-2 text-xs font-normal">You</Badge>
                  )}
                </div>
                {!isMobile && (
                  <div className="text-xs text-muted-foreground">Level {entry.level}</div>
                )}
              </div>
              
              <div className="text-right">
                <div className="font-medium">{entry.points.toLocaleString()} XP</div>
                {isMobile && (
                  <div className="text-xs text-muted-foreground">Level {entry.level}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
