import { Style } from './style';
import { 
  MashProfile, 
  BoilProfile, 
  ClarificationProfile, 
  FermentationProfile, 
  ColdCrashProfile, 
  CarbonationProfile, 
  BottlingProfile, 
  WaterProfile,
  MashStep,
  FermentationStep
} from './profiles';
import { 
  Fermentable as IngredientFermentable, 
  Hop as IngredientHop, 
  Yeast as IngredientYeast, 
  Misc as IngredientMisc 
} from './ingredients';

export type { Style };

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
  sparging?: SpargingProfile;
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
  isBrewed?: boolean;
  rating?: number;
  brewingNotes?: string;
  actualOriginalGravity?: number | null;
  actualFinalGravity?: number | null;
  actualAbv?: number | null;
  actualIbu?: number | null;
  fermentablesNotes?: string;
  hopsNotes?: string;
  yeastNotes?: string;
  mashNotes?: string;
  boilNotes?: string;
}

export type Ingredients = {
  fermentables: IngredientFermentable[];
  hops: IngredientHop[];
  yeasts: IngredientYeast[];
  miscs: IngredientMisc[];
};

export type RecipeType = 'Extract' | 'Partial Mash' | 'All Grain';

export type HopUse = 'Boil' | 'Dry Hop' | 'First Wort' | 'Secondary' | 'Tertiary' | 'Mash' | 'Aroma';
export type HopForm = 'Whole' | 'Pellet' | 'Plug' | 'Leaf';
export type YeastForm = 'Liquid' | 'Dry' | 'Slant' | 'Culture';
export type MiscForm = 'Grain' | 'Hop' | 'Yeast' | 'Other';
export type CarbonationMethod = 'Dissolved CO2' | 'Carbonated Water' | 'Other' | 'Natural';
export type BottlingMethod = 'Cask' | 'Bottle' | 'Other';
export type ClarificationMethod = 'Fermentation' | 'Centrifugation' | 'Other' | 'Whirlpool';
