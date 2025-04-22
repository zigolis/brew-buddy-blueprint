
import React from "react";
import { Progress } from "@/components/ui/progress";

interface RecipeWizardProgressProps {
  progress: number;
}

export const RecipeWizardProgress = ({ progress }: RecipeWizardProgressProps) => (
  <Progress value={progress} className="w-full" />
);
