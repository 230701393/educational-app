
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/services/authService";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setIsLoading(true);
    
    try {
      const { success, error } = await authService.forgotPassword(values.email);
      
      if (!success || error) {
        toast({
          title: "Error",
          description: error || "Unable to send reset link. Please try again later.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // Show success message
      toast({
        title: "Reset email sent",
        description: "Please check your email for password reset instructions.",
      });
      
      setIsSubmitted(true);

      // In a production environment, the email would be sent by the backend
      // For demo purposes, we're logging to the console - check the browser console
      console.log("Note: In a real environment, an email would be sent. For this demo, check the console logs for the reset link.");
    } catch (err) {
      console.error("Password reset error:", err);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold text-blue-500">KnowledgeCraft</Link>
          <p className="text-muted-foreground mt-2">Reset your password</p>
        </div>
        
        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Forgot Password</CardTitle>
            <CardDescription className="text-center">
              {!isSubmitted
                ? "Enter your email and we'll send you a link to reset your password"
                : "Check your email for the reset link"}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {!isSubmitted ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              placeholder="you@example.com" 
                              className="pl-10" 
                              disabled={isLoading} 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> 
                        Sending reset link...
                      </span>
                    ) : (
                      "Send Reset Email"
                    )}
                  </Button>
                </form>
              </Form>
            ) : (
              <div className="text-center space-y-4">
                <div className="bg-green-50 text-green-800 p-4 rounded-md">
                  <p className="font-medium">Reset email sent!</p>
                  <p className="text-sm mt-1">
                    We've sent an email to <span className="font-semibold">{form.getValues().email}</span> with instructions to reset your password.
                  </p>
                  <p className="text-xs mt-2 text-green-700">
                    (Note: In this demo, check the browser console for the reset link)
                  </p>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => {
                    form.reset();
                    setIsSubmitted(false);
                  }}
                >
                  Try with different email
                </Button>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <div className="text-center text-sm text-muted-foreground">
              <Link to="/login" className="text-blue-500 hover:text-blue-700 inline-flex items-center gap-1">
                <ArrowLeft className="h-3 w-3" /> Back to login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
