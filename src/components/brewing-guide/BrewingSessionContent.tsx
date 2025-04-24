
import React from 'react';
import { BrewingStepCard } from './BrewingStepCard';
import { BrewingStepsList } from './BrewingStepsList';
import { BrewingStep } from '@/types';

interface BrewingSessionContentProps {
  brewingSteps: BrewingStep[];
  completedSteps: Set<number>;
  activeStep: number;
  onStepSelect: (index: number) => void;
  onStepToggle: (index: number) => void;
  onStepDataSave: (stepId: string, data: any) => void;
  onPreviousStep: () => void;
  onNextStep: () => void;
  stepData: Record<string, any>;
}

export const BrewingSessionContent = ({
  brewingSteps,
  completedSteps,
  activeStep,
  onStepSelect,
  onStepToggle,
  onStepDataSave,
  onPreviousStep,
  onNextStep,
  stepData
}: BrewingSessionContentProps) => {
  const currentStep = brewingSteps[activeStep];
  
  if (!currentStep) {
    return <div>No steps available</div>;
  }
  
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-1/3">
        <BrewingStepsList
          brewingSteps={brewingSteps}
          completedSteps={completedSteps}
          activeStep={activeStep}
          onStepSelect={onStepSelect}
          onStepToggle={onStepToggle}
          onPrevious={onPreviousStep}
          onNext={onNextStep}
        />
      </div>
      
      <div className="md:w-2/3">
        <BrewingStepCard
          step={{...currentStep, savedData: stepData[currentStep.id]}}
          isActive={true}
          onComplete={() => onStepToggle(activeStep)}
          onDataSave={(data) => onStepDataSave(currentStep.id, data)}
          completed={completedSteps.has(activeStep)}
        />
      </div>
    </div>
  );
};
