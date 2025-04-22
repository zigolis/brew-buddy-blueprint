
import { useEffect, useState } from 'react';
import { Recipe } from '@/types/beer';
import { useIngredients } from '@/hooks/useIngredients';
import { calculateIngredientCost } from '@/utils/costCalculator';

export const useRecipeCost = (recipe: Partial<Recipe>) => {
  const [totalCost, setTotalCost] = useState(0);
  
  useEffect(() => {
    const cost = calculateIngredientCost(recipe as Recipe);
    setTotalCost(cost);
  }, [recipe]);

  return { totalCost };
};
