
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StepDataForm } from './StepDataForm';

interface BrewingStepCardProps {
  step: any;
  isActive: boolean;
  onComplete: () => void;
  onDataSave: (data: any) => void;
  completed: boolean;
}

export const BrewingStepCard = ({
  step,
  isActive,
  onComplete,
  onDataSave,
  completed
}: BrewingStepCardProps) => {
  return (
    <Card className={isActive ? "border-primary" : ""}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <Badge variant="outline" className="mb-2">{step.type}</Badge>
            <CardTitle>{step.name}</CardTitle>
            <CardDescription>{step.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-lg">{step.instructions}</div>
        
        <div className="border-t pt-4">
          <StepDataForm 
            stepType={step.type} 
            onSave={onDataSave}
            initialData={step.savedData}
          />
        </div>
      </CardContent>
    </Card>
  );
};
