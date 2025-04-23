
import { useState, useRef, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { RecipeForm } from "@/components/recipes/RecipeForm";
import { useBrewContext } from "@/contexts/BrewContext";
import { useNavigate, useParams } from "react-router-dom";
import { Recipe } from "@/types";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { X, Save, ListTodo } from "lucide-react";
import { recipeSteps } from "@/constants/recipeSteps";
import { RecipeStepsNavigation } from "@/components/recipes/form/steps/RecipeStepsNavigation";
import { RecipeStepNavButtons } from "@/components/recipes/form/steps/RecipeStepNavButtons";
import { RecipeWizardHeader } from "@/components/recipes/form/RecipeWizardHeader";
import { RecipeWizardProgress } from "@/components/recipes/form/RecipeWizardProgress";
import { RecipeWizardStepper } from "@/components/recipes/form/RecipeWizardStepper";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const EditRecipe = () => {
  const { recipeId } = useParams();
  const { recipes, updateRecipe } = useBrewContext();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [recipeFormData, setRecipeFormData] = useState<Partial<Recipe>>({});
  const [singlePage, setSinglePage] = useState(false);
  const [shouldChangeStep, setShouldChangeStep] = useState(true);
  const isDialogOpen = useRef(false);

  const recipe = recipes.find((r) => r.id === recipeId);

  useEffect(() => {
    if (recipe) {
      setRecipeFormData(recipe);
    }
  }, [recipe]);

  if (!recipe) {
    return (
      <Layout>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Recipe Not Found</h1>
          <p>The recipe you're looking for doesn't exist.</p>
        </div>
      </Layout>
    );
  }

  const handleUpdateRecipe = (formData: Partial<Recipe>) => {
    try {
      const updatedRecipe = {
        ...recipe,
        ...formData,
        updatedAt: new Date().toISOString(),
      };
      
      updateRecipe(recipe.id, updatedRecipe as Recipe);
      toast.success("Recipe updated successfully!");
      navigate(`/recipes/${recipe.id}`);
    } catch (error) {
      console.error("Error updating recipe:", error);
      toast.error("Failed to update recipe. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate(`/recipes/${recipe.id}`);
  };

  const handleStepFormSubmit = (stepData: Partial<Recipe>) => {
    setRecipeFormData(prev => ({
      ...prev,
      ...stepData,
    }));
    if (currentStep < recipeSteps.length - 1) setCurrentStep(currentStep + 1);
  };

  const progress = ((currentStep + 1) / recipeSteps.length) * 100;

  const handleNext = () => {
    // Don't proceed to next step if a dialog is open
    if (isDialogOpen.current) {
      console.log("Dialog is open, not changing step");
      return;
    }
    
    // Get form data, then move to next if shouldChangeStep is true
    const formElement = document.getElementById('recipe-form') as HTMLFormElement;
    if (formElement) {
      const formData = new FormData(formElement);
      const currentFormData: Record<string, any> = {};
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
      
      // Update form data without changing step
      setRecipeFormData(prev => ({
        ...prev,
        ...currentFormData
      }));
      
      // Only change step if shouldChangeStep is true and it's a manual navigation
      if (shouldChangeStep && currentStep < recipeSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Edit Recipe</h1>
            <p className="text-muted-foreground">
              Modify your recipe by updating the form below
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="single-page" 
                checked={singlePage}
                onCheckedChange={setSinglePage}
              />
              <Label htmlFor="single-page" className="cursor-pointer">
                <div className="flex items-center gap-1">
                  <ListTodo className="h-4 w-4" />
                  <span>Single Page Mode</span>
                </div>
              </Label>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button 
                form={singlePage ? "recipe-form" : undefined} 
                type={singlePage ? "submit" : "button"} 
                onClick={singlePage ? undefined : handleNext}
              >
                <Save className="mr-2 h-4 w-4" />
                {singlePage ? "Save Recipe" : "Next"}
              </Button>
            </div>
          </div>
        </div>

        {singlePage ? (
          <RecipeForm onSubmit={handleUpdateRecipe} initialData={recipe} />
        ) : (
          <div className="space-y-6">
            <RecipeWizardProgress progress={progress} />

            <div className="space-y-6">
              <RecipeWizardStepper
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                recipeFormData={recipeFormData}
                handleStepFormSubmit={handleStepFormSubmit}
                handleCreateRecipe={handleUpdateRecipe}
                setShouldChangeStep={setShouldChangeStep}
                setIsDialogOpen={(isOpen) => { isDialogOpen.current = isOpen; }}
              />
              <RecipeStepNavButtons
                currentStep={currentStep}
                totalSteps={recipeSteps.length}
                onPrevious={handlePrevious}
                onNext={handleNext}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default EditRecipe;
