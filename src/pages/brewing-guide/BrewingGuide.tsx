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
import { Recipe, BrewingStep } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { BrewingStepCard } from "@/components/brewing-guide/BrewingStepCard";

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
  const [stepData, setStepData] = useState<{[key: string]: any}>({});

  const handleStepDataSave = (stepId: string, data: any) => {
    setStepData(prev => ({
      ...prev,
      [stepId]: data
    }));
    
    localStorage.setItem(`brewing-session-${recipeId}-${stepId}`, JSON.stringify(data));
  };

  useEffect(() => {
    if (recipeId) {
      const found = recipes.find(r => r.id === recipeId);
      if (found) {
        setRecipe(found);
        
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
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timerActive, timeRemaining]);
  
  useEffect(() => {
    const savedData = brewingSteps.reduce((acc, step) => {
      const saved = localStorage.getItem(`brewing-session-${recipeId}-${step.id}`);
      if (saved) {
        acc[step.id] = JSON.parse(saved);
      }
      return acc;
    }, {});
    
    setStepData(savedData);
  }, [recipeId, brewingSteps]);
  
  const generateBrewingSteps = (recipe: Recipe): BrewingStep[] => {
    const steps: BrewingStep[] = [];
    
    steps.push({
      id: uuidv4(),
      type: 'Preparation',
      name: 'Gather Equipment',
      instructions: 'Ensure you have all necessary equipment clean and ready.',
      completed: false,
      description: 'First step in brewing process',
      duration: 30,
      temperature: 20
    });
    
    steps.push({
      id: uuidv4(),
      type: 'Preparation',
      name: 'Measure Ingredients',
      instructions: 'Measure and prepare all ingredients according to the recipe.',
      completed: false,
      description: 'Get your ingredients ready',
      duration: 20,
      temperature: 20
    });
    
    steps.push({
      id: uuidv4(),
      type: 'Preparation',
      name: 'Heat Strike Water',
      instructions: `Heat ${(recipe.batchSize * 1.25).toFixed(1)}L of water to ${(recipe.mash.mashTemp + 2).toFixed(1)}°C for mashing.`,
      completed: false,
      description: 'Prepare water for mashing',
      duration: 20,
      temperature: recipe.mash.mashTemp + 2
    });
    
    recipe.mash.steps.forEach((mashStep, index) => {
      steps.push({
        id: uuidv4(),
        type: 'Mash',
        name: `Mash Step ${index + 1}: ${mashStep.name}`,
        instructions: `Hold mash at ${mashStep.temperature}°C for ${mashStep.time} minutes.`,
        completed: false,
        description: `Step ${index + 1} of the mash process`,
        duration: mashStep.time,
        temperature: mashStep.temperature
      });
    });
    
    steps.push({
      id: uuidv4(),
      type: 'Boil',
      name: 'Start Boil',
      instructions: `Bring wort to a boil. Total boil time: ${recipe.boilTime} minutes.`,
      completed: false,
      description: 'Begin the boil',
      duration: recipe.boilTime,
      temperature: 100
    });
    
    const hopAdditions = recipe.ingredients.hops
      .filter(hop => hop.use === 'Boil')
      .sort((a, b) => b.time - a.time);
    
    hopAdditions.forEach(hop => {
      steps.push({
        id: uuidv4(),
        type: 'Boil',
        name: `Add Hops: ${hop.name}`,
        instructions: `Add ${(hop.amount * 1000).toFixed(0)}g of ${hop.name} hops. ${hop.time} minutes remaining in the boil.`,
        completed: false,
        description: 'Hop addition',
        duration: 1,
        temperature: 100
      });
    });
    
    steps.push({
      id: uuidv4(),
      type: 'Fermentation',
      name: 'Cool Wort',
      instructions: `Cool wort to ${recipe.fermentation.temperature}°C.`,
      completed: false,
      description: 'Cooling before fermentation',
      duration: 30,
      temperature: recipe.fermentation.temperature
    });
    
    steps.push({
      id: uuidv4(),
      type: 'Fermentation',
      name: 'Transfer to Fermenter',
      instructions: 'Transfer the cooled wort to your fermenter, leaving trub behind.',
      completed: false,
      description: 'Move to fermenter',
      duration: 15,
      temperature: recipe.fermentation.temperature
    });
    
    steps.push({
      id: uuidv4(),
      type: 'Fermentation',
      name: 'Pitch Yeast',
      instructions: `Pitch yeast (${recipe.ingredients.yeasts.map(y => y.name).join(', ')}) and seal fermenter with airlock.`,
      completed: false,
      description: 'Add yeast',
      duration: 5,
      temperature: recipe.fermentation.temperature
    });
    
    if (recipe.fermentation.steps) {
      recipe.fermentation.steps.forEach((fermentationStep) => {
        steps.push({
          id: uuidv4(),
          type: 'Fermentation',
          name: `Fermentation: ${fermentationStep.name}`,
          instructions: `Ferment at ${fermentationStep.temperature}°C for ${fermentationStep.time} days.`,
          completed: false,
          description: 'Main fermentation',
          duration: fermentationStep.time * 24 * 60, // Convert days to minutes
          temperature: fermentationStep.temperature
        });
      });
    } else {
      steps.push({
        id: uuidv4(),
        type: 'Fermentation',
        name: `Primary Fermentation`,
        instructions: `Ferment at ${recipe.fermentation.temperature}°C for ${recipe.fermentation.period} days.`,
        completed: false,
        description: 'Main fermentation',
        duration: recipe.fermentation.period * 24 * 60, // Convert days to minutes
        temperature: recipe.fermentation.temperature
      });
    }
    
    steps.push({
      id: uuidv4(),
      type: 'Packaging',
      name: 'Package Beer',
      instructions: 'Transfer the beer to bottles or keg for carbonation and conditioning.',
      completed: false,
      description: 'Final packaging',
      duration: 60,
      temperature: 20
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
            <BrewingStepCard
              step={{...currentStep, savedData: stepData[currentStep.id]}}
              isActive={true}
              onComplete={() => toggleStepCompletion(activeStep)}
              onDataSave={(data) => handleStepDataSave(currentStep.id, data)}
              completed={completedSteps.has(activeStep)}
            />
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
