
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IngredientForm } from "@/components/ingredients/IngredientForm";
import { Ingredient } from "@/types";

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
    onIngredientCreated(data);
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
