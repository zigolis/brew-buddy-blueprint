
import { useIngredients } from '@/hooks/useIngredients';
import { Ingredient } from '@/types/ingredients';

export const useIngredientSuggestions = () => {
  const { ingredients } = useIngredients();

  // Ensure ingredients is always an array, even if undefined or null
  const safeIngredients = Array.isArray(ingredients) ? ingredients : [];
  
  // Add console log to debug
  console.log('Available ingredients:', safeIngredients);

  const getFermentableSuggestions = (query: string): Ingredient[] => {
    if (!query || typeof query !== 'string') return []; // Return empty array for empty or invalid queries
    
    // Filter for fermentable ingredients
    const filteredIngredients = safeIngredients
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
    
    console.log('Fermentable suggestions for query:', query, filteredIngredients);
    return filteredIngredients || [];
  };

  const getHopSuggestions = (query: string): Ingredient[] => {
    if (!query || typeof query !== 'string') return []; // Return empty array for empty or invalid queries
    
    const filteredIngredients = safeIngredients
      .filter(ing => ing && ing.type === 'Hop')
      .filter(ing => 
        ing && ing.name && ing.name.toLowerCase().includes(query.toLowerCase())
      );
    
    console.log('Hop suggestions for query:', query, filteredIngredients);
    return filteredIngredients || [];
  };

  const getYeastSuggestions = (query: string): Ingredient[] => {
    if (!query || typeof query !== 'string') return []; // Return empty array for empty or invalid queries
    
    const filteredIngredients = safeIngredients
      .filter(ing => ing && ing.type === 'Yeast')
      .filter(ing => 
        ing && ing.name && ing.name.toLowerCase().includes(query.toLowerCase())
      );
    
    console.log('Yeast suggestions for query:', query, filteredIngredients);
    return filteredIngredients || [];
  };

  return {
    getFermentableSuggestions,
    getHopSuggestions,
    getYeastSuggestions
  };
};
