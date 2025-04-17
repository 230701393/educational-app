
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle } from "lucide-react";

interface QuizQuestionProps {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  onAnswer: (isCorrect: boolean) => void;
}

export function QuizQuestion({ 
  question, 
  options, 
  correctAnswer, 
  explanation,
  onAnswer 
}: QuizQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = () => {
    if (selectedOption !== null) {
      const isCorrect = selectedOption === correctAnswer;
      setIsSubmitted(true);
      onAnswer(isCorrect);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">{question}</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          value={selectedOption?.toString()} 
          onValueChange={(value) => !isSubmitted && setSelectedOption(parseInt(value))}
          className="space-y-3"
        >
          {options.map((option, index) => (
            <div 
              key={index} 
              className={`flex items-center space-x-2 rounded-md border p-3 ${
                isSubmitted && index === correctAnswer ? 'bg-green-50 border-green-200' : 
                isSubmitted && selectedOption === index && index !== correctAnswer ? 'bg-red-50 border-red-200' :
                'hover:bg-accent'
              }`}
            >
              <RadioGroupItem value={index.toString()} id={`option-${index}`} disabled={isSubmitted} />
              <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                {option}
              </Label>
              {isSubmitted && index === correctAnswer && (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              )}
              {isSubmitted && selectedOption === index && index !== correctAnswer && (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
            </div>
          ))}
        </RadioGroup>
        
        {isSubmitted && explanation && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-md text-sm">
            <p className="font-medium">Explanation:</p>
            <p className="mt-1 text-gray-700">{explanation}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!isSubmitted ? (
          <Button 
            onClick={handleSubmit} 
            disabled={selectedOption === null}
            className="w-full"
          >
            Submit Answer
          </Button>
        ) : (
          <Button variant="outline" className="w-full">
            Next Question
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
