
import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, MessageSquare, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [notifications] = useState(3);
  const [messages] = useState(2);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-500">KnowledgeCraft</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/dashboard" className="font-medium transition-colors hover:text-blue-500">
            Dashboard
          </Link>
          <Link to="/courses" className="font-medium transition-colors hover:text-blue-500">
            Courses
          </Link>
          <Link to="/learning-paths" className="font-medium transition-colors hover:text-blue-500">
            Learning Paths
          </Link>
          <Link to="/community" className="font-medium transition-colors hover:text-blue-500">
            Community
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <span className="absolute top-0 right-0 h-5 w-5 rounded-full bg-red-500 flex items-center justify-center text-xs text-white">
                {notifications}
              </span>
            )}
          </Button>
          
          <Button variant="ghost" size="icon" className="relative">
            <MessageSquare className="h-5 w-5" />
            {messages > 0 && (
              <span className="absolute top-0 right-0 h-5 w-5 rounded-full bg-red-500 flex items-center justify-center text-xs text-white">
                {messages}
              </span>
            )}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/avatar.png" alt="User" />
                  <AvatarFallback>
                    <User className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem>
                <Link to="/profile" className="flex w-full">My Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/settings" className="flex w-full">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
