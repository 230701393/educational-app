
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart } from "@/components/analytics/Charts";
import { ProgressStats } from "@/components/dashboard/ProgressStats";
import { ActivityTable } from "@/components/analytics/ActivityTable";
import { SkillsRadar } from "@/components/analytics/SkillsRadar";
import { LearningTimeCard } from "@/components/analytics/LearningTimeCard";

export default function Analytics() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Learning Analytics</h1>
          <p className="text-gray-600">Track your progress and gain insights into your learning journey.</p>
        </div>

        <Tabs defaultValue="overview" className="mb-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Course Progress</TabsTrigger>
            <TabsTrigger value="quiz">Quiz Performance</TabsTrigger>
            <TabsTrigger value="skills">Skills Analysis</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <ProgressStats />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Learning Activity</CardTitle>
                  <CardDescription>Hours spent learning per day</CardDescription>
                </CardHeader>
                <CardContent>
                  <BarChart />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Course Completion Trend</CardTitle>
                  <CardDescription>Progress over the last 3 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <LineChart />
                </CardContent>
              </Card>
            </div>
            
            <LearningTimeCard />
          </TabsContent>
          
          {/* Course Progress Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {["Introduction to Data Science", "Advanced Python Programming", "UX Research Fundamentals"].map((course, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{course}</CardTitle>
                    <CardDescription>
                      {index === 0 ? "65% complete" : index === 1 ? "32% complete" : "78% complete"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress 
                      value={index === 0 ? 65 : index === 1 ? 32 : 78} 
                      className="h-2 mb-2" 
                    />
                    <div className="grid grid-cols-3 text-sm mt-4">
                      <div>
                        <p className="text-muted-foreground">Modules</p>
                        <p className="font-medium">{index === 0 ? "5/8" : index === 1 ? "3/10" : "7/9"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Quizzes</p>
                        <p className="font-medium">{index === 0 ? "3/5" : index === 1 ? "2/8" : "6/8"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Avg. Score</p>
                        <p className="font-medium">{index === 0 ? "87%" : index === 1 ? "92%" : "76%"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Quiz Performance Tab */}
          <TabsContent value="quiz" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quiz Score Distribution</CardTitle>
                  <CardDescription>Performance across all quizzes</CardDescription>
                </CardHeader>
                <CardContent>
                  <PieChart />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Performance by Topic</CardTitle>
                  <CardDescription>Strengths and areas for improvement</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {[
                      { topic: "Data Analysis", score: 92 },
                      { topic: "Programming Concepts", score: 88 },
                      { topic: "Machine Learning", score: 76 },
                      { topic: "User Experience", score: 95 },
                      { topic: "Design Principles", score: 82 }
                    ].map((item) => (
                      <div key={item.topic}>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>{item.topic}</span>
                          <span className="font-medium">{item.score}%</span>
                        </div>
                        <Progress value={item.score} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <ActivityTable />
          </TabsContent>
          
          {/* Skills Analysis Tab */}
          <TabsContent value="skills" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Skills Radar</CardTitle>
                  <CardDescription>Competency levels across various skills</CardDescription>
                </CardHeader>
                <CardContent>
                  <SkillsRadar />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Focus Areas</CardTitle>
                  <CardDescription>Based on your performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {[
                      { skill: "Statistical Analysis", level: "Intermediate", action: "Take advanced statistics course" },
                      { skill: "Deep Learning", level: "Beginner", action: "Complete neural networks tutorial" },
                      { skill: "UI Prototyping", level: "Advanced", action: "Practice with real-world projects" }
                    ].map((item) => (
                      <li key={item.skill} className="border-b pb-3 last:border-0 last:pb-0">
                        <p className="font-medium">{item.skill}</p>
                        <p className="text-sm text-muted-foreground">Current level: {item.level}</p>
                        <p className="text-sm text-blue-600 mt-1">Action: {item.action}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
