
import { Layout } from "@/components/layout/Layout";
import { RecipeForm } from "@/components/recipes/RecipeForm";
import { toast } from "sonner";
import { useBrewContext } from "@/contexts/BrewContext";
import { useNavigate } from "react-router-dom";
import { Recipe } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

const recipeSteps = [
  { id: "general", title: "General Info", sections: ["general", "stats"] },
  { id: "ingredients", title: "Ingredients", sections: ["fermentables", "hops", "yeast"] },
  { id: "mashing", title: "Mashing", sections: ["mash"] },
  { id: "boil", title: "Boil & Clarification", sections: ["boil", "clarification"] },
  { id: "fermentation", title: "Fermentation", sections: ["fermentation", "coldCrash"] },
  { id: "finishing", title: "Finishing", sections: ["carbonation", "bottling"] },
];

const NewRecipe = () => {
  const { addRecipe } = useBrewContext();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const handleCreateRecipe = (formData: Partial<Recipe>) => {
    try {
      // Initialize default values for required fields
      const defaultStyle = {
        name: "Generic Ale",
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

      const newRecipe: Recipe = {
        ...formData,
        id: uuidv4(),
        style: formData.style || defaultStyle,
        ingredients: formData.ingredients || defaultIngredients,
        mash: formData.mash || defaultMash,
        fermentation: formData.fermentation || defaultFermentation,
        waterProfile: formData.waterProfile || defaultWaterProfile,
        boil: formData.boil || {
          name: "Standard Boil",
          time: 60,
          temperature: 100
        },
        clarification: formData.clarification || {
          name: "Standard Clarification",
          type: "Whirlpool",
          amount: 0,
          temperature: 20,
          notes: ""
        },
        coldCrash: formData.coldCrash || {
          name: "Standard Cold Crash",
          type: "Standard",
          temperature: 2,
          period: 48,
          notes: ""
        },
        carbonation: formData.carbonation || {
          name: "Standard Carbonation",
          type: "Natural",
          volumeCo2: 2.4,
          temperature: 20,
          period: 14,
          notes: ""
        },
        bottling: formData.bottling || {
          name: "Standard Bottling",
          type: "Bottle",
          temperature: 20,
          period: 14,
          notes: ""
        },
        estimatedCost: 0,
        tags: formData.tags || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Recipe;

      addRecipe(newRecipe);
      toast.success("Recipe created successfully!");
      navigate("/recipes");
    } catch (error) {
      console.error("Error creating recipe:", error);
      toast.error("Failed to create recipe. Please try again.");
    }
  };

  const handleNext = () => {
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
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
              {recipeSteps.map((step, index) => (
                <TabsTrigger
                  key={step.id}
                  value={step.id}
                  disabled={index > currentStep}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {step.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {recipeSteps.map((step) => (
              <TabsContent key={step.id} value={step.id}>
                <RecipeForm
                  onSubmit={handleCreateRecipe}
                  visibleSections={step.sections}
                />
              </TabsContent>
            ))}
          </Tabs>

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            {currentStep === recipeSteps.length - 1 ? (
              <Button type="submit" form="recipe-form">
                Create Recipe
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewRecipe;
