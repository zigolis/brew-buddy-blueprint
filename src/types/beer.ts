export interface Yeast {
  id: string;
  name: string;
  type: 'Ale' | 'Lager' | 'Wheat' | 'Wine' | 'Champagne';
  form: 'Liquid' | 'Dry' | 'Slant' | 'Culture';
  laboratory: string;
  productId: string;
  amount: number; // in grams
  minAttenuation: number;
  maxAttenuation: number;
  tempRange: {
    min: number; // in C
    max: number; // in C
  };
  flocculation: 'Low' | 'Medium' | 'High' | 'Very High';
  notes: string;
  costPerUnit: number;
  inInventory?: number;
}

export interface Recipe {
  id: string;
  name: string;
  author: string;
  type: 'Extract' | 'Partial Mash' | 'All Grain';
  batchSize: number;
  boilTime: number;
  efficiency: number;
  originalGravity: number | null;
  finalGravity: number | null;
  abv: number | null;
  notes: string;
  style: Style;
  ingredients: {
    fermentables: Fermentable[];
    hops: Hop[];
    yeasts: Yeast[];
    miscs: Misc[];
  };
  mash: MashProfile;
  boil: BoilProfile;
  clarification: ClarificationProfile;
  fermentation: FermentationProfile;
  coldCrash: ColdCrashProfile;
  carbonation: CarbonationProfile;
  bottling: BottlingProfile;
  waterProfile: WaterProfile;
  estimatedCost: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface BoilProfile {
  name: string;
  time: number; // in minutes
  temperature: number; // in Celsius
}

export interface ClarificationProfile {
  name: string;
  type: 'Whirlpool' | 'Filter' | 'Fining' | 'Other';
  amount: number; // in grams or ml
  temperature: number; // in Celsius
  notes: string;
}

export interface FermentationProfile {
  name: string;
  type: 'Primary' | 'Secondary' | 'Tertiary';
  temperature: number; // in Celsius
  period: number; // in days
  notes: string;
}

export interface ColdCrashProfile {
  name: string;
  type: 'Standard' | 'Gradual' | 'Quick';
  temperature: number; // in Celsius
  period: number; // in hours
  notes: string;
}

export interface CarbonationProfile {
  name: string;
  type: 'Force Carbonation' | 'Natural' | 'Spunding';
  volumeCo2: number;
  temperature: number; // in Celsius
  period: number; // in days
  notes: string;
}

export interface BottlingProfile {
  name: string;
  type: 'Bottle' | 'Keg' | 'Both';
  temperature: number; // in Celsius
  period: number; // in days
  notes: string;
}

export interface Equipment {
  id: string;
  name: string;
  type: string;
  batchSize: number;
  efficiency: number;
  cost: number;
}

export interface Style {
  name: string;
  category: string;
  categoryNumber: string;
  styleLetter: string;
  styleGuide: string;
  type: 'Ale' | 'Lager' | 'Mead' | 'Wheat' | 'Mixed' | 'Cider';
  minOg: number;
  maxOg: number;
  minFg: number;
  maxFg: number;
  minIbu: number;
  maxIbu: number;
  minColor: number;
  maxColor: number;
  minAbv: number;
  maxAbv: number;
  notes: string;
  profile: string;
  ingredients: string;
  examples: string;
}

export interface Fermentable {
  id: string;
  name: string;
  amount: number;
  color: number;
  potential: number;
  yield: number;
  costPerUnit: number;
}

export interface Hop {
  id: string;
  name: string;
  amount: number;
  alpha: number;
  time: number;
  use: 'Boil' | 'Dry Hop' | 'Mash' | 'First Wort' | 'Aroma';
  form: 'Pellet' | 'Plug' | 'Leaf';
  costPerUnit: number;
}

export interface Misc {
  id: string;
  name: string;
  amount: number;
  time: number;
  use: string;
  notes: string;
  costPerUnit: number;
}

export interface MashProfile {
  name: string;
  grainTemp: number;
  mashTemp: number;
  spargeTemp: number;
  ph: number;
  notes: string;
  steps: MashStep[];
}

export interface MashStep {
  name: string;
  type: 'Infusion' | 'Temperature' | 'Decoction';
  temperature: number;
  time: number;
}

export interface WaterProfile {
  name: string;
  calcium: number;
  magnesium: number;
  sodium: number;
  chloride: number;
  sulfate: number;
  bicarbonate: number;
  ph: number;
  notes: string;
}

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
  description: string;
  duration: number;
  temperature: number;
  completed: boolean;
}
