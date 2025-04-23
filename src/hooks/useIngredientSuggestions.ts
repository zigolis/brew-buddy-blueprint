
import { Ingredient } from "@/types";

// This hook is kept for backward compatibility
// Its functionality has been moved to useIngredients
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
  // These methods are now provided by useIngredients
  const getFermentableSuggestions = (query: string) => {
    console.warn('useIngredientSuggestions is deprecated, use useIngredients instead');
    return [];
  };

  const getHopSuggestions = (query: string) => {
    console.warn('useIngredientSuggestions is deprecated, use useIngredients instead');
    return [];
  };

  const getYeastSuggestions = (query: string) => {
    console.warn('useIngredientSuggestions is deprecated, use useIngredients instead');
    return [];
  };

  const addNewHop = (hopData: Partial<Ingredient>) => {
    console.warn('useIngredientSuggestions is deprecated, use useIngredients instead');
    return createIngredientSuggestion(hopData);
  };

  const addNewYeast = (yeastData: Partial<Ingredient>) => {
    console.warn('useIngredientSuggestions is deprecated, use useIngredients instead');
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
