
export interface Fermentable {
  id: string;
  name: string;
  type: string;
  amount: number;
  color: number;
  potential?: number;
  yield: number;
  supplier?: string;
  notes: string;
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
  notes: string;
  costPerUnit: number;
}

export interface Yeast {
  id: string;
  name: string;
  type: 'Ale' | 'Lager' | 'Wheat' | 'Wine' | 'Champagne';
  form: 'Liquid' | 'Dry' | 'Slant' | 'Culture';
  laboratory: string;
  productId: string;
  amount: number;
  minAttenuation: number;
  maxAttenuation: number;
  tempRange: {
    min: number;
    max: number;
  };
  flocculation: 'Low' | 'Medium' | 'High' | 'Very High';
  notes: string;
  costPerUnit: number;
  inInventory?: number;
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
