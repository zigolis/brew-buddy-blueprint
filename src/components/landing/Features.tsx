
import { Brush, Clock, Database, Settings, Users, Heart } from "lucide-react";

export function Features() {
  const features = [
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
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">From First Brew to Perfect Pour</h2>
          <p className="text-lg text-muted-foreground">
            Whether you're just starting or perfecting your craft, we've got tools for every stage of your brewing journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
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
  );
}
