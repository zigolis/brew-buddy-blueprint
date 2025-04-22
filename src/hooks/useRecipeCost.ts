
import { useEffect, useState } from 'react';
import { Recipe } from '@/types';
import { calculateIngredientCost } from '@/utils/costCalculator';

export const useRecipeCost = (recipe: Partial<Recipe>) => {
  const [totalCost, setTotalCost] = useState(0);
  
  useEffect(() => {
    // Only calculate cost if we have a valid recipe with ingredients
    if (recipe && Object.keys(recipe).length > 0) {
      const cost = calculateIngredientCost(recipe);
      setTotalCost(cost);
    } else {
      setTotalCost(0);
    }
  }, [recipe]);

  return { totalCost };
};
