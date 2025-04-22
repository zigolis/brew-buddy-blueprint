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
      event.stopPropagation();

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

      // Find an empty row to fill if exists, else add a new fermentable
      const currentFermentables = form.getValues('ingredients.fermentables') || [];
      const emptyIndex = currentFermentables.findIndex((f: any) => !f.name || f.name === '');
      if (emptyIndex !== -1) {
        // Update the empty row
        form.setValue(
          `ingredients.fermentables.${emptyIndex}`,
          newFermentable,
          { shouldDirty: true, shouldTouch: true }
        );
      } else {
        // Add the new fermentable
        form.setValue(
          `ingredients.fermentables.${currentFermentables.length}`,
          newFermentable,
          { shouldDirty: true, shouldTouch: true }
        );
        // Add to fermentables array
        const newId = fermentables.length > 0
          ? Math.max(...fermentables.map(f => f.id)) + 1
          : 0;
        setFermentables(prev => [...prev, { id: newId }]);
      }

      setShowNewFermentableDialog(false);
    },
    [addIngredient, fermentables, form]
  );

  useEffect(() => {
    // Synchronize fermentables with form
    const currentFermentables = form.getValues('ingredients.fermentables') || [];
    if (fermentables.length < currentFermentables.length) {
      // Add any missing rows (should normally always align)
      const nextId = fermentables.length > 0
        ? Math.max(...fermentables.map(f => f.id)) + 1
        : 0;
      setFermentables((prev) =>
        [...prev, ...[...Array(currentFermentables.length - fermentables.length)].map((_, i) => ({ id: nextId + i }))]
      );
    }
    // No longer auto-create blanks; just sync length
  }, [fermentables, form]);

  return {
    fermentables,
    setFermentables,
    removeFermentable,
    showNewFermentableDialog,
    setShowNewFermentableDialog,
    handleAddNewFermentable
  };
};
