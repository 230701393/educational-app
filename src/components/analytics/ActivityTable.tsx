
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Award, CheckCircle, Clock, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ActivityTable() {
  const quizActivities = [
    {
      id: 1,
      quiz: "Data Science Fundamentals",
      date: "2025-04-15",
      score: 92,
      timeTaken: "14:32",
      passed: true,
    },
    {
      id: 2,
      quiz: "Python Variables and Data Types",
      date: "2025-04-12",
      score: 88,
      timeTaken: "12:45",
      passed: true,
    },
    {
      id: 3,
      quiz: "Machine Learning Concepts",
      date: "2025-04-05",
      score: 65,
      timeTaken: "18:23",
      passed: false,
    },
    {
      id: 4,
      quiz: "UX Research Methods",
      date: "2025-03-28",
      score: 95,
      timeTaken: "15:10",
      passed: true,
    },
    {
      id: 5,
      quiz: "Design Principles",
      date: "2025-03-23",
      score: 82,
      timeTaken: "16:45",
      passed: true,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Quiz Activities</CardTitle>
        <CardDescription>Your most recent quiz attempts and scores</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Quiz</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Time Taken</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quizActivities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell className="font-medium">{activity.quiz}</TableCell>
                <TableCell>{activity.date}</TableCell>
                <TableCell>
                  {activity.score}%
                  {activity.score >= 90 && <Award className="inline ml-1 h-4 w-4 text-yellow-500" />}
                </TableCell>
                <TableCell className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-gray-500" />
                  {activity.timeTaken}
                </TableCell>
                <TableCell>
                  {activity.passed ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <CheckCircle className="mr-1 h-3 w-3" /> Passed
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      <XCircle className="mr-1 h-3 w-3" /> Failed
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
