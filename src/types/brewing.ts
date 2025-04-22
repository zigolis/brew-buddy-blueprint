
export interface BrewingSession {
  id: string;
  recipeId: string;
  startDate: string;
  endDate: string | null;
  status: 'Planning' | 'In Progress' | 'Completed' | 'Failed';
  notes: string;
  measurements: BrewingMeasurement[];
}

export interface BrewingMeasurement {
  id: string;
  type: string;
  value: number;
  unit: string;
  timestamp: string;
  notes: string;
}

export interface BrewingStep {
  id: string;
  name: string;
  type: string;
  instructions: string;
  completed: boolean;
  description?: string;
  duration?: number;
  temperature?: number;
}
