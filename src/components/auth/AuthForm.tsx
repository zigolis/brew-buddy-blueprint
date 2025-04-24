import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Mail, User, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    if (email === "ibeer@ibeer.com" && password === "123") {
      toast({
        title: "Success!",
        description: "Welcome to iBeer Pro!",
      });
      
      localStorage.setItem('ibeer-authenticated', 'true');
      
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid credentials. Try ibeer@ibeer.com / 123",
      });
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto border-primary/10 shadow-lg backdrop-blur-sm bg-background/95">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          {activeTab === "login" ? "Welcome back" : "Create your account"}
        </CardTitle>
        <CardDescription className="text-center">
          {activeTab === "login" 
            ? "Enter your email below to login to your account" 
            : "Enter your information to create an account"}
        </CardDescription>
      </CardHeader>
      <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="login" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Login</TabsTrigger>
          <TabsTrigger value="register" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Register</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="email"
                    name="email"
                    placeholder="ibeer@ibeer.com"
                    type="email" 
                    autoComplete="email" 
                    required 
                    className="pl-10 transition-colors focus:border-primary"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a 
                    href="#" 
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="password"
                    name="password"
                    type="password" 
                    autoComplete="current-password" 
                    required 
                    className="pl-10 transition-colors focus:border-primary"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full group" 
                type="submit" 
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
        
        <TabsContent value="register">
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    required 
                    className="pl-10 transition-colors focus:border-primary"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    placeholder="email@example.com" 
                    type="email" 
                    autoComplete="email" 
                    required 
                    className="pl-10 transition-colors focus:border-primary"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="password" 
                    type="password" 
                    autoComplete="new-password" 
                    required 
                    className="pl-10 transition-colors focus:border-primary"
                  />
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                By creating an account, you agree to our{" "}
                <a href="#" className="text-primary hover:underline">Terms of Service</a>
                {" "}and{" "}
                <a href="#" className="text-primary hover:underline">Privacy Policy</a>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full group bg-gradient-to-r from-primary to-primary-foreground hover:opacity-90 transition-all duration-300" 
                type="submit" 
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : (
                  <>
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
