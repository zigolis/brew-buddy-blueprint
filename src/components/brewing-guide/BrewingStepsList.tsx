
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Check } from "lucide-react";
import { BrewingStep } from "@/types";

interface BrewingStepsListProps {
  brewingSteps: BrewingStep[];
  completedSteps: Set<number>;
  activeStep: number;
  onStepSelect: (index: number) => void;
  onStepToggle: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
}

export const BrewingStepsList = ({
  brewingSteps,
  completedSteps,
  activeStep,
  onStepSelect,
  onStepToggle,
  onPrevious,
  onNext
}: BrewingStepsListProps) => {
  const progress = completedSteps.size > 0 
    ? Math.round((completedSteps.size / brewingSteps.length) * 100) 
    : 0;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Brewing Progress</CardTitle>
        <CardDescription>
          {completedSteps.size} of {brewingSteps.length} steps completed
        </CardDescription>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <div className="px-4 py-2">
            {brewingSteps.map((step, index) => (
              <div key={step.id} className="mb-1">
                <div 
                  className={`
                    p-2 rounded-md flex items-center cursor-pointer
                    ${completedSteps.has(index) ? 'bg-accent/50 text-accent-foreground/70' : 'hover:bg-muted'}
                    ${activeStep === index ? 'border-l-4 border-primary pl-1' : ''}
                  `}
                  onClick={() => onStepSelect(index)}
                >
                  <div 
                    className={`
                      w-5 h-5 rounded-sm border mr-2 flex items-center justify-center 
                      ${completedSteps.has(index) ? 'bg-primary border-primary' : 'border-primary'}
                    `}
                    onClick={(e) => {
                      e.stopPropagation();
                      onStepToggle(index);
                    }}
                  >
                    {completedSteps.has(index) && <Check className="h-3 w-3 text-primary-foreground" />}
                  </div>
                  <div className={`flex-1 text-sm ${completedSteps.has(index) ? 'line-through opacity-70' : ''}`}>
                    {step.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="justify-between border-t p-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={onPrevious}
          disabled={activeStep === 0}
        >
          Previous
        </Button>
        <Button 
          size="sm"
          onClick={onNext}
          disabled={activeStep === brewingSteps.length - 1}
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
};
