
import { BadgeCheck, Star, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type NotificationType = "achievement" | "level-up" | "streak" | "points";

interface NotificationData {
  type: NotificationType;
  title: string;
  description: string;
  points?: number;
}

export function useAchievementNotification() {
  const { toast } = useToast();
  
  const showNotification = (data: NotificationData) => {
    let iconElement;
    
    switch (data.type) {
      case "achievement":
        iconElement = <BadgeCheck className="h-5 w-5 text-green-500" />;
        break;
      case "level-up":
        iconElement = <Trophy className="h-5 w-5 text-yellow-500" />;
        break;
      case "streak":
      case "points":
        iconElement = <Star className="h-5 w-5 text-amber-500" />;
        break;
    }
    
    toast({
      title: data.title,
      description: (
        <div className="flex flex-col">
          {iconElement && (
            <div className="mb-2">{iconElement}</div>
          )}
          <span>{data.description}</span>
          {data.points && (
            <span className="text-blue-600 font-medium mt-1">+{data.points} XP</span>
          )}
        </div>
      ),
      variant: "default",
      duration: 5000,
    });
  };
  
  return { showNotification };
}
