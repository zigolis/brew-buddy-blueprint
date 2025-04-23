
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { useBrewContext } from "@/contexts/BrewContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BrewingTimer } from "@/components/brewing-guide/BrewingTimer";
import { BrewingTip } from "@/components/brewing-guide/BrewingTip";
import { IngredientsList } from "@/components/brewing-guide/IngredientsList";
import { PlayCircle, ChevronRight, ChevronLeft, CheckCircle, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Recipe } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const brewingSteps = [
  {
    id: "preparation",
    name: "Preparation",
    description: "Get your equipment and ingredients ready",
    tips: [
      "Clean and sanitize all equipment",
      "Measure out all ingredients",
      "Heat water to the appropriate temperature"
    ]
  },
  {
    id: "mashing",
    name: "Mashing",
    description: "Extract fermentable sugars from grains",
    tips: [
      "Maintain consistent temperature throughout the mash",
      "Stir occasionally to prevent hot spots",
      "Test with iodine to confirm starch conversion"
    ]
  },
  {
    id: "lautering",
    name: "Lautering & Sparging",
    description: "Separate wort from spent grains",
    tips: [
      "Recirculate until wort runs clear",
      "Maintain sparge water temperature",
      "Sparge slowly to maximize extraction"
    ]
  },
  {
    id: "boiling",
    name: "Boiling",
    description: "Sterilize wort and add hops",
    tips: [
      "Monitor for boil overs in the first few minutes",
      "Add hops according to schedule",
      "Keep lid off to allow unwanted compounds to escape"
    ]
  },
  {
    id: "cooling",
    name: "Cooling",
    description: "Rapidly cool wort to fermentation temperature",
    tips: [
      "Use an immersion or plate chiller for fast cooling",
      "Keep equipment sanitized during cooling",
      "Aim for under 30 minutes cooling time to prevent contamination"
    ]
  },
  {
    id: "fermentation",
    name: "Fermentation",
    description: "Yeast converts sugars to alcohol",
    tips: [
      "Maintain consistent fermentation temperature",
      "Allow for proper headspace in fermenter",
      "Monitor airlock for activity"
    ]
  },
  {
    id: "packaging",
    name: "Packaging",
    description: "Bottle or keg your beer",
    tips: [
      "Ensure proper sanitization",
      "Calculate priming sugar carefully",
      "Store at appropriate temperature for conditioning"
    ]
  }
];

