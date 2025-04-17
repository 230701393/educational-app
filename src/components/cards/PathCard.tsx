
import { MapPin } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface PathCardProps {
  id: string;
  title: string;
  description: string;
  courseCount: number;
  difficulty: string;
  estimatedTime: string;
  progress?: number;
  featured?: boolean;
}

export function PathCard({
  id,
  title,
  description,
  courseCount,
  difficulty,
  estimatedTime,
  progress,
  featured = false,
}: PathCardProps) {
  return (
    <Card className={`overflow-hidden hover:shadow-md transition-shadow duration-200 ${featured ? 'border-purple-300 bg-purple-50/50' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge className={`${difficulty === 'Beginner' ? 'bg-green-500' : difficulty === 'Intermediate' ? 'bg-blue-500' : 'bg-purple-500'}`}>
            {difficulty}
          </Badge>
          {featured && (
            <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
              Featured
            </Badge>
          )}
        </div>
        <h3 className="text-lg font-bold leading-tight mt-2">{title}</h3>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center">
            <MapPin className="mr-1 h-4 w-4" />
            <span>{courseCount} courses</span>
          </div>
          <span>{estimatedTime}</span>
        </div>
        {progress !== undefined && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Path Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className={`h-2 ${featured ? 'bg-purple-100' : ''}`} />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <a 
          href={`/learning-paths/${id}`} 
          className={`w-full py-2 px-4 text-white rounded-md text-center font-medium transition-colors ${
            featured 
              ? 'bg-purple-500 hover:bg-purple-600' 
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {progress !== undefined && progress > 0 ? "Continue Path" : "Start Path"}
        </a>
      </CardFooter>
    </Card>
  );
}
