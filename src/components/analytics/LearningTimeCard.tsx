
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Award, Calendar, TrendingUp } from "lucide-react";

export function LearningTimeCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Clock className="h-4 w-4 text-blue-500 mr-2" />
            Total Learning Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">87 hours</div>
          <p className="text-xs text-muted-foreground">
            Across all courses
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Award className="h-4 w-4 text-green-500 mr-2" />
            Learning Streak
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">9 days</div>
          <p className="text-xs text-muted-foreground">
            Current streak
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Calendar className="h-4 w-4 text-purple-500 mr-2" />
            Most Active Day
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Saturday</div>
          <p className="text-xs text-muted-foreground">
            3.5 hours on average
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <TrendingUp className="h-4 w-4 text-orange-500 mr-2" />
            Weekly Growth
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+12%</div>
          <p className="text-xs text-muted-foreground">
            Compared to last week
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
