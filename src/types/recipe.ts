
import { Style } from './style';
import { Fermentable, Hop, Yeast, Misc } from './ingredients';
import { 
  MashProfile, 
  BoilProfile, 
  ClarificationProfile, 
  FermentationProfile, 
  ColdCrashProfile, 
  CarbonationProfile, 
  BottlingProfile, 
  WaterProfile 
} from './profiles';

export interface Recipe {
  id: string;
  name: string;
  author: string;
  type: RecipeType;
  batchSize: number;
  boilSize: number;
  boilTime: number;
  efficiency: number;
  originalGravity: number | null;
  finalGravity: number | null;
  color: number | null;
  ibu: number | null;
  abv: number | null;
  estimatedCost: number | null;
  style?: Style;
  tags?: string[];
  ingredients?: Ingredients;
  mash?: MashProfile;
  fermentation?: FermentationProfile;
  waterProfile?: WaterProfile;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  isBookmarked?: boolean;
  boil?: BoilProfile;
  carbonation?: CarbonationProfile;
  bottling?: BottlingProfile;
  clarification?: ClarificationProfile;
  coldCrash?: ColdCrashProfile;
  recipeStats?: {
    notes?: string;
  };
}

export interface Fermentable {
  id: string;
  name: string;
  amount: number;
  color: number;
  potential?: number;
  type: string;
  origin?: string;
  supplier?: string;
  notes?: string;
  costPerUnit?: number;
  unit?: string;
  yield: number;
}

export interface Hop {
  id: string;
  name: string;
  amount: number;
  time: number;
  use: HopUse;
  form: HopForm;
  alpha: number;
  beta?: number;
  origin?: string;
  supplier?: string;
  notes?: string;
  costPerUnit?: number;
  unit?: string;
}

export interface Yeast {
  id: string;
  name: string;
  amount: number;
  form: YeastForm;
  notes?: string;
  costPerUnit?: number;
  laboratory?: string;
  productId?: string;
  type?: string;
  minAttenuation?: number;
  maxAttenuation?: number;
  tempRange?: {
    min: number;
    max: number;
  };
  flocculation?: string;
}

export interface Misc {
  id: string;
  name: string;
  amount: number;
  form: MiscForm;
  notes?: string;
  costPerUnit?: number;
  unit?: string;
  time?: number;
  use?: string;
}

export interface MashProfile {
  name: string;
  grainTemp?: number;
  mashTemp?: number;
  spargeTemp?: number;
  ph?: number;
  steps: MashStep[];
  notes?: string;
}

export interface MashStep {
  id?: string;
  name: string;
  temperature: number;
  time: number;
  type: MashStepType;
  notes?: string;
}

export interface FermentationProfile {
  name: string;
  type: string;
  temperature: number;
  period: number;
  notes?: string;
  steps?: FermentationStep[];
}

export interface FermentationStep {
  id?: string;
  name: string;
  temperature: number;
  time: number;
  notes?: string;
}

export interface BoilProfile {
  name: string;
  time: number;
  temperature: number;
  notes?: string;
}

export interface ClarificationProfile {
  name: string;
  type: string;
  amount: number;
  temperature: number;
  notes?: string;
}

export interface ColdCrashProfile {
  name: string;
  type: string;
  temperature: number;
  period: number;
  notes?: string;
}

export interface CarbonationProfile {
  name: string;
  type: string;
  volumeCo2?: number;
  temperature: number;
  period: number;
  notes?: string;
}

export interface BottlingProfile {
  name: string;
  type: string;
  temperature: number;
  period: number;
  notes?: string;
}

export type RecipeType = 'Extract' | 'Partial Mash' | 'All Grain';

export type Ingredients = {
  fermentables: Fermentable[];
  hops: Hop[];
  yeasts: Yeast[];
  miscs: Misc[];
};

export type MashStepType = 'Infusion' | 'Step Infusion' | 'Temperature Rest' | 'Temperature' | 'Infusion';

export type HopUse = 'Boil' | 'Dry Hop' | 'First Wort' | 'Secondary' | 'Tertiary' | 'Mash' | 'Aroma';

export type HopForm = 'Whole' | 'Pellet' | 'Plug' | 'Leaf';

export type YeastForm = 'Liquid' | 'Dry' | 'Slant' | 'Culture';

export type MiscForm = 'Grain' | 'Hop' | 'Yeast' | 'Other';

export type CarbonationMethod = 'Dissolved CO2' | 'Carbonated Water' | 'Other' | 'Natural';

export type BottlingMethod = 'Cask' | 'Bottle' | 'Other';

export type ClarificationMethod = 'Fermentation' | 'Centrifugation' | 'Other' | 'Whirlpool';
