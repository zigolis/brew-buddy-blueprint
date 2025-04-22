
import { useState, useCallback, useEffect } from "react";
import { useIngredients } from "@/hooks/useIngredients";

export const useFermentablesForm = (form: any) => {
  const [fermentables, setFermentables] = useState([{ id: 0 }]);
  const [showNewFermentableDialog, setShowNewFermentableDialog] = useState(false);
  const { addIngredient } = useIngredients();

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

      form.setValue(
        `ingredients.fermentables.${fermentables.length}`,
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

      setFermentables((prev) => [...prev, { id: prev.length }]);
      setShowNewFermentableDialog(false);
    },
    [addIngredient, fermentables.length, form]
  );

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
    removeFermentable,
    showNewFermentableDialog,
    setShowNewFermentableDialog,
    handleAddNewFermentable
  };
};
