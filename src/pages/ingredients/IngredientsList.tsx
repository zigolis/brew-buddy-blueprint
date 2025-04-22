
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { IngredientDialog } from "@/components/ingredients/IngredientDialog";
import { IngredientTable } from "@/components/ingredients/IngredientTable";
import { useIngredients } from "@/hooks/useIngredients";

const IngredientsList = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState<string | null>(null);
  const { ingredients, deleteIngredient } = useIngredients();

  const handleEdit = (id: string) => {
    setEditingIngredient(id);
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setEditingIngredient(null);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Ingredients</h1>
            <p className="text-muted-foreground">Manage your brewing ingredients</p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2" />
            Add Ingredient
          </Button>
        </div>

        <IngredientTable 
          ingredients={ingredients}
          onEdit={handleEdit}
          onDelete={deleteIngredient}
        />

        <IngredientDialog
          open={isDialogOpen}
          onClose={handleClose}
          ingredientId={editingIngredient}
        />
      </div>
    </Layout>
  );
};

export default IngredientsList;
