
import { Layout } from "@/components/layout/Layout";
import { RecipeForm } from "@/components/recipes/RecipeForm";
import { toast } from "sonner";
import { useBrewContext } from "@/contexts/BrewContext";
import { useNavigate } from "react-router-dom";
import { Recipe, Style } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { recipeSteps } from "@/constants/recipeSteps";
import { RecipeStepsNavigation } from "@/components/recipes/form/steps/RecipeStepsNavigation";
import { RecipeStepNavButtons } from "@/components/recipes/form/steps/RecipeStepNavButtons";

const NewRecipe = () => {
  const { addRecipe } = useBrewContext();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Create a properly typed Style object with all required properties
  const defaultStyle: Style = {
    name: '',
    category: '',
    categoryNumber: '',
    styleLetter: '',
    styleGuide: '',
    type: 'Ale',
    minOg: 1.045,
    maxOg: 1.060,
    minFg: 1.010,
    maxFg: 1.015,
    minIbu: 20,
    maxIbu: 40,
    minColor: 5,
    maxColor: 15,
    minAbv: 4.5,
    maxAbv: 6.0,
    notes: '',
    profile: '',
    ingredients: '',
    examples: ''
  };
  
  // State to hold form data during the step process
  const [recipeFormData, setRecipeFormData] = useState<Partial<Recipe>>({
    name: '',
    author: '',
    style: defaultStyle,
    type: "All Grain",
    batchSize: 20,
    boilSize: 23,
    boilTime: 60,
    efficiency: 75,
  });

  // Update form data at each step
  const handleStepFormSubmit = (stepData: Partial<Recipe>) => {
    setRecipeFormData(prev => ({
      ...prev,
      ...stepData
    }));
    
    // Move to next step if not on the last step
    if (currentStep < recipeSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleCreateRecipe = (formData: Partial<Recipe>) => {
    try {
      // Combine the accumulated form data with the final step data
      const completeFormData = {
        ...recipeFormData,
        ...formData
      };
      
      // Make sure we have a valid name or use a default
      const recipeName = completeFormData.name?.trim() ? completeFormData.name : "New Recipe";
      const recipeAuthor = completeFormData.author?.trim() ? completeFormData.author : "Anonymous";
      
      // Create style with provided name or use default
      const styleName = completeFormData.style?.name?.trim() ? completeFormData.style.name : "Generic Ale";
      
      const defaultStyle = {
        name: styleName,
        category: "Other",
        categoryNumber: "0",
        styleLetter: "A",
        styleGuide: "Custom",
        type: "Ale" as const,
        minOg: 1.045,
        maxOg: 1.060,
        minFg: 1.010,
        maxFg: 1.015,
        minIbu: 20,
        maxIbu: 40,
        minColor: 5,
        maxColor: 15,
        minAbv: 4.5,
        maxAbv: 6.0,
        notes: "",
        profile: "",
        ingredients: "",
        examples: ""
      };

      const defaultIngredients = {
        fermentables: [],
        hops: [],
        yeasts: [],
        miscs: []
      };

      const defaultMash = {
        name: "Single Infusion",
        grainTemp: 20,
        mashTemp: 67,
        spargeTemp: 76,
        ph: 5.4,
        steps: [{
          name: "Mash In",
          type: "Infusion" as const,
          temperature: 67,
          time: 60
        }],
        notes: ""
      };

      const defaultFermentation = {
        name: "Ale",
        type: "Primary" as const,
        temperature: 20,
        period: 14,
        notes: "",
        steps: [{
          name: "Primary",
          temperature: 20,
          time: 14
        }]
      };

      const defaultWaterProfile = {
        name: "Default",
        calcium: 0,
        magnesium: 0,
        sodium: 0,
        chloride: 0,
        sulfate: 0,
        bicarbonate: 0,
        ph: 7.0,
        notes: ""
      };

      // Merge form data with default values, ensuring required fields have values
      const newRecipe: Recipe = {
        id: uuidv4(),
        name: recipeName,
        author: recipeAuthor,
        type: completeFormData.type || "All Grain",
        batchSize: completeFormData.batchSize || 20,
        boilSize: completeFormData.boilSize || 23,
        boilTime: completeFormData.boilTime || 60,
        efficiency: completeFormData.efficiency || 75,
        originalGravity: completeFormData.originalGravity || null,
        finalGravity: completeFormData.finalGravity || null,
        abv: completeFormData.abv || null,
        notes: completeFormData.notes || "",
        style: completeFormData.style ? { ...defaultStyle, ...completeFormData.style } : defaultStyle,
        ingredients: completeFormData.ingredients || {
          fermentables: [],
          hops: [],
          yeasts: [],
          miscs: []
        },
        mash: completeFormData.mash || {
          name: "Single Infusion",
          grainTemp: 20,
          mashTemp: 67,
          spargeTemp: 76,
          ph: 5.4,
          steps: [{
            name: "Mash In",
            type: "Infusion" as const,
            temperature: 67,
            time: 60
          }],
          notes: ""
        },
        fermentation: completeFormData.fermentation || {
          name: "Ale",
          type: "Primary" as const,
          temperature: 20,
          period: 14,
          notes: "",
          steps: [{
            name: "Primary",
            temperature: 20,
            time: 14
          }]
        },
        waterProfile: completeFormData.waterProfile || {
          name: "Default",
          calcium: 0,
          magnesium: 0,
          sodium: 0,
          chloride: 0,
          sulfate: 0,
          bicarbonate: 0,
          ph: 7.0,
          notes: ""
        },
        boil: completeFormData.boil || {
          name: "Standard Boil",
          time: 60,
          temperature: 100
        },
        clarification: completeFormData.clarification || {
          name: "Standard Clarification",
          type: "Whirlpool",
          amount: 0,
          temperature: 20,
          notes: ""
        },
        coldCrash: completeFormData.coldCrash || {
          name: "Standard Cold Crash",
          type: "Standard",
          temperature: 2,
          period: 48,
          notes: ""
        },
        carbonation: completeFormData.carbonation || {
          name: "Standard Carbonation",
          type: "Natural",
          volumeCo2: 2.4,
          temperature: 20,
          period: 14,
          notes: ""
        },
        bottling: completeFormData.bottling || {
          name: "Standard Bottling",
          type: "Bottle",
          temperature: 20,
          period: 14,
          notes: ""
        },
        estimatedCost: 0,
        tags: completeFormData.tags || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Recipe;

      // Log the recipe data before creating it
      console.log("Creating new recipe:", newRecipe);

      addRecipe(newRecipe);
      toast.success(`Recipe "${recipeName}" created successfully!`);
      navigate("/recipes");
    } catch (error) {
      console.error("Error creating recipe:", error);
      toast.error("Failed to create recipe. Please try again.");
    }
  };

  const handleNext = () => {
    // Get current form data before moving to next step
    const formElement = document.getElementById('recipe-form') as HTMLFormElement;
    if (formElement) {
      const formData = new FormData(formElement);
      const currentFormData: Record<string, any> = {};
      
      // Convert FormData to object
      formData.forEach((value, key) => {
        // Handle nested form fields (e.g., style.name)
        if (key.includes('.')) {
          const [parent, child] = key.split('.');
          if (!currentFormData[parent]) currentFormData[parent] = {};
          currentFormData[parent][child] = value;
        } else {
          currentFormData[key] = value;
        }
      });
      
      // Update the form data state
      setRecipeFormData(prev => ({
        ...prev,
        ...currentFormData
      }));
    }
    
    if (currentStep < recipeSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / recipeSteps.length) * 100;

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Create New Recipe</h1>
          <p className="text-muted-foreground">
            Create a new beer recipe by following these steps
          </p>
        </div>

        <Progress value={progress} className="w-full" />

        <div className="space-y-6">
          <Tabs
            value={recipeSteps[currentStep].id}
            onValueChange={(value) => {
              const newIndex = recipeSteps.findIndex((step) => step.id === value);
              if (newIndex !== -1) {
                setCurrentStep(newIndex);
              }
            }}
          >
            <RecipeStepsNavigation
              steps={recipeSteps}
              currentStep={currentStep}
            />

            {recipeSteps.map((step, index) => (
              <TabsContent key={step.id} value={step.id}>
                <RecipeForm
                  onSubmit={index === recipeSteps.length - 1 ? handleCreateRecipe : handleStepFormSubmit}
                  initialData={recipeFormData}
                  visibleSections={[...step.sections]}
                />
              </TabsContent>
            ))}
          </Tabs>

          <RecipeStepNavButtons
            currentStep={currentStep}
            totalSteps={recipeSteps.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        </div>
      </div>
    </Layout>
  );
};

export default NewRecipe;
