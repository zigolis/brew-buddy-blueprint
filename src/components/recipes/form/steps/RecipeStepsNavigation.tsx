
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface RecipeStepsNavigationProps {
  steps: ReadonlyArray<{
    id: string;
    title: string;
  }>;
  currentStep: number;
}

export const RecipeStepsNavigation = ({
  steps,
  currentStep,
}: RecipeStepsNavigationProps) => {
  return (
    <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-7">
      {steps.map((step, index) => (
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
  );
};
