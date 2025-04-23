
import { Ingredient } from "@/types";

export const createIngredientSuggestion = (data: Partial<Ingredient>): Ingredient => {
  return {
    id: data.id || '',
    name: data.name || '',
    type: data.type || '',
    amount: data.amount || 0,
    unit: data.unit || 'kg',
    costPerUnit: data.costPerUnit || 0,
    notes: data.notes || '',
    supplier: data.supplier || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

export const useIngredientSuggestions = () => {
  const getFermentableSuggestions = (query: string) => {
    // Mock implementation for now
    return [];
  };

  const getHopSuggestions = (query: string) => {
    // Mock implementation for now
    return [];
  };

  const getYeastSuggestions = (query: string) => {
    // Mock implementation for now
    return [];
  };

  const addNewHop = (hopData: Partial<Ingredient>) => {
    return createIngredientSuggestion(hopData);
  };

  const addNewYeast = (yeastData: Partial<Ingredient>) => {
    return createIngredientSuggestion(yeastData);
  };

  return {
    getFermentableSuggestions,
    getHopSuggestions,
    getYeastSuggestions,
    addNewHop,
    addNewYeast
  };
};
