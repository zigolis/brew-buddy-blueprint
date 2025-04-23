
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IngredientForm } from "@/components/ingredients/IngredientForm";
import { Ingredient } from "@/types";
import { v4 as uuidv4 } from 'uuid';

interface CreateIngredientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialName: string;
  typeOverride?: string;
  showYeastFields?: boolean;
  onIngredientCreated: (ingredient: Ingredient) => void;
}

export function CreateIngredientDialog({
  open,
  onOpenChange,
  initialName,
  typeOverride,
  showYeastFields = false,
  onIngredientCreated,
}: CreateIngredientDialogProps) {
  const handleSubmit = (data: Omit<Ingredient, 'id' | 'createdAt' | 'updatedAt'>) => {
    // Create a complete Ingredient object by adding the missing properties
    const newIngredient: Ingredient = {
      ...data,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    onIngredientCreated(newIngredient);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Ingredient</DialogTitle>
        </DialogHeader>
        <IngredientForm
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          ingredientId={null}
          defaultValues={{
            name: initialName,
            type: typeOverride || "Grain",
            amount: 0,
            unit: "g",
            costPerUnit: 0,
            notes: "",
          }}
          typeOverride={typeOverride}
          showYeastFields={showYeastFields}
        />
      </DialogContent>
    </Dialog>
  )
}
