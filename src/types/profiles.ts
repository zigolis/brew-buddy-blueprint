
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

export interface BoilProfile {
  name: string;
  time: number;
  temperature: number;
}

export interface ClarificationProfile {
  name: string;
  type: 'Whirlpool' | 'Filter' | 'Fining' | 'Other';
  amount: number;
  temperature: number;
  notes: string;
}

export interface FermentationProfile {
  name: string;
  type: 'Primary' | 'Secondary' | 'Tertiary';
  temperature: number;
  period: number;
  notes: string;
  steps?: {
    name: string;
    temperature: number;
    time: number;
  }[];
}

export interface ColdCrashProfile {
  name: string;
  type: 'Standard' | 'Gradual' | 'Quick';
  temperature: number;
  period: number;
  notes: string;
}

export interface CarbonationProfile {
  name: string;
  type: 'Force Carbonation' | 'Natural' | 'Spunding';
  volumeCo2: number;
  temperature: number;
  period: number;
  notes: string;
}

export interface BottlingProfile {
  name: string;
  type: 'Bottle' | 'Keg' | 'Both';
  temperature: number;
  period: number;
  notes: string;
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
