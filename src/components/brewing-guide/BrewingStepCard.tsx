
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StepDataForm } from './StepDataForm';
import { Button } from "@/components/ui/button";
import { Clock, ThermometerSnowflake, FileText, Check } from "lucide-react";

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
    <Card className={`${isActive ? "border-primary" : ""} transition-all`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <Badge variant="outline" className="mb-2">{step.type}</Badge>
            <CardTitle className="flex items-center">
              {step.name}
              {completed && <Check className="ml-2 h-4 w-4 text-green-500" />}
            </CardTitle>
            <CardDescription>{step.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-lg">{step.instructions}</div>
        
        {step.temperature && (
          <div className="flex items-center text-sm text-muted-foreground">
            <ThermometerSnowflake className="h-4 w-4 mr-2" />
            <span>Target Temperature: {step.temperature}°C</span>
          </div>
        )}
        
        {step.duration && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            <span>Duration: {step.duration < 60 ? `${step.duration} minutes` : 
              step.duration < 24*60 ? `${Math.floor(step.duration/60)} hours ${step.duration%60} minutes` : 
              `${Math.floor(step.duration/(24*60))} days`}
            </span>
          </div>
        )}
        
        <div className="border-t pt-4">
          <div className="mb-4">
            <h3 className="text-lg font-medium flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Record Data
            </h3>
            <p className="text-sm text-muted-foreground">
              Track your brewing process by recording measurements and notes for this step.
            </p>
          </div>
          
          <StepDataForm 
            stepType={step.type} 
            onSave={onDataSave}
            initialData={step.savedData}
          />
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button 
          onClick={onComplete} 
          variant={completed ? "outline" : "default"} 
          className="w-full"
        >
          {completed ? "Mark as Incomplete" : "Mark as Complete"}
        </Button>
      </CardFooter>
    </Card>
  );
};
