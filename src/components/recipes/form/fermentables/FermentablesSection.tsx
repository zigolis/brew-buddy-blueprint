
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
    
    const newFermentable = {
      name: formData.get('name') as string,
      type: 'Grain',
      amount: 0,
      unit: 'g',
      costPerUnit: parseFloat(formData.get('costPerUnit') as string) || 0,
      notes: formData.get('notes') as string || '',
    };

    // Add to ingredients list
    addIngredient(newFermentable);
    
    // Add to current recipe if we have an index
    if (currentFermentableIndex !== null) {
      form.setValue(`ingredients.fermentables.${currentFermentableIndex}.name`, newFermentable.name);
      form.setValue(`ingredients.fermentables.${currentFermentableIndex}.costPerUnit`, newFermentable.costPerUnit);
    }
    
    setShowNewFermentableDialog(false);
    setCurrentFermentableIndex(null);
  }, [addIngredient, currentFermentableIndex, form]);

  const handleCreateNewClick = useCallback((index: number) => {
    setCurrentFermentableIndex(index);
    setShowNewFermentableDialog(true);
  }, []);

  // Initialize form values only once when fermentables change
  useEffect(() => {
    const currentFermentables = form.getValues('ingredients.fermentables') || [];
    fermentables.forEach((_, index) => {
      if (!currentFermentables[index]) {
        form.setValue(`ingredients.fermentables.${index}`, { name: '', amount: 0, costPerUnit: 0 });
      }
    });
  }, [fermentables, form]);

  const watchedFermentables = form.watch('ingredients.fermentables') || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Fermentables</h2>
        <div className="text-sm text-muted-foreground">
          Total Cost: $
          {watchedFermentables.reduce((acc, f) => 
            acc + ((parseFloat(f?.amount || '0') / 1000) || 0) * (parseFloat(f?.costPerUnit || '0') || 0), 0
          ).toFixed(2)}
        </div>
      </div>

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
                      const matchingFermentable = form.getValues(`ingredients.fermentables.${index}`);
                      if (matchingFermentable) {
                        form.setValue(`ingredients.fermentables.${index}.costPerUnit`, matchingFermentable.costPerUnit || 0);
                      }
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
