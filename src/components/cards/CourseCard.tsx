
import { Book, Clock, Star, Users } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

interface CourseCardProps {
  id: string;
  title: string;
  instructor: string;
  category: string;
  level: string;
  duration: string;
  enrolled: number;
  rating: number;
  progress?: number;
  image?: string;
}

export function CourseCard({
  id,
  title,
  instructor,
  category,
  level,
  duration,
  enrolled,
  rating,
  progress,
  image,
}: CourseCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div 
        className="h-48 w-full bg-blue-100 relative" 
        style={image ? { backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
      >
        {!image && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Book className="h-12 w-12 text-blue-500" />
          </div>
        )}
        <Badge className="absolute top-3 right-3 bg-blue-500">{level}</Badge>
      </div>
      <CardHeader className="pb-2">
        <div className="space-y-1">
          <Badge variant="outline" className="text-xs font-normal text-gray-500">{category}</Badge>
          <h3 className="text-lg font-bold leading-tight truncate">{title}</h3>
          <p className="text-sm text-gray-500">by {instructor}</p>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            <Users className="mr-1 h-4 w-4" />
            <span>{enrolled.toLocaleString()}</span>
          </div>
          <div className="flex items-center">
            <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>
        {progress !== undefined && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Link 
          to={`/courses/${id}`}
          className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-center font-medium transition-colors"
        >
          {progress !== undefined && progress > 0 ? "Continue Learning" : "Start Course"}
        </Link>
      </CardFooter>
    </Card>
  );
}
