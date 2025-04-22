
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
}

export const RecipeWizardStepper = ({
  currentStep,
  setCurrentStep,
  recipeFormData,
  handleStepFormSubmit,
  handleCreateRecipe
}: RecipeWizardStepperProps) => (
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
