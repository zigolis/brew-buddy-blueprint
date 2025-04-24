import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Beer, Check, ChevronRight, Settings, Brush, Clock, Database, Users, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthForm } from "@/components/auth/AuthForm";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  const [selectedTier, setSelectedTier] = useState<string>("standard");
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Navigation */}
        <header className="relative z-10">
          <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Beer className="h-8 w-8 text-primary" />
              <span className="font-bold text-2xl">iBeer Brewing Pro</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="#features" className="text-sm text-foreground hover:text-primary transition-colors">Features</Link>
              <Link to="#pricing" className="text-sm text-foreground hover:text-primary transition-colors">Pricing</Link>
              <Link to="#testimonials" className="text-sm text-foreground hover:text-primary transition-colors">Testimonials</Link>
              <Button asChild variant="outline" size="sm">
                <Link to="/brewing-guide">Learn Brewing</Link>
              </Button>
            </div>
          </div>
        </header>
        
        {/* Hero Content */}
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
      </div>
      
      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">From First Brew to Perfect Pour</h2>
            <p className="text-lg text-muted-foreground">
              Whether you're just starting or perfecting your craft, we've got tools for every stage of your brewing journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Brush className="h-6 w-6" />,
                title: "Recipe Creation",
                description: "Craft perfect beer recipes with our intuitive recipe builder. Track ingredients, calculate IBUs, ABV, and more."
              },
              {
                icon: <Clock className="h-6 w-6" />,
                title: "Brewing Sessions",
                description: "Schedule and track your brewing sessions with detailed step-by-step guides and timers."
              },
              {
                icon: <Database className="h-6 w-6" />,
                title: "Inventory Management",
                description: "Keep track of your ingredients inventory with automatic updates after each brewing session."
              },
              {
                icon: <Settings className="h-6 w-6" />,
                title: "Equipment Profiles",
                description: "Create and manage equipment profiles for consistent brewing results across different setups."
              },
              {
                icon: <Users className="h-6 w-6" />,
                title: "Community Recipes",
                description: "Share and discover recipes from the brewing community with ratings and reviews."
              },
              {
                icon: <Heart className="h-6 w-6" />,
                title: "Brewing Journal",
                description: "Document your brewing journey with notes, photos, and tasting scores for each batch."
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-card p-6 rounded-lg border hover:shadow-lg transition-all duration-300"
              >
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Brewing Adventure</h2>
            <p className="text-lg text-muted-foreground">
              From homebrewing enthusiasts to professional craftsmen, we have the perfect plan for your brewing journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Free",
                price: "$0",
                description: "Perfect for beginners starting their brewing journey",
                features: [
                  "5 Beer Recipes",
                  "Basic Recipe Builder",
                  "Limited Brewing Tools",
                  "Community Access",
                  "Email Support"
                ],
                buttonText: "Get Started",
                popular: false
              },
              {
                name: "Standard",
                price: "$9.99",
                description: "Everything you need for serious homebrewers",
                features: [
                  "Unlimited Beer Recipes",
                  "Advanced Recipe Builder",
                  "All Brewing Tools",
                  "Inventory Management",
                  "Equipment Profiles",
                  "Priority Support"
                ],
                buttonText: "Start Free Trial",
                popular: true
              },
              {
                name: "Premium",
                price: "$19.99",
                description: "Professional features for craft breweries",
                features: [
                  "Everything in Standard",
                  "Multiple Brewers Access",
                  "Commercial Scaling",
                  "Analytics & Reports",
                  "API Access",
                  "Dedicated Support"
                ],
                buttonText: "Contact Sales",
                popular: false
              }
            ].map((tier) => (
              <div 
                key={tier.name} 
                className={cn(
                  "flex flex-col h-full bg-card p-8 rounded-lg border relative hover:shadow-lg transition-all duration-300",
                  selectedTier === tier.name.toLowerCase() ? "border-primary shadow-md" : "",
                  tier.popular ? "border-primary/50" : ""
                )}
                onClick={() => setSelectedTier(tier.name.toLowerCase())}
              >
                {tier.popular && (
                  <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-0 bg-primary text-white text-xs font-semibold px-3 py-0.5 rounded-full">
                    Most Popular
                  </div>
                )}
                
                <div>
                  <h3 className="text-xl font-semibold">{tier.name}</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    <span className="ml-1 text-muted-foreground">/month</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
                </div>
                
                <ul className="mt-6 space-y-3 flex-grow">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex">
                      <Check className="h-5 w-5 text-primary shrink-0" />
                      <span className="ml-3 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="mt-8"
                  variant={tier.popular ? "default" : "outline"}
                  size="lg"
                >
                  {tier.buttonText}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Brewed with Love</h2>
            <p className="text-lg text-muted-foreground">
              From hobbyists to professionals, see how brewers at every level are crafting success with iBeer Pro.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                quote: "iBeer Pro transformed how I create and track my recipes. The inventory management alone has saved me countless hours.",
                author: "Alex Thomas",
                role: "Homebrewer, Portland"
              },
              {
                quote: "As a brewing instructor, I recommend iBeer Pro to all my students. It's the most comprehensive brewing software available today.",
                author: "Sarah Miller",
                role: "Brewing Instructor, Denver"
              },
              {
                quote: "We scaled our craft brewery using iBeer Pro's professional tools. The batch tracking and analytics are game-changers.",
                author: "Mike Johnson",
                role: "Owner, Hoppy Days Brewery"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-card p-6 rounded-lg border shadow">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <blockquote className="text-foreground mb-4">"{testimonial.quote}"</blockquote>
                <div className="flex items-center">
                  <div 
                    className="h-10 w-10 rounded-full bg-muted mr-3"
                    style={{ backgroundImage: `url(https://i.pravatar.cc/150?u=${index + 10})`, backgroundSize: 'cover' }}
                  />
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent opacity-50" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Ready to elevate your brewing?</h2>
                <p className="text-lg text-muted-foreground">Join iBeer Pro today and start crafting better beer.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="group min-w-[160px]">
                  Start Free Trial
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="lg" className="min-w-[160px]">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mobile Auth Form - Only visible on mobile */}
      <section className="py-8 md:hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <AuthForm />
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Beer className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">iBeer Pro</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The complete brewing management platform for passionate brewers.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="#features" className="text-muted-foreground hover:text-primary">Features</Link></li>
                <li><Link to="#pricing" className="text-muted-foreground hover:text-primary">Pricing</Link></li>
                <li><Link to="#" className="text-muted-foreground hover:text-primary">Recipes</Link></li>
                <li><Link to="#" className="text-muted-foreground hover:text-primary">Community</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="#" className="text-muted-foreground hover:text-primary">Brewing Guide</Link></li>
                <li><Link to="#" className="text-muted-foreground hover:text-primary">Documentation</Link></li>
                <li><Link to="#" className="text-muted-foreground hover:text-primary">Blog</Link></li>
                <li><Link to="#" className="text-muted-foreground hover:text-primary">Support</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="#" className="text-muted-foreground hover:text-primary">About</Link></li>
                <li><Link to="#" className="text-muted-foreground hover:text-primary">Careers</Link></li>
                <li><Link to="#" className="text-muted-foreground hover:text-primary">Contact</Link></li>
                <li><Link to="#" className="text-muted-foreground hover:text-primary">Legal</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} iBeer Pro. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="#" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.045-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
