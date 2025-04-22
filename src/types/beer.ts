
// Core recipe types
export interface Recipe {
  id: string;
  name: string;
  author: string;
  type: 'All Grain' | 'Extract' | 'Partial Mash';
  batchSize: number; // in liters
  boilTime: number; // in minutes
  efficiency: number; // brewhouse efficiency in %
  style: Style;
  ingredients: {
    fermentables: Fermentable[];
    hops: Hop[];
    yeasts: Yeast[];
    miscs: Misc[];
  };
  mash: MashProfile;
  fermentation: FermentationProfile;
  waterProfile: WaterProfile;
  notes: string;
  estimatedCost: number;
  totalCost?: number;
  costPerServing?: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Style {
  name: string;
  category: string;
  categoryNumber: string;
  styleLetter: string;
  styleGuide: string;
  type: 'Lager' | 'Ale' | 'Wheat' | 'Mixed' | 'Other';
  minOg: number;
  maxOg: number;
  minFg: number;
  maxFg: number;
  minIbu: number;
  maxIbu: number;
  minColor: number; // in SRM
  maxColor: number; // in SRM
  minAbv: number;
  maxAbv: number;
  notes: string;
  profile: string;
  ingredients: string;
  examples: string;
}

// Ingredients
export interface Fermentable {
  id: string;
  name: string;
  type: 'Grain' | 'Sugar' | 'Extract' | 'Dry Extract' | 'Adjunct';
  amount: number; // in kg
  yield: number; // in percent
  color: number; // in lovibond
  supplier: string;
  notes: string;
  costPerUnit: number;
  inInventory?: number;
}

export interface Hop {
  id: string;
  name: string;
  alpha: number; // in percent
  amount: number; // in kg
  use: 'Boil' | 'Dry Hop' | 'Mash' | 'First Wort' | 'Aroma';
  time: number; // in minutes
  form: 'Pellet' | 'Plug' | 'Leaf';
  notes: string;
  costPerUnit: number;
  inInventory?: number;
}

export interface Yeast {
  id: string;
  name: string;
  type: 'Ale' | 'Lager' | 'Wheat' | 'Wine' | 'Champagne';
  form: 'Liquid' | 'Dry' | 'Slant' | 'Culture';
  laboratory: string;
  productId: string;
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

export interface Misc {
  id: string;
  name: string;
  type: 'Spice' | 'Fining' | 'Water Agent' | 'Herb' | 'Flavor' | 'Other';
  use: 'Boil' | 'Mash' | 'Primary' | 'Secondary' | 'Bottling';
  time: number; // in minutes
  amount: number; // in kg
  amountIsWeight: boolean;
  notes: string;
  costPerUnit: number;
  inInventory?: number;
}

// Brewing Process
export interface MashStep {
  name: string;
  type: 'Infusion' | 'Temperature' | 'Decoction';
  temperature: number; // in C
  time: number; // in minutes
}

export interface MashProfile {
  name: string;
  grainTemp: number; // in C
  mashTemp: number; // in C
  spargeTemp: number; // in C
  ph: number;
  steps: MashStep[];
  notes: string;
}

export interface FermentationStep {
  name: string;
  temperature: number; // in C
  time: number; // in days
}

export interface FermentationProfile {
  name: string;
  steps: FermentationStep[];
  notes: string;
}

export interface WaterProfile {
  name: string;
  calcium: number; // in ppm
  magnesium: number; // in ppm
  sodium: number; // in ppm
  chloride: number; // in ppm
  sulfate: number; // in ppm
  bicarbonate: number; // in ppm
  ph: number;
  notes: string;
}

// Equipment
export interface Equipment {
  id: string;
  name: string;
  type: string;
  batchSize: number; // in liters
  boilSize: number; // in liters
  boilTime: number; // in minutes
  efficiency: number; // in percent
  notes: string;
  cost: number;
  purchaseDate?: string;
}

// Brewing session
export interface BrewingSession {
  id: string;
  recipeId: string;
  brewDate: string;
  brewers: string[];
  actualBatchSize: number;
  efficiency: number;
  notes: string;
  steps: BrewingStep[];
  measurements: Measurement[];
  costs: Cost[];
  totalCost: number;
}

export interface BrewingStep {
  id: string;
  type: 'Preparation' | 'Mash' | 'Boil' | 'Fermentation' | 'Packaging';
  name: string;
  instructions: string;
  completed: boolean;
  startTime?: string;
  endTime?: string;
  notes?: string;
}

export interface Measurement {
  id: string;
  type: 'Temperature' | 'Gravity' | 'pH' | 'Volume' | 'Other';
  value: number;
  unit: string;
  timestamp: string;
  notes?: string;
}

export interface Cost {
  id: string;
  category: 'Ingredients' | 'Equipment' | 'Utilities' | 'Other';
  name: string;
  amount: number;
  notes?: string;
}
