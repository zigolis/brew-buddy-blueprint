
import React from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { RecipeStepsNavigation } from "@/components/recipes/form/steps/RecipeStepsNavigation";
import { RecipeForm } from "@/components/recipes/RecipeForm";
import { recipeSteps } from "@/constants/recipeSteps";

interface RecipeWizardStepperProps {
  currentStep: number;
  setCurrentStep: (n: number) => void;
  recipeFormData: any;
  handleStepFormSubmit: (d: any) => void;
  handleCreateRecipe: (d: any) => void;
  setShouldChangeStep: (shouldChange: boolean) => void;
}

export const RecipeWizardStepper = ({
  currentStep,
  setCurrentStep,
  recipeFormData,
  handleStepFormSubmit,
  handleCreateRecipe,
  setShouldChangeStep
}: RecipeWizardStepperProps) => {
  // When fermentable dialog is open, temporarily disable step changes
  React.useEffect(() => {
    const handleDialogState = (e: any) => {
      if (e.target && e.target.getAttribute('role') === 'dialog') {
        // If dialog is open, don't allow step changes
        setShouldChangeStep(false);
      } else {
        // Re-enable step changes when dialog closes
        setShouldChangeStep(true);
      }
    };

    document.addEventListener('click', handleDialogState);
    return () => document.removeEventListener('click', handleDialogState);
  }, [setShouldChangeStep]);

  return (
    <Tabs
      value={recipeSteps[currentStep].id}
      onValueChange={value => {
        const newIndex = recipeSteps.findIndex(step => step.id === value);
        if (newIndex !== -1) setCurrentStep(newIndex);
      }}
    >
      <RecipeStepsNavigation steps={recipeSteps} currentStep={currentStep} />
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
  );
};
