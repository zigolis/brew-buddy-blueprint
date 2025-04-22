
import { useIngredients } from '@/hooks/useIngredients';
import { Ingredient } from '@/types/ingredients';

export const useIngredientSuggestions = () => {
  const { ingredients } = useIngredients();

  // Ensure ingredients is always an array, even if undefined or null
  const safeIngredients = Array.isArray(ingredients) ? ingredients : [];

  const getFermentableSuggestions = (query: string): Ingredient[] => {
    if (!query) return []; // Return empty array for empty queries
    
    return safeIngredients
      .filter(ing => 
        ing.type === 'Grain' || 
        ing.type === 'Sugar' || 
        ing.type === 'Extract' || 
        ing.type === 'Dry Extract' || 
        ing.type === 'Adjunct'
      )
      .filter(ing => 
        ing.name.toLowerCase().includes(query.toLowerCase())
      );
  };

  const getHopSuggestions = (query: string): Ingredient[] => {
    if (!query) return []; // Return empty array for empty queries
    
    return safeIngredients
      .filter(ing => ing.type === 'Hop')
      .filter(ing => 
        ing.name.toLowerCase().includes(query.toLowerCase())
      );
  };

  const getYeastSuggestions = (query: string): Ingredient[] => {
    if (!query) return []; // Return empty array for empty queries
    
    return safeIngredients
      .filter(ing => ing.type === 'Yeast')
      .filter(ing => 
        ing.name.toLowerCase().includes(query.toLowerCase())
      );
  };

  return {
    getFermentableSuggestions,
    getHopSuggestions,
    getYeastSuggestions
  };
};
