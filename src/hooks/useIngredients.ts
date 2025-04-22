
import { useState, useEffect } from 'react';
import { Ingredient } from '@/types/ingredients';
import { v4 as uuidv4 } from 'uuid';

export const useIngredients = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>(() => {
    const saved = localStorage.getItem('brewMasterIngredients');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('brewMasterIngredients', JSON.stringify(ingredients));
  }, [ingredients]);

  const addIngredient = (ingredient: Omit<Ingredient, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newIngredient: Ingredient = {
      ...ingredient,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setIngredients(prev => [...prev, newIngredient]);
  };

  const updateIngredient = (id: string, updatedIngredient: Partial<Ingredient>) => {
    setIngredients(prev =>
      prev.map(ing =>
        ing.id === id
          ? { ...ing, ...updatedIngredient, updatedAt: new Date().toISOString() }
          : ing
      )
    );
  };

  const deleteIngredient = (id: string) => {
    setIngredients(prev => prev.filter(ing => ing.id !== id));
  };

  const getIngredientById = (id: string) => {
    return ingredients.find(ing => ing.id === id);
  };

  return {
    ingredients,
    addIngredient,
    updateIngredient,
    deleteIngredient,
    getIngredientById,
  };
};
