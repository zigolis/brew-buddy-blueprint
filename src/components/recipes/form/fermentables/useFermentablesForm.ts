
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
      // Ensure we're preventing default behavior
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

      // Add the new fermentable to the form values without creating an empty row after
      // Get current fermentables from form
      const currentFermentables = form.getValues('ingredients.fermentables') || [];
      
      // Update the last fermentable in the list if it's empty, otherwise add a new one
      const lastIndex = currentFermentables.length - 1;
      const lastFermentable = currentFermentables[lastIndex];
      
      if (lastFermentable && (!lastFermentable.name || lastFermentable.name === '')) {
        // Update the empty fermentable with new values
        form.setValue(
          `ingredients.fermentables.${lastIndex}`,
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
      } else {
        // Add a new fermentable to the end
        form.setValue(
          `ingredients.fermentables.${currentFermentables.length}`,
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
        
        // Update the fermentables list but don't add another blank row
        const newId = fermentables.length > 0 ? 
          Math.max(...fermentables.map(f => f.id)) + 1 : 0;
        setFermentables(prev => [...prev.filter(f => f.id !== -1), { id: newId }]);
      }
      
      setShowNewFermentableDialog(false);
    },
    [addIngredient, fermentables, form]
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
    setFermentables,
    removeFermentable,
    showNewFermentableDialog,
    setShowNewFermentableDialog,
    handleAddNewFermentable
  };
};
