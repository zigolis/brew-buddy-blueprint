
import { useState, useCallback, useEffect } from "react";
import { useIngredients } from "@/hooks/useIngredients";

export const useFermentablesForm = (form: any) => {
  const [fermentables, setFermentables] = useState([{ id: 0 }]);
  const [showNewFermentableDialog, setShowNewFermentableDialog] = useState(false);
  const [currentFermentableIndex, setCurrentFermentableIndex] = useState<number | null>(null);
  const { addIngredient } = useIngredients();

  const addFermentable = useCallback(() => {
    setFermentables(prev => [...prev, { id: prev.length }]);
  }, []);

  const removeFermentable = useCallback((id: number) => {
    setFermentables(prev => {
      if (prev.length <= 1) return prev;
      return prev.filter(f => f.id !== id);
    });
  }, []);

  const handleAddNewFermentable = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
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
        const exists = prev.some((_, idx) => idx === currentFermentableIndex);
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

  return {
    fermentables,
    addFermentable,
    removeFermentable,
    showNewFermentableDialog,
    setShowNewFermentableDialog,
    currentFermentableIndex,
    handleAddNewFermentable,
    handleCreateNewClick
  };
};
