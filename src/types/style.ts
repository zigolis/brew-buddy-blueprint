
export interface Style {
  name: string;
  category: string;
  categoryNumber: string;
  styleLetter: string;
  styleGuide: string;
  type: 'Ale' | 'Lager' | 'Mead' | 'Wheat' | 'Mixed' | 'Cider' | 'Other';
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
