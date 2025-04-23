
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
