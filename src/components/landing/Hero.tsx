
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthForm } from "@/components/auth/AuthForm";

export function Hero() {
  return (
    <div className="container mx-auto px-4 sm:px-6 pt-10 pb-24 md:pt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 max-w-xl">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            Your Beer Broh, helping you step by step
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Master Your Brewing Journey with 
            <span className="text-primary"> iBeer Pro</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Whether you're crafting your first batch or running a microbrewery, iBeer Pro guides you every step of the way. From beginner-friendly recipes to advanced brewing techniques.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" className="group">
              Start Brewing
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg">
              View Recipes
            </Button>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((id) => (
                <div 
                  key={id} 
                  className="h-8 w-8 rounded-full border-2 border-background bg-muted"
                  style={{ backgroundImage: `url(https://i.pravatar.cc/150?u=${id})`, backgroundSize: 'cover' }}
                />
              ))}
            </div>
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">1,000+</span> brewers joined this month
            </p>
          </div>
        </div>
        <div className="hidden md:block relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg blur-3xl opacity-50" />
          <div className="relative">
            <AuthForm />
          </div>
        </div>
      </div>
    </div>
  );
}
