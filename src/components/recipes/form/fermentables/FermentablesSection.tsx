
// FermentablesSection refactored to use smaller, focused subcomponents

import { useState, useCallback, useEffect } from "react";
import { useIngredients } from "@/hooks/useIngredients";
import { FermentableDialogForm } from "./FermentableDialogForm";
import { FermentablesToolbar } from "./FermentablesToolbar";
import { FermentablesList } from "./FermentablesList";

export const FermentablesSection = ({ form }) => {
  const [fermentables, setFermentables] = useState([{ id: 0 }]);
  const [showNewFermentableDialog, setShowNewFermentableDialog] = useState(false);
  const [currentFermentableIndex, setCurrentFermentableIndex] = useState<number | null>(null);
  const { addIngredient } = useIngredients();

  const addFermentable = useCallback(() => {
    setFermentables(prev => [...prev, { id: prev.length }]);
  }, []);

  const removeFermentable = useCallback((id: number) => {
    if (fermentables.length <= 1) return;
    setFermentables(prev => prev.filter(f => f.id !== id));
  }, [fermentables.length]);

  const handleAddNewFermentable = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      const formData = new FormData(event.currentTarget);

      const name = formData.get("name") as string;
      const type = (formData.get("type") as string) || "Grain";
      const color = formData.get("color") ? parseFloat(formData.get("color") as string) : undefined;
      const costPerUnit = parseFloat(formData.get("costPerUnit") as string) || 0;
      const notes = (formData.get("notes") as string) || "";

      const newFermentable = {
        name,
        type,
        color,
        amount: 0,
        unit: "g",
        costPerUnit,
        notes,
      };

      addIngredient(newFermentable);

      if (currentFermentableIndex !== null) {
        form.setValue(
          `ingredients.fermentables.${currentFermentableIndex}`,
          {
            name,
            type,
            color,
            amount: 0,
            unit: "g",
            costPerUnit,
            notes,
          },
          { shouldDirty: true, shouldTouch: true }
        );
      }

      setFermentables((prev) => {
        const exists = prev.some((f, idx) => idx === currentFermentableIndex);
        if (!exists && currentFermentableIndex !== null) {
          const newLength = currentFermentableIndex + 1;
          const filled = Array.from({ length: newLength }, (_, i) => prev[i] || { id: i });
          return filled;
        }
        return prev;
      });

      setShowNewFermentableDialog(false);
      setCurrentFermentableIndex(null);
    },
    [addIngredient, currentFermentableIndex, form]
  );

  const handleCreateNewClick = useCallback((index: number) => {
    setCurrentFermentableIndex(index);
    setShowNewFermentableDialog(true);
  }, []);

  useEffect(() => {
    const currentFermentables = form.getValues('ingredients.fermentables') || [];
    fermentables.forEach((_, index) => {
      if (!currentFermentables[index]) {
        form.setValue(`ingredients.fermentables.${index}`, { 
          name: '', 
          amount: 0, 
          costPerUnit: 0 
        }, { 
          shouldDirty: false,
          shouldTouch: false
        });
      }
    });
  }, [fermentables, form]);

  const formValues = form.getValues();
  const fermentablesData = formValues?.ingredients?.fermentables || [];
  const totalCost = fermentablesData
    .reduce(
      (acc, f) =>
        acc + ((parseFloat(f?.amount || "0") / 1000) || 0) * (parseFloat(f?.costPerUnit || "0") || 0),
      0
    )
    .toFixed(2);

  return (
    <div className="space-y-4">
      <FermentablesToolbar
        totalCost={totalCost}
        onAdd={addFermentable}
        onCreate={() => handleCreateNewClick(fermentables.length)}
      />

      <FermentablesList
        fermentables={fermentables}
        form={form}
        onRemove={removeFermentable}
        onAdd={addFermentable}
        onCreateNew={handleCreateNewClick}
        setShowNewFermentableDialog={setShowNewFermentableDialog}
      />

      <FermentableDialogForm
        open={showNewFermentableDialog}
        onOpenChange={setShowNewFermentableDialog}
        onSubmit={handleAddNewFermentable}
      />
    </div>
  );
};

