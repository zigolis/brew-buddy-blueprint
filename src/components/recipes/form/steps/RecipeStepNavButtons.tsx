
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface RecipeStepNavButtonsProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
}

export const RecipeStepNavButtons = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
}: RecipeStepNavButtonsProps) => {
  return (
    <div className="flex justify-between pt-4">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 0}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Previous
      </Button>
      {currentStep === totalSteps - 1 ? (
        <Button type="submit" form="recipe-form">
          Create Recipe
        </Button>
      ) : (
        <Button onClick={onNext}>
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
