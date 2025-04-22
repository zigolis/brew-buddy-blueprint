
import { Layout } from "@/components/layout/Layout";
import { useState } from "react";
import { recipeSteps } from "@/constants/recipeSteps";
import { RecipeStepsNavigation } from "@/components/recipes/form/steps/RecipeStepsNavigation";
import { RecipeStepNavButtons } from "@/components/recipes/form/steps/RecipeStepNavButtons";
import { RecipeWizardHeader } from "@/components/recipes/form/RecipeWizardHeader";
import { RecipeWizardProgress } from "@/components/recipes/form/RecipeWizardProgress";
import { RecipeWizardStepper } from "@/components/recipes/form/RecipeWizardStepper";
import { useCreateRecipe } from "@/hooks/useCreateRecipe";
import { Style, Recipe } from "@/types";

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

const defaultRecipeData: Partial<Recipe> = {
  name: '',
  author: '',
  style: defaultStyle,
  type: "All Grain",
  batchSize: 20,
  boilSize: 23,
  boilTime: 60,
  efficiency: 75,
};

const NewRecipe = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [recipeFormData, setRecipeFormData] = useState<Partial<Recipe>>(defaultRecipeData);

  const { handleStepFormSubmit, handleCreateRecipe } = useCreateRecipe(recipeFormData, setRecipeFormData);

  const onStepSubmit = (stepData: Partial<Recipe>) => {
    handleStepFormSubmit(stepData, currentStep, setCurrentStep, recipeSteps);
  };

  const progress = ((currentStep + 1) / recipeSteps.length) * 100;

  // Modified to save form data without automatically changing step
  const handleNext = () => {
    // Get form data, then move to next
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
      
      // Only change step if it's a manual navigation
      if (currentStep < recipeSteps.length - 1) {
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
        <RecipeWizardHeader />

        <RecipeWizardProgress progress={progress} />

        <div className="space-y-6">
          <RecipeWizardStepper
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            recipeFormData={recipeFormData}
            handleStepFormSubmit={onStepSubmit}
            handleCreateRecipe={handleCreateRecipe}
          />
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
