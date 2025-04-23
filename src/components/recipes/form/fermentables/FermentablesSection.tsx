
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { FermentablesList } from "./FermentablesList";
import { useFermentablesForm } from "./useFermentablesForm";

export const FermentablesSection = ({ form }) => {
  const { 
    fermentables, 
    removeFermentable, 
    setFermentables, 
    showNewFermentableDialog,
    setShowNewFermentableDialog,
    handleAddNewFermentable
  } = useFermentablesForm(form);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Fermentables</h2>
      <FermentablesList 
        form={form} 
        fermentables={fermentables} 
        onRemove={removeFermentable}
        onAdd={() => {
          const newId = fermentables.length > 0 
            ? Math.max(...fermentables.map(f => f.id)) + 1 
            : 0;
          setFermentables(prev => [...prev, { id: newId }]);
        }}
        onCreateNew={() => setShowNewFermentableDialog(true)}
      />
      
      <FormField
        control={form.control}
        name="fermentablesNotes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Notes</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Add notes about your fermentables here..."
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
