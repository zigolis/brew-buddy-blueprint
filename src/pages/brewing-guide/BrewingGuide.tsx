
import { Layout } from "@/components/layout/Layout";
import { useBrewContext } from "@/contexts/BrewContext";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Beer, 
  Calculator, 
  Check, 
  ChevronRight, 
  Clock, 
  FileText, 
  Hourglass, 
  List,
  ThermometerSnowflake,
  Droplet,
  Package,
  Calendar
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Recipe, BrewingStep } from "@/types/beer";
import { v4 as uuidv4 } from "uuid";

const BrewingGuideDashboard = () => {
  const { recipes } = useBrewContext();
  const navigate = useNavigate();
  
  const startBrewing = (recipeId: string) => {
    navigate(`/brewing-guide/${recipeId}`);
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Brewing Guide</h1>
          <p className="text-muted-foreground">Follow step-by-step brewing instructions</p>
        </div>
        
        <Alert className="bg-accent">
          <Beer className="h-4 w-4" />
          <AlertTitle>Ready to Brew?</AlertTitle>
          <AlertDescription>
            Select a recipe below to start a guided brewing session.
          </AlertDescription>
        </Alert>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map(recipe => (
            <Card key={recipe.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl truncate">{recipe.name}</CardTitle>
                <CardDescription>
                  <span className="block">{recipe.style.name}</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline">{recipe.type}</Badge>
                    <Badge variant="secondary">{recipe.batchSize}L</Badge>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <div className="font-medium">ABV</div>
                    <div>{((recipe.style.minAbv + recipe.style.maxAbv) / 2).toFixed(1)}%</div>
                  </div>
                  <div>
                    <div className="font-medium">IBU</div>
                    <div>{((recipe.style.minIbu + recipe.style.maxIbu) / 2).toFixed(0)}</div>
                  </div>
                  <div>
                    <div className="font-medium">Boil</div>
                    <div>{recipe.boilTime} min</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => startBrewing(recipe.id)}>
                  Start Brewing
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

const BrewingGuideSession = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const { recipes } = useBrewContext();
  const navigate = useNavigate();
  
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [brewingSteps, setBrewingSteps] = useState<BrewingStep[]>([]);
  const [timerActive, setTimerActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  
  useEffect(() => {
    if (recipeId) {
      const found = recipes.find(r => r.id === recipeId);
      if (found) {
        setRecipe(found);
        
        // Generate brewing steps from the recipe
        const steps = generateBrewingSteps(found);
        setBrewingSteps(steps);
      } else {
        navigate('/brewing-guide');
      }
    }
  }, [recipeId, recipes, navigate]);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (timerActive && timeRemaining > 0) {
      timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0 && timerActive) {
      setTimerActive(false);
      // Play sound or show notification
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timerActive, timeRemaining]);
  
  const generateBrewingSteps = (recipe: Recipe): BrewingStep[] => {
    const steps: BrewingStep[] = [];
    
    // 1. Preparation steps
    steps.push({
      id: uuidv4(),
      type: 'Preparation',
      name: 'Gather Equipment',
      instructions: 'Ensure you have all necessary equipment clean and ready.',
      completed: false,
    });
    
    steps.push({
      id: uuidv4(),
      type: 'Preparation',
      name: 'Measure Ingredients',
      instructions: 'Measure and prepare all ingredients according to the recipe.',
      completed: false,
    });
    
    steps.push({
      id: uuidv4(),
      type: 'Preparation',
      name: 'Heat Strike Water',
      instructions: `Heat ${(recipe.batchSize * 1.25).toFixed(1)}L of water to ${(recipe.mash.mashTemp + 2).toFixed(1)}°C for mashing.`,
      completed: false,
    });
    
    // 2. Mash steps
    recipe.mash.steps.forEach((mashStep, index) => {
      steps.push({
        id: uuidv4(),
        type: 'Mash',
        name: `Mash Step ${index + 1}: ${mashStep.name}`,
        instructions: `Hold mash at ${mashStep.temperature}°C for ${mashStep.time} minutes.`,
        completed: false,
      });
    });
    
    // 3. Boil steps
    steps.push({
      id: uuidv4(),
      type: 'Boil',
      name: 'Start Boil',
      instructions: `Bring wort to a boil. Total boil time: ${recipe.boilTime} minutes.`,
      completed: false,
    });
    
    // Add hop additions
    const hopAdditions = recipe.ingredients.hops
      .filter(hop => hop.use === 'Boil')
      .sort((a, b) => b.time - a.time); // Sort by time descending
    
    hopAdditions.forEach(hop => {
      steps.push({
        id: uuidv4(),
        type: 'Boil',
        name: `Add Hops: ${hop.name}`,
        instructions: `Add ${(hop.amount * 1000).toFixed(0)}g of ${hop.name} hops. ${hop.time} minutes remaining in the boil.`,
        completed: false,
      });
    });
    
    // 4. Fermentation steps
    steps.push({
      id: uuidv4(),
      type: 'Fermentation',
      name: 'Cool Wort',
      instructions: `Cool wort to ${recipe.fermentation.steps[0]?.temperature || 20}°C.`,
      completed: false,
    });
    
    steps.push({
      id: uuidv4(),
      type: 'Fermentation',
      name: 'Transfer to Fermenter',
      instructions: 'Transfer the cooled wort to your fermenter, leaving trub behind.',
      completed: false,
    });
    
    steps.push({
      id: uuidv4(),
      type: 'Fermentation',
      name: 'Pitch Yeast',
      instructions: `Pitch yeast (${recipe.ingredients.yeasts.map(y => y.name).join(', ')}) and seal fermenter with airlock.`,
      completed: false,
    });
    
    // 5. Fermentation schedule
    recipe.fermentation.steps.forEach((fermentationStep, index) => {
      steps.push({
        id: uuidv4(),
        type: 'Fermentation',
        name: `Fermentation: ${fermentationStep.name}`,
        instructions: `Ferment at ${fermentationStep.temperature}°C for ${fermentationStep.time} days.`,
        completed: false,
      });
    });
    
    // 6. Packaging
    steps.push({
      id: uuidv4(),
      type: 'Packaging',
      name: 'Package Beer',
      instructions: 'Transfer the beer to bottles or keg for carbonation and conditioning.',
      completed: false,
    });
    
    return steps;
  };
  
  const toggleStepCompletion = (index: number) => {
    const newCompletedSteps = new Set(completedSteps);
    
    if (newCompletedSteps.has(index)) {
      newCompletedSteps.delete(index);
    } else {
      newCompletedSteps.add(index);
    }
    
    setCompletedSteps(newCompletedSteps);
  };
  
  const startTimer = (minutes: number) => {
    setTimeRemaining(minutes * 60);
    setTimerActive(true);
  };
  
  const pauseTimer = () => {
    setTimerActive(false);
  };
  
  const resetTimer = () => {
    setTimerActive(false);
    setTimeRemaining(0);
  };
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const progress = completedSteps.size > 0 
    ? Math.round((completedSteps.size / brewingSteps.length) * 100) 
    : 0;
  
  if (!recipe) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <p>Loading brewing guide...</p>
        </div>
      </Layout>
    );
  }
  
  const currentStep = brewingSteps[activeStep];
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Brewing: {recipe.name}</h1>
            <p className="text-muted-foreground">{recipe.style.name}</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/brewing-guide')}>
            Exit Brewing Session
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Brewing Progress</CardTitle>
                <CardDescription>
                  {completedSteps.size} of {brewingSteps.length} steps completed
                </CardDescription>
                <Progress value={progress} className="h-2" />
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[400px]">
                  <div className="px-4 py-2">
                    {brewingSteps.map((step, index) => (
                      <div key={step.id} className="mb-1">
                        <div 
                          className={`
                            p-2 rounded-md flex items-center cursor-pointer
                            ${completedSteps.has(index) ? 'bg-accent/50 text-accent-foreground/70' : 'hover:bg-muted'}
                            ${activeStep === index ? 'border-l-4 border-primary pl-1' : ''}
                          `}
                          onClick={() => setActiveStep(index)}
                        >
                          <div 
                            className={`
                              w-5 h-5 rounded-sm border mr-2 flex items-center justify-center 
                              ${completedSteps.has(index) ? 'bg-primary border-primary' : 'border-primary'}
                            `}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleStepCompletion(index);
                            }}
                          >
                            {completedSteps.has(index) && <Check className="h-3 w-3 text-primary-foreground" />}
                          </div>
                          <div className={`flex-1 text-sm ${completedSteps.has(index) ? 'line-through opacity-70' : ''}`}>
                            {step.name}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="justify-between border-t p-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                  disabled={activeStep === 0}
                >
                  Previous
                </Button>
                <Button 
                  size="sm"
                  onClick={() => setActiveStep(prev => Math.min(brewingSteps.length - 1, prev + 1))}
                  disabled={activeStep === brewingSteps.length - 1}
                >
                  Next
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="md:w-2/3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <Badge variant="outline" className="mb-2">{currentStep.type}</Badge>
                    <CardTitle>{currentStep.name}</CardTitle>
                  </div>
                  <div 
                    className={`
                      w-6 h-6 rounded-sm border flex items-center justify-center cursor-pointer 
                      ${completedSteps.has(activeStep) ? 'bg-primary border-primary' : 'border-primary'}
                    `}
                    onClick={() => toggleStepCompletion(activeStep)}
                  >
                    {completedSteps.has(activeStep) && <Check className="h-4 w-4 text-primary-foreground" />}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-lg">{currentStep.instructions}</div>
                
                {currentStep.type === 'Mash' && (
                  <div className="flex flex-col space-y-3 bg-accent p-4 rounded-lg">
                    <h3 className="text-sm font-medium flex items-center">
                      <ThermometerSnowflake className="mr-2 h-4 w-4 text-brewing-amber" />
                      Temperature Monitoring
                    </h3>
                    <div className="text-sm">
                      Maintain mash temperature as close as possible to the target. Stir occasionally and check temperature.
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Log Temperature
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Set Reminder
                      </Button>
                    </div>
                  </div>
                )}
                
                {currentStep.type === 'Boil' && (
                  <div className="flex flex-col space-y-3 bg-accent p-4 rounded-lg">
                    <h3 className="text-sm font-medium flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-brewing-amber" />
                      Boil Timer
                    </h3>
                    <div className="text-center text-3xl font-mono">
                      {formatTime(timeRemaining)}
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {!timerActive ? (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            // Extract time from instruction if possible
                            const timeMatch = currentStep.instructions.match(/(\d+)\s*minutes/);
                            const minutes = timeMatch ? parseInt(timeMatch[1]) : 60;
                            startTimer(minutes);
                          }}
                          className="col-span-2"
                        >
                          Start Timer
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={pauseTimer}
                          className="col-span-2"
                        >
                          Pause Timer
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={resetTimer}
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Show relevant recipe details based on the current step */}
                <Tabs defaultValue="ingredients">
                  <TabsList>
                    <TabsTrigger value="ingredients">
                      <Package className="h-4 w-4 mr-2" />
                      Ingredients
                    </TabsTrigger>
                    <TabsTrigger value="recipe">
                      <FileText className="h-4 w-4 mr-2" />
                      Recipe Details
                    </TabsTrigger>
                    <TabsTrigger value="notes">
                      <List className="h-4 w-4 mr-2" />
                      Notes
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="ingredients" className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Fermentables</h3>
                      <ScrollArea className="h-[120px]">
                        <div className="space-y-2">
                          {recipe.ingredients.fermentables.map(fermentable => (
                            <div key={fermentable.id} className="flex justify-between text-sm">
                              <span>{fermentable.name}</span>
                              <span>{fermentable.amount.toFixed(2)} kg</span>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Hops</h3>
                      <ScrollArea className="h-[120px]">
                        <div className="space-y-2">
                          {recipe.ingredients.hops.map(hop => (
                            <div key={hop.id} className="flex justify-between text-sm">
                              <span>{hop.name} ({hop.time} min, {hop.use})</span>
                              <span>{(hop.amount * 1000).toFixed(0)} g</span>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="recipe" className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="font-medium">Batch Size:</span> {recipe.batchSize}L</div>
                      <div><span className="font-medium">Boil Time:</span> {recipe.boilTime} min</div>
                      <div><span className="font-medium">Efficiency:</span> {recipe.efficiency}%</div>
                      <div><span className="font-medium">Style:</span> {recipe.style.name}</div>
                      <div><span className="font-medium">Est. ABV:</span> {((recipe.style.minAbv + recipe.style.maxAbv) / 2).toFixed(1)}%</div>
                      <div><span className="font-medium">Est. IBU:</span> {((recipe.style.minIbu + recipe.style.maxIbu) / 2).toFixed(0)}</div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Mash Schedule</h3>
                      <div className="space-y-2">
                        {recipe.mash.steps.map((step, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{step.name}</span>
                            <span>{step.temperature}°C for {step.time} min</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="notes">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Recipe Notes</h3>
                        <p className="text-sm">{recipe.notes || "No recipe notes available."}</p>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2">Brewing Session Notes</h3>
                        <textarea 
                          className="w-full min-h-[100px] p-2 text-sm border rounded-md" 
                          placeholder="Add your brewing notes here..."
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="justify-between border-t">
                <Button 
                  variant="outline"
                  onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                  disabled={activeStep === 0}
                >
                  Previous Step
                </Button>
                <Button 
                  onClick={() => {
                    toggleStepCompletion(activeStep);
                    if (activeStep < brewingSteps.length - 1) {
                      setActiveStep(prev => prev + 1);
                    }
                  }}
                >
                  {completedSteps.has(activeStep) ? "Mark Incomplete" : "Complete Step"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const BrewingGuide = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  
  return recipeId ? <BrewingGuideSession /> : <BrewingGuideDashboard />;
};

export default BrewingGuide;
