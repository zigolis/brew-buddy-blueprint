
import { useState, useCallback, useEffect } from "react";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { useIngredients } from "@/hooks/useIngredients";
import { EmptyFermentables } from "./EmptyFermentables";
import { FermentableSearch } from "./FermentableSearch";
import { FermentableDialogForm } from "./FermentableDialogForm";

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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Fermentables</h2>
        <div className="text-sm text-muted-foreground">
          Total Cost: $
          {fermentablesData
            .reduce(
              (acc, f) =>
                acc + ((parseFloat(f?.amount || "0") / 1000) || 0) * (parseFloat(f?.costPerUnit || "0") || 0),
              0
            )
            .toFixed(2)}
        </div>
      </div>

      {fermentables.length === 0 ? (
        <EmptyFermentables onAdd={addFermentable} onCreate={() => setShowNewFermentableDialog(true)} />
      ) : (
        fermentables.map((fermentable, index) => (
          <div
            key={fermentable.id}
            className="grid gap-4 md:grid-cols-5 items-end border p-4 rounded-lg"
          >
            <FormField
              control={form.control}
              name={`ingredients.fermentables.${index}.name`}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Name*</FormLabel>
                  <FermentableSearch
                    index={index}
                    value={field.value || ""}
                    onChange={field.onChange}
                    onSelect={(value) => {
                      field.onChange(value);
                    }}
                    onCreateNew={() => handleCreateNewClick(index)}
                  />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`ingredients.fermentables.${index}.amount`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (g)*</FormLabel>
                  <Input
                    type="number"
                    value={field.value?.toString() || ""}
                    onChange={(e) => {
                      const numValue = e.target.value ? Number(e.target.value) : 0;
                      field.onChange(numValue);
                    }}
                  />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`ingredients.fermentables.${index}.type`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <select
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-base md:text-sm"
                    value={field.value || "Grain"}
                    onChange={e => field.onChange(e.target.value)}
                  >
                    <option value="Grain">Grain</option>
                    <option value="Adjunct">Adjunct</option>
                    <option value="Sugar">Sugar</option>
                    <option value="Extract">Extract</option>
                    <option value="Dry Extract">Dry Extract</option>
                    <option value="Other">Other</option>
                  </select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`ingredients.fermentables.${index}.color`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color (EBC)</FormLabel>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    value={field.value?.toString() || ""}
                    onChange={(e) => {
                      const val = e.target.value ? parseFloat(e.target.value) : undefined;
                      field.onChange(val);
                    }}
                    placeholder="e.g. 5"
                  />
                </FormItem>
              )}
            />

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => removeFermentable(fermentable.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))
      )}

      <Button type="button" onClick={addFermentable} className="w-full">
        <Plus className="h-4 w-4 mr-2" /> Add Fermentable
      </Button>

      <FermentableDialogForm
        open={showNewFermentableDialog}
        onOpenChange={setShowNewFermentableDialog}
        onSubmit={handleAddNewFermentable}
      />
    </div>
  );
};
