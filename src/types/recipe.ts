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
  mashSchedule?: MashStep[];
  fermentation?: FermentationStep[];
  waterProfile?: WaterProfile;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  isBookmarked?: boolean;
  carbonation?: Carbonation;
  bottling?: Bottling;
  clarification?: Clarification;
  coldCrash?: ColdCrash;
  recipeStats?: {
    notes?: string;
  };
}

export interface Fermentable {
  id: string;
  name: string;
  amount: number;
  color: number;
  potential: number;
  type: string;
  origin?: string;
  supplier?: string;
  notes?: string;
  costPerUnit?: number;
  unit?: string;
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
}

export interface Misc {
  id: string;
  name: string;
  amount: number;
  form: MiscForm;
  notes?: string;
  costPerUnit?: number;
}

export interface MashStep {
  id: string;
  name: string;
  temperature: number;
  time: number;
  type: MashStepType;
  notes?: string;
}

export interface FermentationStep {
  id: string;
  name: string;
  temperature: number;
  time: number;
  notes?: string;
}

export interface Carbonation {
  id: string;
  method: CarbonationMethod;
  temperature: number;
  time: number;
  notes?: string;
}

export interface Bottling {
  id: string;
  method: BottlingMethod;
  temperature: number;
  time: number;
  notes?: string;
}

export interface Clarification {
  id: string;
  method: ClarificationMethod;
  temperature: number;
  time: number;
  notes?: string;
}

export interface ColdCrash {
  id: string;
  temperature: number;
  time: number;
  notes?: string;
}

export type RecipeType = 'Extract' | 'Partial Mash' | 'All Grain';

export type Ingredients = {
  fermentables: Fermentable[];
  hops: Hop[];
  yeasts: Yeast[];
  miscs: Misc[];
};

export type MashStepType = 'Infusion' | 'Step Infusion' | 'Temperature Rest';

export type HopUse = 'Boil' | 'Dry Hop' | 'First Wort' | 'Secondary' | 'Tertiary';

export type HopForm = 'Whole' | 'Pellet' | 'Leaf';

export type YeastForm = 'Liquid' | 'Dry';

export type MiscForm = 'Grain' | 'Hop' | 'Yeast' | 'Other';

export type CarbonationMethod = 'Dissolved CO2' | 'Carbonated Water' | 'Other';

export type BottlingMethod = 'Cask' | 'Bottle' | 'Other';

export type ClarificationMethod = 'Fermentation' | 'Centrifugation' | 'Other';
