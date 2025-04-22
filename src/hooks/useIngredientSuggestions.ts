
import { useIngredients } from '@/hooks/useIngredients';
import { Ingredient } from '@/types/ingredients';

export const useIngredientSuggestions = () => {
  const { ingredients } = useIngredients();

  const getFermentableSuggestions = (query: string): Ingredient[] => {
    // Ensure ingredients exists and is an array before filtering
    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) return [];

    return ingredients
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
    // Ensure ingredients exists and is an array before filtering
    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) return [];

    return ingredients
      .filter(ing => ing.type === 'Hop')
      .filter(ing => 
        ing.name.toLowerCase().includes(query.toLowerCase())
      );
  };

  const getYeastSuggestions = (query: string): Ingredient[] => {
    // Ensure ingredients exists and is an array before filtering
    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) return [];

    return ingredients
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
