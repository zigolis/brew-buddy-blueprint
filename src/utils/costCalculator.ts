import { Recipe, Equipment } from '@/types';

/**
 * Calculate the total cost of a recipe, including ingredients and equipment depreciation
 */
export function calculateTotalRecipeCost(recipe: Recipe, equipment: Equipment[] = []): number {
  const ingredientCost = calculateIngredientCost(recipe);
  const equipmentCost = calculateEquipmentCost(recipe, equipment);
  const utilitiesCost = calculateUtilitiesCost(recipe);
  
  return ingredientCost + equipmentCost + utilitiesCost;
}

/**
 * Calculate the cost per serving
 */
export function calculateCostPerServing(totalCost: number, servings: number): number {
  if (servings <= 0) return 0;
  return totalCost / servings;
}

/**
 * Calculate the cost of ingredients in a recipe
 */
export function calculateIngredientCost(recipe: Recipe): number {
  let total = 0;
  
  // Calculate fermentable costs
  recipe.ingredients.fermentables.forEach(fermentable => {
    total += fermentable.amount * fermentable.costPerUnit;
  });
  
  // Calculate hop costs
  recipe.ingredients.hops.forEach(hop => {
    total += hop.amount * hop.costPerUnit;
  });
  
  // Calculate yeast costs
  recipe.ingredients.yeasts.forEach(yeast => {
    total += yeast.costPerUnit;
  });
  
  // Calculate misc ingredient costs
  recipe.ingredients.miscs.forEach(misc => {
    total += misc.amount * misc.costPerUnit;
  });
  
  return total;
}

/**
 * Calculate the equipment depreciation cost for a brew
 */
function calculateEquipmentCost(recipe: Recipe, equipment: Equipment[]): number {
  if (equipment.length === 0) return 0;
  
  // Calculate a very simple equipment cost by averaging the equipment cost 
  // across an expected lifetime of brews
  const expectedLifetimeBrews = 100; // Assume equipment lasts for 100 brews
  let equipmentValue = 0;
  
  equipment.forEach(item => {
    equipmentValue += item.cost;
  });
  
  return equipmentValue / expectedLifetimeBrews;
}

/**
 * Estimate utilities cost (water, electricity, etc.) for a brew
 */
function calculateUtilitiesCost(recipe: Recipe): number {
  // Estimate utilities based on batch size and boil time
  const waterCostPerLiter = 0.003; // Estimated cost per liter of water
  const electricityCostPerMinute = 0.02; // Estimated cost for heating per minute
  const gasCostPerMinute = 0.015; // Estimated cost for gas heating per minute
  
  // Estimate water cost (batch size plus 30% for cleaning, etc.)
  const waterCost = recipe.batchSize * 1.3 * waterCostPerLiter;
  
  // Estimate heating cost (electric or gas)
  const heatingCost = recipe.boilTime * electricityCostPerMinute;
  
  return waterCost + heatingCost;
}

/**
 * Get a breakdown of costs by category
 */
export function getRecipeCostBreakdown(recipe: Recipe, equipment: Equipment[] = []): {
  ingredients: number,
  equipment: number,
  utilities: number,
  total: number
} {
  const ingredients = calculateIngredientCost(recipe);
  const equipmentCost = calculateEquipmentCost(recipe, equipment);
  const utilities = calculateUtilitiesCost(recipe);
  const total = ingredients + equipmentCost + utilities;
  
  return {
    ingredients,
    equipment: equipmentCost,
    utilities,
    total
  };
}
