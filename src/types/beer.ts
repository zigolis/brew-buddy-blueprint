
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