const EnhancedBrewingGuide = () => {
  const { recipes, updateRecipe } = useBrewContext();
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(recipeId || null);
  const [activeStep, setActiveStep] = useState(0);
  
  if (recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    
    if (!recipe) {
      return (
        <Layout>
          <div>
            <h1 className="text-3xl font-bold mb-6">Recipe Not Found</h1>
            <p className="mb-4">Sorry, the recipe you selected could not be found.</p>
            <Button onClick={() => navigate("/brewing-guide")}>
              Back to Brewing Guide
            </Button>
          </div>
        </Layout>
      );
    }
    
    const markAsBrewedHandler = () => {
      updateRecipe(recipe.id, {
        ...recipe,
        isBrewed: true
      });
      toast.success(`${recipe.name} marked as brewed!`);
    };
    
    const currentStep = brewingSteps[activeStep];
    const progress = ((activeStep + 1) / brewingSteps.length) * 100;
    
    return (
      <Layout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Brewing: {recipe.name}</h1>
              <p className="text-muted-foreground">Follow these steps to brew your beer</p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => navigate("/brewing-guide")}
              >
                <ChevronLeft className="w-4 h-4 mr-2" /> All Recipes
              </Button>
              <Button onClick={markAsBrewedHandler}>
                <CheckCircle className="w-4 h-4 mr-2" /> Mark as Brewed
              </Button>
            </div>
          </div>
          
          <Progress value={progress} className="h-2 w-full" />
          
          <div className="flex justify-between items-center">
            <Button 
              variant="outline" 
              onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
              disabled={activeStep === 0}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <span className="font-medium">
              Step {activeStep + 1} of {brewingSteps.length}
            </span>
            <Button 
              onClick={() => setActiveStep(prev => Math.min(brewingSteps.length - 1, prev + 1))}
              disabled={activeStep === brewingSteps.length - 1}
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">{currentStep.name}</CardTitle>
              <CardDescription>{currentStep.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="instructions">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="instructions">Instructions</TabsTrigger>
                  <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                  <TabsTrigger value="timers">Timers</TabsTrigger>
                </TabsList>
                
                <TabsContent value="instructions" className="space-y-4 pt-4">
                  <div className="space-y-4">
                    {currentStep.tips.map((tip, index) => (
                      <BrewingTip key={index} title={tip}>
                        {tip}
                      </BrewingTip>
                    ))}
                  </div>
                  
                  {currentStep.id === "boiling" && recipe.ingredients?.hops && (
                    <div className="mt-6 border-t pt-4">
                      <h3 className="font-medium mb-2">Hop Schedule:</h3>
                      <ul className="space-y-2">
                        {recipe.ingredients.hops
                          .filter(hop => hop.use === "Boil")
                          .sort((a, b) => b.time - a.time)
                          .map((hop, idx) => (
                            <li key={idx} className="flex items-center justify-between">
                              <span>{hop.name} ({hop.amount}g)</span>
                              <span className="flex items-center text-muted-foreground">
                                <Clock className="h-4 w-4 mr-1" /> {hop.time} min
                              </span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="ingredients" className="pt-4">
                  <IngredientsList recipe={recipe} />
                </TabsContent>
                
                <TabsContent value="timers" className="pt-4">
                  {currentStep.id === "mashing" && recipe.mash?.steps && (
                    <div className="space-y-4">
                      <h3 className="font-medium">Mash Schedule:</h3>
                      {recipe.mash.steps.map((step, idx) => (
                        <div key={idx} className="space-y-2">
                          <p>{step.name} ({step.temperature}°C)</p>
                          <BrewingTimer initialMinutes={step.time} title={step.name} />
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {currentStep.id === "boiling" && (
                    <div className="space-y-4">
                      <h3 className="font-medium">Boil Timer:</h3>
                      <BrewingTimer initialMinutes={recipe.boilTime} title="Full Boil" />
                      
                      {recipe.ingredients?.hops && (
                        <div>
                          <h3 className="font-medium mt-4 mb-2">Hop Addition Timers:</h3>
                          {recipe.ingredients.hops
                            .filter(hop => hop.use === "Boil")
                            .sort((a, b) => b.time - a.time)
                            .map((hop, idx) => (
                              <div key={idx} className="mb-3">
                                <p>{hop.name} ({hop.amount}g)</p>
                                <BrewingTimer initialMinutes={hop.time} title={`Add ${hop.name}`} />
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {currentStep.id === "fermentation" && recipe.fermentation && (
                    <div className="space-y-4">
                      <BrewingTimer
                        initialMinutes={recipe.fermentation.period * 24 * 60}
                        title="Fermentation Time"
                      />
                    </div>
                  )}
                  
                  {currentStep.id !== "mashing" && 
                   currentStep.id !== "boiling" && 
                   currentStep.id !== "fermentation" && (
                    <div className="p-4 text-center">
                      <h3 className="font-medium mb-2">Custom Timer:</h3>
                      <BrewingTimer initialMinutes={30} title="Custom Timer" />
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold mb-2">Brewing Guide</h1>
        <p className="text-muted-foreground mb-6">Select a recipe to begin brewing</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map(recipe => (
            <Card key={recipe.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{recipe.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><span className="font-medium">Style:</span> {recipe.style?.name || 'N/A'}</p>
                  <p><span className="font-medium">ABV:</span> {recipe.abv ? `${recipe.abv}%` : 'N/A'}</p>
                  <div className="flex justify-end mt-4">
                    <Button 
                      onClick={() => navigate(`/brewing-guide/${recipe.id}`)}
                      className="flex items-center"
                    >
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Start Brewing
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {recipes.length === 0 && (
            <div className="col-span-full text-center p-12 bg-muted rounded-lg">
              <h3 className="text-xl font-medium mb-2">No Recipes Found</h3>
              <p className="mb-6">You haven't created any recipes yet.</p>
              <Link to="/recipes/new">
                <Button>Create Your First Recipe</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default EnhancedBrewingGuide;
