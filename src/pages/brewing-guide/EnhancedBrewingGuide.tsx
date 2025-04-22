
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useBrewContext } from "@/contexts/BrewContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BrewingTimer } from "@/components/brewing-guide/BrewingTimer";
import { BrewingTip } from "@/components/brewing-guide/BrewingTip";
import { IngredientsList } from "@/components/brewing-guide/IngredientsList";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2 } from "lucide-react";

const EnhancedBrewingGuide = () => {
  const { recipeId } = useParams();
  const { recipes } = useBrewContext();
  const [activeTab, setActiveTab] = useState("preparation");
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const recipe = recipeId
    ? recipes.find((r) => r.id === recipeId)
    : recipes.length > 0
    ? recipes[0]
    : null;

  const brewingSteps = [
    { id: "preparation", name: "Preparation" },
    { id: "mashing", name: "Mashing" },
    { id: "boiling", name: "Boiling" },
    { id: "fermentation", name: "Fermentation" },
    { id: "finishing", name: "Finishing" },
  ];

  const toggleStepCompletion = (stepId: string) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  const progressPercentage = recipe 
    ? (completedSteps.length / brewingSteps.length) * 100 
    : 0;

  if (!recipe) {
    return (
      <Layout>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">No Recipe Selected</h1>
          <p>Please select a recipe to start brewing.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{recipe.name} - Brewing Guide</h1>
          <p className="text-muted-foreground">
            Follow these step-by-step instructions to brew your beer
          </p>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Brewing Progress</CardTitle>
            <CardDescription>Track your progress through the brewing process</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-2 flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </CardContent>
        </Card>

        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="space-y-4"
        >
          <TabsList className="grid grid-cols-5 h-auto">
            {brewingSteps.map(step => (
              <TabsTrigger 
                key={step.id} 
                value={step.id}
                className="relative py-2"
              >
                {step.name}
                {completedSteps.includes(step.id) && (
                  <CheckCircle2 className="w-4 h-4 text-green-500 absolute -top-1 -right-1" />
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="preparation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Preparation</CardTitle>
                <CardDescription>
                  Measure and prepare all ingredients for your brewing session
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Equipment Needed</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Brew kettle (at least {recipe.boilSize} liters)</li>
                    <li>Mash tun</li>
                    <li>Heat source</li>
                    <li>Thermometer</li>
                    <li>Hydrometer or refractometer</li>
                    <li>Fermenter</li>
                    <li>Airlock</li>
                    <li>Sanitizer</li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Measure Ingredients</h3>
                  <IngredientsList recipe={recipe} />
                </div>
                
                <BrewingTip title="Proper Sanitation">
                  Always sanitize all equipment that will come in contact with your wort after the boil. 
                  Contamination is the most common reason for brewing failures!
                </BrewingTip>
                
                <button 
                  className={`w-full py-2 mt-4 rounded-md text-center ${
                    completedSteps.includes('preparation')
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-primary text-primary-foreground'
                  }`}
                  onClick={() => toggleStepCompletion('preparation')}
                >
                  {completedSteps.includes('preparation') 
                    ? 'Preparation Complete ✓' 
                    : 'Mark Preparation Complete'}
                </button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mashing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Mashing</CardTitle>
                <CardDescription>
                  Convert grain starches into fermentable sugars
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Mash Schedule</h3>
                  
                  {recipe.mash.steps && recipe.mash.steps.length > 0 ? (
                    <div className="space-y-6">
                      {recipe.mash.steps.map((step, index) => (
                        <div key={index} className="space-y-2 p-4 border rounded-md bg-background">
                          <h4 className="font-medium">Step {index + 1}: {step.name}</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>Temperature: {step.temperature}°C</div>
                            <div>Duration: {step.time} minutes</div>
                          </div>
                          <BrewingTimer 
                            title={`Mash Step ${index + 1}`} 
                            initialMinutes={step.time} 
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-muted-foreground">
                      No mash steps defined for this recipe.
                    </div>
                  )}
                </div>
                
                <BrewingTip title="Check for Starch Conversion">
                  After mashing, take a small sample of wort and test with iodine to check for starch conversion.
                  Drop a small amount of iodine onto the wort - if it turns black or purple, starch is still present
                  and more mashing time is needed.
                </BrewingTip>
                
                <BrewingTip title="Measuring Gravity">
                  Take a gravity reading before boiling to check your mash efficiency. 
                  A refractometer is easier to use than a hydrometer at this stage as it requires less wort.
                </BrewingTip>
                
                <button 
                  className={`w-full py-2 mt-4 rounded-md text-center ${
                    completedSteps.includes('mashing')
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-primary text-primary-foreground'
                  }`}
                  onClick={() => toggleStepCompletion('mashing')}
                >
                  {completedSteps.includes('mashing') 
                    ? 'Mashing Complete ✓' 
                    : 'Mark Mashing Complete'}
                </button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="boiling" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Boiling</CardTitle>
                <CardDescription>
                  Add hops according to schedule and boil the wort
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <h3 className="text-lg font-semibold">Boil Time: {recipe.boilTime} minutes</h3>
                    <div className="w-full sm:w-auto">
                      <BrewingTimer title="Boil Timer" initialMinutes={recipe.boilTime} />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold mt-4">Hop Schedule</h3>
                  {recipe.ingredients.hops && recipe.ingredients.hops.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="text-left px-4 py-2">Hop</th>
                            <th className="text-left px-4 py-2">Amount</th>
                            <th className="text-left px-4 py-2">Time</th>
                            <th className="text-left px-4 py-2">Use</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {recipe.ingredients.hops.map((hop, index) => (
                            <tr key={index} className="hover:bg-muted/20">
                              <td className="px-4 py-2">{hop.name}</td>
                              <td className="px-4 py-2">{hop.amount} {hop.unit || 'g'}</td>
                              <td className="px-4 py-2">{hop.time || '-'} min</td>
                              <td className="px-4 py-2">{hop.use || 'Boil'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-muted-foreground">
                      No hops defined for this recipe.
                    </div>
                  )}
                </div>
                
                <BrewingTip title="Watch for Boilovers">
                  Be especially vigilant in the first 5-10 minutes of the boil as proteins 
                  can cause a rapid boilover. Keep a spray bottle of cold water handy to 
                  quickly bring down a rising foam.
                </BrewingTip>
                
                <BrewingTip title="Chilling Wort">
                  Prepare your wort chiller before the end of the boil to ensure it's sanitized. 
                  Aim to chill your wort below 27°C (80°F) as quickly as possible to prevent 
                  contamination and off-flavors.
                </BrewingTip>
                
                <button 
                  className={`w-full py-2 mt-4 rounded-md text-center ${
                    completedSteps.includes('boiling')
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-primary text-primary-foreground'
                  }`}
                  onClick={() => toggleStepCompletion('boiling')}
                >
                  {completedSteps.includes('boiling') 
                    ? 'Boiling Complete ✓' 
                    : 'Mark Boiling Complete'}
                </button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fermentation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Fermentation</CardTitle>
                <CardDescription>
                  Yeast converts sugars into alcohol and CO2
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Fermentation Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-md bg-background">
                      <h4 className="font-medium">Yeast</h4>
                      {recipe.ingredients.yeasts && recipe.ingredients.yeasts.length > 0 ? (
                        <ul className="mt-2 space-y-2">
                          {recipe.ingredients.yeasts.map((yeast, index) => (
                            <li key={index}>
                              {yeast.name || 'Unnamed Yeast'}
                              {yeast.laboratory && <span className="text-sm text-muted-foreground ml-1">({yeast.laboratory})</span>}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="text-muted-foreground">No yeast specified.</div>
                      )}
                    </div>
                    
                    <div className="p-4 border rounded-md bg-background">
                      <h4 className="font-medium">Fermentation Schedule</h4>
                      {recipe.fermentation ? (
                        <div className="mt-2 space-y-2">
                          <div>Temperature: {recipe.fermentation.temperature}°C</div>
                          <div>Duration: {recipe.fermentation.period} days</div>
                          {recipe.fermentation.notes && (
                            <div className="text-sm text-muted-foreground mt-2">
                              {recipe.fermentation.notes}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-muted-foreground">No fermentation details specified.</div>
                      )}
                    </div>
                  </div>
                </div>
                
                <BrewingTip title="Pitching Temperature">
                  Make sure your wort is at the proper temperature before pitching yeast - 
                  typically 18-21°C (65-70°F) for ales and 7-13°C (45-55°F) for lagers.
                </BrewingTip>
                
                <BrewingTip title="Temperature Control">
                  Temperature control during fermentation is crucial for flavor development. 
                  Consider using a fermentation chamber or temperature controller if possible. 
                  Even a water bath with frozen water bottles can help stabilize temperatures.
                </BrewingTip>
                
                <button 
                  className={`w-full py-2 mt-4 rounded-md text-center ${
                    completedSteps.includes('fermentation')
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-primary text-primary-foreground'
                  }`}
                  onClick={() => toggleStepCompletion('fermentation')}
                >
                  {completedSteps.includes('fermentation') 
                    ? 'Fermentation Complete ✓' 
                    : 'Mark Fermentation Complete'}
                </button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="finishing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Finishing</CardTitle>
                <CardDescription>
                  Packaging and carbonation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Carbonation & Packaging</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-md bg-background">
                      <h4 className="font-medium">Carbonation</h4>
                      {recipe.carbonation ? (
                        <div className="mt-2 space-y-2">
                          <div>Method: {recipe.carbonation.type}</div>
                          {recipe.carbonation.volumeCo2 && (
                            <div>Target CO2 Volume: {recipe.carbonation.volumeCo2}</div>
                          )}
                          {recipe.carbonation.notes && (
                            <div className="text-sm text-muted-foreground mt-2">
                              {recipe.carbonation.notes}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-muted-foreground">No carbonation details specified.</div>
                      )}
                    </div>
                    
                    <div className="p-4 border rounded-md bg-background">
                      <h4 className="font-medium">Bottling/Kegging</h4>
                      {recipe.bottling ? (
                        <div className="mt-2 space-y-2">
                          <div>Method: {recipe.bottling.type}</div>
                          {recipe.bottling.period && (
                            <div>Conditioning Period: {recipe.bottling.period} days</div>
                          )}
                          {recipe.bottling.notes && (
                            <div className="text-sm text-muted-foreground mt-2">
                              {recipe.bottling.notes}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-muted-foreground">No bottling details specified.</div>
                      )}
                    </div>
                  </div>
                </div>
                
                <BrewingTip title="Priming Sugar Calculation">
                  If bottle conditioning, calculate your priming sugar carefully based on the 
                  beer style and temperature. Too much sugar can lead to dangerous bottle bombs, 
                  while too little will result in flat beer.
                </BrewingTip>
                
                <BrewingTip title="Final Gravity Reading">
                  Take a final gravity reading before packaging to confirm fermentation is complete 
                  and to calculate the actual ABV of your beer.
                </BrewingTip>
                
                <button 
                  className={`w-full py-2 mt-4 rounded-md text-center ${
                    completedSteps.includes('finishing')
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-primary text-primary-foreground'
                  }`}
                  onClick={() => toggleStepCompletion('finishing')}
                >
                  {completedSteps.includes('finishing') 
                    ? 'Finishing Complete ✓' 
                    : 'Mark Finishing Complete'}
                </button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default EnhancedBrewingGuide;
