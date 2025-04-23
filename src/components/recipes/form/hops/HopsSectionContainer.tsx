
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import HopsRowsList from "./HopsRowsList";
import { useIngredientSuggestions } from "@/hooks/useIngredientSuggestions";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const HopsSectionContainer = ({ form }) => {
  const [hops, setHops] = useState([{ id: 0 }]);
  const { addNewHop } = useIngredientSuggestions();

  const addHop = () => {
    setHops([...hops, { id: hops.length }]);
  };

  const removeHop = (id: number) => {
    if (hops.length <= 1) return;
    setHops(hops.filter((h) => h.id !== id));
  };

  const handleAddHopToRecipe = (hopData) => {
    // Add the hop to the current recipe
    const currentHops = form.getValues('ingredients.hops') || [];
    const newHopIndex = currentHops.length;

    form.setValue(`ingredients.hops.${newHopIndex}`, {
      name: hopData.name,
      alpha: hopData.alpha || 0,
      beta: hopData.beta || 0,
      form: hopData.form || 'Pellet',
      amount: hopData.amount || 0,
      time: hopData.time || 0,
      use: hopData.use || 'Boil',
      costPerUnit: hopData.costPerUnit || 0
    }, { shouldDirty: true });

    // Add a new hop row to the UI
    setHops([...hops, { id: hops.length }]);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Hops</h2>
      <HopsRowsList 
        hops={hops} 
        form={form} 
        removeHop={removeHop} 
        onAddToRecipe={handleAddHopToRecipe}
      />
      <div>
        <Button type="button" onClick={addHop} className="w-full bg-brewing-amber text-white hover:bg-brewing-amber/90">
          <Plus className="h-4 w-4 mr-2" /> Add Hop
        </Button>
      </div>
      
      <FormField
        control={form.control}
        name="hopsNotes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Notes</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Add notes about your hops here..."
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default HopsSectionContainer;
