
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { QuizQuestion } from "@/components/quiz/QuizQuestion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Timer, CheckCircle, ArrowRight, ChevronLeft, Award } from "lucide-react";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  
  // Sample quiz data
  const quizData = {
    title: "Learning Platforms Fundamentals",
    totalQuestions: 5,
    passScore: 80,
    timeLimit: "10 minutes",
    questions: [
      {
        question: "What is the primary benefit of structured learning paths?",
        options: [
          "They require less time to complete",
          "They provide a guided sequence toward mastering skills",
          "They are always created by experts",
          "They eliminate the need for assessments"
        ],
        correctAnswer: 1,
        explanation: "Structured learning paths provide learners with a clear, guided sequence of courses that leads toward mastering specific skills or achieving certifications."
      },
      {
        question: "Which feature allows instructors to evaluate learner understanding most effectively?",
        options: [
          "Profile customization",
          "Course recommendation algorithms",
          "Interactive quizzes and assignments",
          "Video playback speed control"
        ],
        correctAnswer: 2,
        explanation: "Interactive quizzes and assignments provide instructors with direct feedback on learner comprehension and allow them to assess understanding of key concepts."
      },
      {
        question: "What is the main purpose of personalized learning profiles?",
        options: [
          "To collect user data for marketing",
          "To adapt to learner preferences and goals",
          "To rank learners against each other",
          "To restrict access to certain courses"
        ],
        correctAnswer: 1,
        explanation: "Personalized learning profiles adapt to learner preferences, goals, and progress to enhance engagement and provide tailored educational experiences."
      },
      {
        question: "Which of the following is NOT typically a component of a course creation tool?",
        options: [
          "Video upload functionality",
          "Quiz builder",
          "Social media integration",
          "Text editor for lessons"
        ],
        correctAnswer: 2,
        explanation: "While some platforms may offer social media sharing options, social media integration is not a core component of course creation tools, which typically focus on content creation, assessment building, and course structure."
      },
      {
        question: "How do adaptive learning paths differ from standard learning paths?",
        options: [
          "They are always shorter",
          "They adjust based on learner performance and preferences",
          "They only contain video content",
          "They don't include assessments"
        ],
        correctAnswer: 1,
        explanation: "Adaptive learning paths automatically adjust content, pace, and difficulty based on learner performance, preferences, and progress to create a more personalized learning experience."
      }
    ]
  };
  
  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    
    // Delay to allow user to see the answer explanation
    setTimeout(() => {
      if (currentQuestion < quizData.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setCompleted(true);
      }
    }, 1500);
  };
  
  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setCompleted(false);
    setTimeLeft(600);
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const percentScore = Math.round((score / quizData.totalQuestions) * 100);
  const isPassing = percentScore >= quizData.passScore;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container py-6">
        <div className="mb-6">
          <Button variant="ghost" className="mb-4">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Course
          </Button>
          <h1 className="text-3xl font-bold mb-2">{quizData.title}</h1>
          <p className="text-gray-600">Test your understanding of the fundamentals of learning platforms.</p>
        </div>

        {!completed ? (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg border p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <span className="text-sm font-medium">Question {currentQuestion + 1} of {quizData.totalQuestions}</span>
                </div>
                <div className="flex items-center">
                  <Timer className="h-4 w-4 text-orange-500 mr-1" />
                  <span className="text-sm font-medium">{formatTime(timeLeft)} remaining</span>
                </div>
              </div>
              <Progress value={(currentQuestion / quizData.totalQuestions) * 100} className="h-2" />
            </div>
            
            <QuizQuestion
              question={quizData.questions[currentQuestion].question}
              options={quizData.questions[currentQuestion].options}
              correctAnswer={quizData.questions[currentQuestion].correctAnswer}
              explanation={quizData.questions[currentQuestion].explanation}
              onAnswer={handleAnswer}
            />
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader className={`text-center ${isPassing ? 'bg-green-50' : 'bg-orange-50'} rounded-t-lg`}>
                <div className="mx-auto my-6">
                  {isPassing ? (
                    <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                      <CheckCircle className="h-12 w-12 text-green-600" />
                    </div>
                  ) : (
                    <div className="h-24 w-24 rounded-full bg-orange-100 flex items-center justify-center mx-auto">
                      <Award className="h-12 w-12 text-orange-600" />
                    </div>
                  )}
                </div>
                <CardTitle className="text-2xl">
                  {isPassing ? 'Congratulations!' : 'Nice Try!'}
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  {isPassing 
                    ? 'You have successfully passed the quiz!' 
                    : 'You didn\'t quite reach the passing score. Review the material and try again!'}
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-4xl font-bold">{score}/{quizData.totalQuestions}</p>
                    <p className="text-sm text-gray-600">Questions answered correctly</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Your Score</span>
                      <span className="font-medium">{percentScore}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${isPassing ? 'bg-green-500' : 'bg-orange-500'}`} 
                        style={{ width: `${percentScore}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Passing Score</span>
                      <span className="font-medium">{quizData.passScore}%</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <Button variant="outline" onClick={restartQuiz}>
                      Try Again
                    </Button>
                    <Button>
                      {isPassing ? 'Continue to Next Module' : 'Review Material'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
