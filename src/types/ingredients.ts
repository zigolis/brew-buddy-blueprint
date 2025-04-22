
export interface Ingredient {
  id: string;
  name: string;
  type: 'Grain' | 'Sugar' | 'Extract' | 'Dry Extract' | 'Adjunct' | 'Hop' | 'Yeast' | 'Other';
  amount: number;
  unit: string;
  notes?: string;
  costPerUnit: number;
  supplier?: string;
  createdAt: string;
  updatedAt: string;
}
