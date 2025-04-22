
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { IngredientTable } from "@/components/ingredients/IngredientTable";
import { IngredientForm } from "@/components/ingredients/IngredientForm";
import { useIngredients } from "@/hooks/useIngredients";
import { Ingredient } from "@/types/ingredients";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const IngredientsList = () => {
  const [editingIngredient, setEditingIngredient] = useState<string | null>(null);
  const [isAddingIngredient, setIsAddingIngredient] = useState(false);
  const { ingredients, addIngredient, updateIngredient, deleteIngredient, getIngredientById } = useIngredients();

  const handleEdit = (id: string) => {
    setEditingIngredient(id);
    setIsAddingIngredient(true);
  };

  const handleAddNew = () => {
    setEditingIngredient(null);
    setIsAddingIngredient(true);
  };

  const handleCancel = () => {
    setIsAddingIngredient(false);
    setEditingIngredient(null);
  };

  const handleSubmit = (data: Omit<Ingredient, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingIngredient) {
      updateIngredient(editingIngredient, data);
    } else {
      addIngredient(data);
    }
    setIsAddingIngredient(false);
    setEditingIngredient(null);
  };

  const getFormDefaultValues = () => {
    if (editingIngredient) {
      const ingredient = getIngredientById(editingIngredient);
      if (ingredient) {
        return {
          name: ingredient.name,
          type: ingredient.type,
          amount: ingredient.amount,
          unit: ingredient.unit,
          costPerUnit: ingredient.costPerUnit,
          supplier: ingredient.supplier || "",
          notes: ingredient.notes || "",
        };
      }
    }
    
    return {
      name: "",
      type: "Grain",
      amount: 0,
      unit: "kg",
      costPerUnit: 0,
      supplier: "",
      notes: "",
    };
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Ingredients</h1>
            <p className="text-muted-foreground">Manage your brewing ingredients</p>
          </div>
          {!isAddingIngredient && (
            <Button onClick={handleAddNew}>
              <Plus className="mr-2" />
              Add Ingredient
            </Button>
          )}
        </div>

        {isAddingIngredient ? (
          <Card>
            <CardHeader>
              <CardTitle>{editingIngredient ? "Edit Ingredient" : "Add Ingredient"}</CardTitle>
            </CardHeader>
            <CardContent>
              <IngredientForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                ingredientId={editingIngredient}
                defaultValues={getFormDefaultValues()}
              />
            </CardContent>
          </Card>
        ) : (
          <IngredientTable 
            ingredients={ingredients}
            onEdit={handleEdit}
            onDelete={deleteIngredient}
          />
        )}
      </div>
    </Layout>
  );
};

export default IngredientsList;
