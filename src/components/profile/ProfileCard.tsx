
import { Edit, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface ProfileCardProps {
  name: string;
  title?: string;
  bio?: string;
  interests?: string[];
  joinDate: string;
  avatarUrl?: string;
  isCurrentUser?: boolean;
}

export function ProfileCard({
  name,
  title,
  bio,
  interests,
  joinDate,
  avatarUrl,
  isCurrentUser = false,
}: ProfileCardProps) {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <Card className="max-w-md">
      <CardHeader className="relative pb-0 pt-6 text-center">
        {isCurrentUser && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-4 top-4"
          >
            <Settings className="h-4 w-4" />
          </Button>
        )}
        <Avatar className="h-24 w-24 mx-auto">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback className="text-xl font-semibold bg-purple-100 text-purple-700">
            {initials}
          </AvatarFallback>
        </Avatar>
        <h2 className="mt-4 text-xl font-bold">{name}</h2>
        {title && <p className="text-sm text-muted-foreground">{title}</p>}
      </CardHeader>
      <CardContent className="text-center pt-2">
        {bio && (
          <p className="text-sm text-gray-600 mb-4">{bio}</p>
        )}
        {interests && interests.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {interests.map((interest) => (
              <Badge key={interest} variant="secondary" className="text-xs font-normal">
                {interest}
              </Badge>
            ))}
          </div>
        )}
        <p className="text-xs text-muted-foreground">Member since {joinDate}</p>
      </CardContent>
      {isCurrentUser && (
        <CardFooter className="flex justify-center">
          <Button variant="outline" size="sm" className="gap-1">
            <Edit className="h-3.5 w-3.5" />
            Edit Profile
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
