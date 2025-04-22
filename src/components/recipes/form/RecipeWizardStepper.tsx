
import React, { useEffect } from "react";
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
  setIsDialogOpen?: (isOpen: boolean) => void;
}

export const RecipeWizardStepper = ({
  currentStep,
  setCurrentStep,
  recipeFormData,
  handleStepFormSubmit,
  handleCreateRecipe,
  setShouldChangeStep,
  setIsDialogOpen
}: RecipeWizardStepperProps) => {
  // Track dialog state for both fermentable dialog and any radix dialog
  useEffect(() => {
    const handleDialogState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if clicking on a dialog
      if (target && target.closest('[role="dialog"]')) {
        // If dialog is open, don't allow step changes
        setShouldChangeStep(false);
        if (setIsDialogOpen) setIsDialogOpen(true);
        console.log("Dialog detected - disabling step changes");
      } else {
        // Check if we're clicking outside a dialog, indicating it's closing
        const activeDialogs = document.querySelectorAll('[role="dialog"]');
        if (activeDialogs.length === 0) {
          // Re-enable step changes when dialog closes
          setShouldChangeStep(true);
          if (setIsDialogOpen) setIsDialogOpen(false);
          console.log("No active dialogs - enabling step changes");
        }
      }
    };

    // Also monitor for dialog open/close via attributes
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-state') {
          const element = mutation.target as HTMLElement;
          if (element.getAttribute('role') === 'dialog') {
            const isOpen = element.getAttribute('data-state') === 'open';
            setShouldChangeStep(!isOpen);
            if (setIsDialogOpen) setIsDialogOpen(isOpen);
            console.log(`Dialog ${isOpen ? 'opened' : 'closed'} - ${isOpen ? 'disabling' : 'enabling'} step changes`);
          }
        }
      });
    });

    // Observe all dialogs for attribute changes
    document.querySelectorAll('[role="dialog"]').forEach(dialog => {
      mutationObserver.observe(dialog, { attributes: true });
    });

    document.addEventListener('click', handleDialogState);
    
    return () => {
      document.removeEventListener('click', handleDialogState);
      mutationObserver.disconnect();
    };
  }, [setShouldChangeStep, setIsDialogOpen]);

  return (
    <Tabs
      value={recipeSteps[currentStep].id}
      onValueChange={value => {
        const newIndex = recipeSteps.findIndex(step => step.id === value);
        if (newIndex !== -1) setCurrentStep(newIndex);
      }}
    >
      <RecipeStepsNavigation steps={recipeSteps} currentStep={currentStep} />
      <div className="mt-6 md:mt-8"> {/* Add margin here */}
        {recipeSteps.map((step, index) => (
          <TabsContent key={step.id} value={step.id}>
            <RecipeForm
              onSubmit={index === recipeSteps.length - 1 ? handleCreateRecipe : handleStepFormSubmit}
              initialData={recipeFormData}
              visibleSections={[...step.sections]}
            />
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};
