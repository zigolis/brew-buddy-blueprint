
import { useIngredients } from '@/hooks/useIngredients';
import { Ingredient } from '@/types/ingredients';

export const useIngredientSuggestions = () => {
  const { ingredients, addIngredient } = useIngredients();

  const safeIngredients = Array.isArray(ingredients) ? ingredients : [];
  
  // Debug log
  console.log('Available ingredients:', safeIngredients);

  const getFermentableSuggestions = (query: string): Ingredient[] => {
    if (!query || typeof query !== 'string') return [];
    return safeIngredients
      .filter(ing => 
        ing && (
          ing.type === 'Grain' || 
          ing.type === 'Sugar' || 
          ing.type === 'Extract' || 
          ing.type === 'Dry Extract' || 
          ing.type === 'Adjunct'
        )
      )
      .filter(ing => 
        ing && ing.name && ing.name.toLowerCase().includes(query.toLowerCase())
      );
  };

  const getHopSuggestions = (query: string): Ingredient[] => {
    if (!query || typeof query !== 'string') return [];
    return safeIngredients
      .filter(ing => ing && ing.type === 'Hop')
      .filter(ing => 
        ing && ing.name && ing.name.toLowerCase().includes(query.toLowerCase())
      );
  };

  const getYeastSuggestions = (query: string): Ingredient[] => {
    if (!query || typeof query !== 'string') return [];
    return safeIngredients
      .filter(ing => ing && ing.type === 'Yeast')
      .filter(ing => 
        ing && ing.name && ing.name.toLowerCase().includes(query.toLowerCase())
      );
  };

  // Add support for modals in hops and yeasts section
  const addNewHop = (hopData: any) => {
    addIngredient({ ...hopData, type: "Hop", unit: "g", amount: hopData.amount || 0 });
  };

  const addNewYeast = (yeastData: any) => {
    addIngredient({ ...yeastData, type: "Yeast", unit: "pkg", amount: yeastData.amount || 1 });
  };

  return {
    getFermentableSuggestions,
    getHopSuggestions,
    getYeastSuggestions,
    addNewHop,
    addNewYeast,
  };
};
