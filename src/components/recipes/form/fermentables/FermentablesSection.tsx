
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

  // Use useCallback to prevent recreating functions unnecessarily
  const addFermentable = useCallback(() => {
    setFermentables(prev => [...prev, { id: prev.length }]);
  }, []);

  const removeFermentable = useCallback((id: number) => {
    if (fermentables.length <= 1) return;
    setFermentables(prev => prev.filter(f => f.id !== id));
  }, [fermentables.length]);

  const handleAddNewFermentable = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const name = formData.get('name') as string;
    const costPerUnit = parseFloat(formData.get('costPerUnit') as string) || 0;
    const notes = (formData.get('notes') as string) || '';

    const newFermentable = {
      name,
      type: 'Grain',
      amount: 0,
      unit: 'g',
      costPerUnit,
      notes,
    };

    // 1. Add to ingredients list for future auto-suggestion.
    addIngredient(newFermentable);

    // 2. Add to current recipe at the selected index:
    if (currentFermentableIndex !== null) {
      // Set all available data for the new fermentable here
      form.setValue(
        `ingredients.fermentables.${currentFermentableIndex}`,
        { 
          name,
          type: 'Grain',
          amount: 0,
          costPerUnit,
          unit: 'g',
          notes,
        },
        { shouldDirty: true, shouldTouch: true }
      );
    }

    // 3. Ensure fermentables state array has enough rows
    setFermentables(prev => {
      // Add a new row if index refers to the last one
      const exists = prev.some((f, idx) => idx === currentFermentableIndex);
      if (!exists && currentFermentableIndex !== null) {
        const newLength = currentFermentableIndex + 1;
        const filled = Array.from({ length: newLength }, (_, i) => prev[i] || { id: i });
        return filled;
      }
      return prev;
    });

    // 4. Close modal and reset
    setShowNewFermentableDialog(false);
    setCurrentFermentableIndex(null);

    // 5. Optionally focus the new input (not strictly required; user stays at same step/page automatically)
    // setTimeout could be used here to focus, but not strictly required as UI is already updated.
  }, [addIngredient, currentFermentableIndex, form]);

  const handleCreateNewClick = useCallback((index: number) => {
    setCurrentFermentableIndex(index);
    setShowNewFermentableDialog(true);
  }, []);

  // Initialize form values only once when fermentables change
  useEffect(() => {
    // Get existing values
    const currentFermentables = form.getValues('ingredients.fermentables') || [];
    
    // Initialize any missing entries
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

  // Get fermentables data from form without triggering re-renders
  const formValues = form.getValues();
  const fermentablesData = formValues?.ingredients?.fermentables || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Fermentables</h2>
        <div className="text-sm text-muted-foreground">
          Total Cost: $
          {fermentablesData.reduce((acc, f) => 
            acc + ((parseFloat(f?.amount || '0') / 1000) || 0) * (parseFloat(f?.costPerUnit || '0') || 0), 0
          ).toFixed(2)}
        </div>
      </div>

      {/* Always show all rows as per fermentables array */}
      {fermentables.length === 0 ? (
        <EmptyFermentables 
          onAdd={addFermentable}
          onCreate={() => setShowNewFermentableDialog(true)}
        />
      ) : (
        fermentables.map((fermentable, index) => (
          <div key={fermentable.id} className="grid gap-4 md:grid-cols-3 items-end border p-4 rounded-lg">
            <FormField
              control={form.control}
              name={`ingredients.fermentables.${index}.name`}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Name*</FormLabel>
                  <FermentableSearch
                    index={index}
                    value={field.value || ''}
                    onChange={field.onChange}
                    onSelect={(value) => {
                      field.onChange(value);
                      // Cost per unit handled in FermentableSearch if needed
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
                    value={field.value?.toString() || ''}
                    onChange={(e) => {
                      const numValue = e.target.value ? Number(e.target.value) : 0;
                      field.onChange(numValue);
                    }}
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
