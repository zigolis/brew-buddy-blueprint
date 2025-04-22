
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
