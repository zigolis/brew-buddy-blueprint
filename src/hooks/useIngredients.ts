
import { useState, useEffect } from 'react';
import { Ingredient } from '@/types/ingredients';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

export const useIngredients = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>(() => {
    try {
      const saved = localStorage.getItem('brewMasterIngredients');
      // Ensure we always return an array, even if localStorage has invalid data
      const parsedData = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsedData) ? parsedData : [];
    } catch (error) {
      console.error('Error loading ingredients from localStorage', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('brewMasterIngredients', JSON.stringify(ingredients));
    } catch (error) {
      console.error('Error saving ingredients to localStorage', error);
    }
  }, [ingredients]);

  const addIngredient = (ingredient: Omit<Ingredient, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newIngredient: Ingredient = {
        id: uuidv4(),
        name: ingredient.name,
        type: ingredient.type,
        amount: ingredient.amount,
        unit: ingredient.unit,
        costPerUnit: ingredient.costPerUnit,
        supplier: ingredient.supplier || "",
        notes: ingredient.notes || "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setIngredients(prev => [...prev, newIngredient]);
      toast.success(`Added ${newIngredient.name} successfully`);
    } catch (error) {
      console.error('Error adding ingredient:', error);
      toast.error('Failed to add ingredient');
    }
  };

  const updateIngredient = (id: string, updatedIngredient: Partial<Ingredient>) => {
    try {
      setIngredients(prev =>
        prev.map(ing =>
          ing.id === id
            ? { ...ing, ...updatedIngredient, updatedAt: new Date().toISOString() }
            : ing
        )
      );
      toast.success('Ingredient updated successfully');
    } catch (error) {
      console.error('Error updating ingredient:', error);
      toast.error('Failed to update ingredient');
    }
  };

  const deleteIngredient = (id: string) => {
    try {
      setIngredients(prev => prev.filter(ing => ing.id !== id));
      toast.success('Ingredient deleted successfully');
    } catch (error) {
      console.error('Error deleting ingredient:', error);
      toast.error('Failed to delete ingredient');
    }
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
