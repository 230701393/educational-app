
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { CourseCard } from "@/components/cards/CourseCard";
import { PathCard } from "@/components/cards/PathCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Award,
  BookOpen,
  Edit2,
  MapPin,
  Save,
  User,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  
  // User profile data
  const userProfile = {
    name: "Alex Morgan",
    title: "Software Engineer",
    bio: "Passionate about learning new technologies and skills. Currently focusing on data science and AI.",
    interests: ["Programming", "Data Science", "UX Design", "AI"],
    joinDate: "January 2023",
    achievements: [
      { title: "Fast Learner", description: "Completed 5 courses in one month", icon: "🚀" },
      { title: "Quiz Master", description: "Scored 100% on 10 quizzes", icon: "🧠" },
      { title: "Consistent Learner", description: "Studied for 30 days in a row", icon: "📅" },
    ],
    certificates: [
      { name: "Data Science Fundamentals", issuer: "KnowledgeCraft", date: "March 2023" },
      { name: "UI/UX Design Principles", issuer: "KnowledgeCraft", date: "May 2023" },
    ]
  };

  // Mock course data
  const completedCourses = [
    {
      id: "5",
      title: "Digital Marketing Essentials",
      instructor: "Lisa Thompson",
      category: "Marketing",
      level: "Beginner",
      duration: "4 weeks",
      enrolled: 1820,
      rating: 4.6,
      progress: 100,
    },
    {
      id: "7",
      title: "Full Stack Web Development",
      instructor: "Alex Reynolds",
      category: "Web Development",
      level: "Intermediate",
      duration: "14 weeks",
      enrolled: 2780,
      rating: 4.8,
      progress: 100,
    },
  ];
  
  // Mock learning paths
  const learningPaths = [
    {
      id: "1",
      title: "Data Science Career Path",
      description: "Master the skills needed to become a data scientist, from statistics to machine learning.",
      courseCount: 7,
      difficulty: "Intermediate",
      estimatedTime: "6 months",
      progress: 45,
    },
    {
      id: "2",
      title: "Web Development Mastery",
      description: "Learn frontend and backend development to build complete web applications.",
      courseCount: 9,
      difficulty: "Beginner",
      estimatedTime: "8 months",
      progress: 25,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
          <p className="text-gray-600">Manage your profile information and track your learning progress.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="space-y-6">
            {/* Profile Card */}
            {!isEditing ? (
              <div className="relative">
                <ProfileCard
                  name={userProfile.name}
                  title={userProfile.title}
                  bio={userProfile.bio}
                  interests={userProfile.interests}
                  joinDate={userProfile.joinDate}
                  isCurrentUser={true}
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="absolute top-4 right-4"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit2 className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </div>
            ) : (
              <div className="bg-white rounded-lg border p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold">Edit Profile</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setIsEditing(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full bg-purple-100 flex items-center justify-center">
                      <User className="h-12 w-12 text-purple-700" />
                    </div>
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium" htmlFor="name">Name</label>
                    <Input id="name" defaultValue={userProfile.name} />
                  </div>
                  <div>
                    <label className="text-sm font-medium" htmlFor="title">Title</label>
                    <Input id="title" defaultValue={userProfile.title} />
                  </div>
                  <div>
                    <label className="text-sm font-medium" htmlFor="bio">Bio</label>
                    <Textarea id="bio" defaultValue={userProfile.bio} rows={3} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Interests</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {userProfile.interests.map((interest) => (
                        <Badge key={interest} variant="secondary" className="pl-2 pr-1 text-sm flex items-center">
                          {interest}
                          <button className="ml-1 rounded-full h-4 w-4 inline-flex items-center justify-center hover:bg-gray-200">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                      <Badge variant="outline" className="text-sm cursor-pointer">+ Add Interest</Badge>
                    </div>
                  </div>
                  <Button className="w-full mt-2">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            )}

            {/* Achievements */}
            <div className="bg-white rounded-lg border p-4">
              <h3 className="font-bold flex items-center mb-4">
                <Award className="mr-2 h-5 w-5 text-yellow-500" />
                Achievements
              </h3>
              <div className="space-y-3">
                {userProfile.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center text-xl mr-3">
                      {achievement.icon}
                    </div>
                    <div>
                      <h4 className="font-medium">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-3">
                View All Achievements
              </Button>
            </div>

            {/* Certificates */}
            <div className="bg-white rounded-lg border p-4">
              <h3 className="font-bold flex items-center mb-4">
                <BookOpen className="mr-2 h-5 w-5 text-green-500" />
                Certificates
              </h3>
              <div className="space-y-3">
                {userProfile.certificates.map((certificate, index) => (
                  <div key={index} className="border rounded-md p-3 bg-gray-50">
                    <h4 className="font-medium">{certificate.name}</h4>
                    <p className="text-sm text-gray-600">Issued by {certificate.issuer}</p>
                    <p className="text-xs text-gray-500 mt-1">{certificate.date}</p>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-3">
                View All Certificates
              </Button>
            </div>
          </div>

          {/* Right Column - Learning Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="courses">
              <TabsList className="mb-4">
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="paths">Learning Paths</TabsTrigger>
                <TabsTrigger value="activity">Learning Activity</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>
              
              <TabsContent value="courses" className="space-y-6">
                <section>
                  <h3 className="text-lg font-bold mb-3">Courses In Progress</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CourseCard
                      id="1"
                      title="Introduction to Data Science"
                      instructor="Dr. Sarah Johnson"
                      category="Data Science"
                      level="Beginner"
                      duration="8 weeks"
                      enrolled={2430}
                      rating={4.7}
                      progress={65}
                    />
                    <CourseCard
                      id="2"
                      title="Advanced Python Programming"
                      instructor="Michael Chen"
                      category="Programming"
                      level="Advanced"
                      duration="10 weeks"
                      enrolled={1850}
                      rating={4.8}
                      progress={32}
                    />
                  </div>
                </section>
                
                <section>
                  <h3 className="text-lg font-bold mb-3">Completed Courses</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {completedCourses.map((course) => (
                      <CourseCard key={course.id} {...course} />
                    ))}
                  </div>
                </section>
                
                <section>
                  <h3 className="text-lg font-bold mb-3">Recommended For You</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CourseCard
                      id="4"
                      title="Machine Learning Fundamentals"
                      instructor="Dr. James Wilson"
                      category="Artificial Intelligence"
                      level="Intermediate"
                      duration="12 weeks"
                      enrolled={3245}
                      rating={4.9}
                    />
                    <CourseCard
                      id="6"
                      title="Project Management Professional"
                      instructor="Robert Garcia"
                      category="Business"
                      level="Advanced"
                      duration="10 weeks"
                      enrolled={2105}
                      rating={4.7}
                    />
                  </div>
                </section>
              </TabsContent>
              
              <TabsContent value="paths" className="space-y-6">
                <section>
                  <h3 className="text-lg font-bold mb-3">Current Learning Paths</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {learningPaths.map((path) => (
                      <PathCard key={path.id} {...path} />
                    ))}
                  </div>
                </section>
                
                <section>
                  <h3 className="text-lg font-bold mb-3">Recommended Paths</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <PathCard
                      id="3"
                      title="UX/UI Design Path"
                      description="Master the fundamentals of user experience and interface design for digital products."
                      courseCount={5}
                      difficulty="Beginner"
                      estimatedTime="4 months"
                      featured={true}
                    />
                    <PathCard
                      id="4"
                      title="Machine Learning Engineer"
                      description="Complete curriculum to become a machine learning engineer with Python and TensorFlow."
                      courseCount={8}
                      difficulty="Advanced"
                      estimatedTime="9 months"
                    />
                  </div>
                </section>
              </TabsContent>
              
              <TabsContent value="activity">
                <div className="bg-white rounded-lg border p-6">
                  <h3 className="text-lg font-bold mb-4">Learning Activity</h3>
                  
                  {/* Weekly Activity Overview */}
                  <div className="mb-6">
                    <h4 className="text-md font-medium mb-3">Weekly Overview</h4>
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                        <div key={i} className="text-center text-sm font-medium">{day}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {[2, 0, 3, 1, 4, 2, 1].map((hours, i) => (
                        <div 
                          key={i} 
                          className={`h-12 rounded-md flex items-center justify-center text-xs font-medium ${
                            hours === 0 
                              ? 'bg-gray-100' 
                              : hours === 1 
                                ? 'bg-blue-100 text-blue-800' 
                                : hours === 2 
                                  ? 'bg-blue-200 text-blue-800' 
                                  : hours === 3 
                                    ? 'bg-blue-300 text-blue-800' 
                                    : 'bg-blue-400 text-blue-800'
                          }`}
                        >
                          {hours}h
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Recent Activity Timeline */}
                  <div>
                    <h4 className="text-md font-medium mb-3">Recent Activity</h4>
                    <div className="space-y-4">
                      {[
                        { 
                          action: "Completed lesson", 
                          target: "Data Visualization Fundamentals", 
                          course: "Data Science Fundamentals", 
                          time: "2 hours ago" 
                        },
                        { 
                          action: "Completed quiz", 
                          target: "Python Functions Quiz", 
                          course: "Advanced Python Programming", 
                          time: "Yesterday" 
                        },
                        { 
                          action: "Started course", 
                          target: "UX Research Fundamentals", 
                          time: "2 days ago" 
                        },
                        { 
                          action: "Earned achievement", 
                          target: "Fast Learner", 
                          time: "3 days ago" 
                        },
                      ].map((activity, index) => (
                        <div key={index} className="flex">
                          <div className="mr-3 relative">
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                              {activity.action.includes("Completed") 
                                ? "✓" 
                                : activity.action.includes("Started") 
                                  ? "▶" 
                                  : "🏆"}
                            </div>
                            {index < 3 && (
                              <div className="absolute top-8 bottom-0 left-1/2 w-0.5 bg-gray-200 -translate-x-1/2"></div>
                            )}
                          </div>
                          <div className="pb-4">
                            <p className="font-medium">{activity.action}: <span className="text-blue-600">{activity.target}</span></p>
                            {activity.course && (
                              <p className="text-sm text-gray-600">In {activity.course}</p>
                            )}
                            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="mt-2">
                      View Full Learning History
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="preferences">
                <div className="bg-white rounded-lg border p-6">
                  <h3 className="text-lg font-bold mb-4">Learning Preferences</h3>
                  
                  <div className="space-y-6">
                    {/* Learning Goals */}
                    <div>
                      <h4 className="text-md font-medium mb-3">Learning Goals</h4>
                      <div className="space-y-3 mb-4">
                        <div className="bg-blue-50 border border-blue-100 rounded-md p-3 flex items-start">
                          <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs mr-2 mt-0.5">1</div>
                          <div>
                            <p className="font-medium">Master Python Programming</p>
                            <p className="text-sm text-gray-600">2 courses in progress</p>
                          </div>
                          <Button variant="ghost" size="sm" className="ml-auto">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="bg-purple-50 border border-purple-100 rounded-md p-3 flex items-start">
                          <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-xs mr-2 mt-0.5">2</div>
                          <div>
                            <p className="font-medium">Learn Data Visualization</p>
                            <p className="text-sm text-gray-600">Next in learning path</p>
                          </div>
                          <Button variant="ghost" size="sm" className="ml-auto">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="bg-green-50 border border-green-100 rounded-md p-3 flex items-start">
                          <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs mr-2 mt-0.5">3</div>
                          <div>
                            <p className="font-medium">Complete UX Certificate</p>
                            <p className="text-sm text-gray-600">1 of 3 courses completed</p>
                          </div>
                          <Button variant="ghost" size="sm" className="ml-auto">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Button size="sm">
                        Add New Goal
                      </Button>
                    </div>
                    
                    {/* Learning Preferences */}
                    <div className="border-t pt-4">
                      <h4 className="text-md font-medium mb-3">Learning Style Preferences</h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <label className="text-sm font-medium">Visual vs Text-based Learning</label>
                            <span className="text-sm">70% Visual</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: "70%" }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <label className="text-sm font-medium">Theory vs Practical Exercises</label>
                            <span className="text-sm">60% Practical</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <div className="bg-purple-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <label className="text-sm font-medium">Preferred Learning Time</label>
                            <span className="text-sm">Morning</span>
                          </div>
                          <div className="flex space-x-2 mt-2">
                            {["Morning", "Afternoon", "Evening", "Night"].map((time) => (
                              <Button 
                                key={time} 
                                variant={time === "Morning" ? "default" : "outline"} 
                                size="sm"
                              >
                                {time}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Notification Preferences */}
                    <div className="border-t pt-4">
                      <h4 className="text-md font-medium mb-3">Notification Preferences</h4>
                      <div className="space-y-2">
                        {[
                          "Course recommendations",
                          "New lessons available",
                          "Assignment deadlines",
                          "Quiz reminders",
                          "Learning streak alerts"
                        ].map((pref) => (
                          <div key={pref} className="flex items-center justify-between border p-3 rounded-md">
                            <label className="font-medium">{pref}</label>
                            <div className="flex space-x-2">
                              <Button 
                                variant={pref !== "Quiz reminders" ? "default" : "outline"} 
                                size="sm"
                              >
                                Email
                              </Button>
                              <Button 
                                variant="default"
                                size="sm"
                              >
                                In-app
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button className="w-full">
                      Save Preferences
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
