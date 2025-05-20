
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
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
      const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo: window.location.origin + '/reset-password',
      });
      
      if (error) {
        toast({
          title: "Error",
          description: error.message || "Unable to process your request.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      setIsSubmitted(true);
      toast({
        title: "Email sent",
        description: "If an account exists with this email, you will receive a password reset link.",
      });
    } catch (err) {
      console.error("Password reset request error:", err);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
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
                ? "Enter your email and we'll send you a password reset link" 
                : "Check your inbox for the reset link"}
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
                        Sending link...
                      </span>
                    ) : (
                      "Send Reset Link"
                    )}
                  </Button>
                </form>
              </Form>
            ) : (
              <div className="text-center space-y-6">
                <div className="bg-blue-50 text-blue-800 p-4 rounded-md">
                  <p>
                    If an account exists with <strong>{form.getValues().email}</strong>,
                    we've sent a password reset link.
                  </p>
                  <p className="mt-2 text-sm">
                    The link will expire in 24 hours.
                  </p>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/login')}
                >
                  Back to Login
                </Button>
              </div>
            )}
          </CardContent>
          
          {!isSubmitted && (
            <CardFooter className="flex justify-center">
              <Link to="/login" className="text-blue-500 hover:text-blue-700 inline-flex items-center gap-1">
                <ArrowLeft className="h-3 w-3" /> Back to login
              </Link>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
