
import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/services/authService";

const resetPasswordSchema = z.object({
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(100)
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setIsTokenValid(false);
        toast({
          title: "Invalid reset link",
          description: "The password reset link is invalid or has expired.",
          variant: "destructive",
        });
        return;
      }

      try {
        const { valid } = await authService.verifyResetToken(token);
        setIsTokenValid(valid);
        
        if (!valid) {
          toast({
            title: "Invalid reset link",
            description: "The password reset link is invalid or has expired.",
            variant: "destructive",
          });
        }
      } catch (err) {
        console.error("Token verification error:", err);
        setIsTokenValid(false);
        toast({
          title: "Error",
          description: "An error occurred while verifying your reset link.",
          variant: "destructive",
        });
      }
    };

    verifyToken();
  }, [token, toast]);

  const onSubmit = async (values: ResetPasswordFormValues) => {
    if (!token) return;
    setIsLoading(true);
    
    try {
      const { success, error } = await authService.resetPassword(token, values.password);
      
      if (!success || error) {
        toast({
          title: "Error",
          description: error || "Unable to reset password. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      toast({
        title: "Password reset successful",
        description: "Your password has been reset successfully. You can now log in with your new password.",
      });
      
      setIsCompleted(true);
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

  const handleLoginClick = () => {
    navigate('/login');
  };

  if (isTokenValid === null) {
    // Loading state
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
              <p className="mt-4">Verifying your reset link...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isTokenValid === false) {
    // Invalid token
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="text-2xl font-bold text-blue-500">KnowledgeCraft</Link>
          </div>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Invalid Reset Link</CardTitle>
              <CardDescription className="text-center">
                The password reset link is invalid or has expired.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex flex-col gap-4">
                <Button onClick={() => navigate('/forgot-password')} variant="outline">
                  Request a new reset link
                </Button>
                <Button onClick={() => navigate('/login')}>
                  Back to Login
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold text-blue-500">KnowledgeCraft</Link>
          <p className="text-muted-foreground mt-2">Create a new password</p>
        </div>
        
        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
            <CardDescription className="text-center">
              {!isCompleted
                ? "Please enter your new password"
                : "Your password has been reset successfully"}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {!isCompleted ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              type="password"
                              placeholder="Enter your new password" 
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
                  
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              type="password"
                              placeholder="Confirm your new password" 
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
                        Resetting password...
                      </span>
                    ) : (
                      "Reset Password"
                    )}
                  </Button>
                </form>
              </Form>
            ) : (
              <div className="text-center space-y-4">
                <div className="bg-green-50 text-green-800 p-4 rounded-md">
                  <p className="font-medium">Password reset complete!</p>
                  <p className="text-sm mt-1">
                    Your password has been reset successfully. You can now log in with your new password.
                  </p>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={handleLoginClick}
                >
                  Go to Login
                </Button>
              </div>
            )}
          </CardContent>
          
          {!isCompleted && (
            <CardFooter className="flex justify-center">
              <div className="text-center text-sm text-muted-foreground">
                <Link to="/login" className="text-blue-500 hover:text-blue-700 inline-flex items-center gap-1">
                  <ArrowLeft className="h-3 w-3" /> Back to login
                </Link>
              </div>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
