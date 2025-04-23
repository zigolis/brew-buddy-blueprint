
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import HopsRowsList from "./HopsRowsList";
import { HopDialogForm } from "./HopDialogForm";
import { useIngredientSuggestions } from "@/hooks/useIngredientSuggestions";

const HopsSectionContainer = ({ form }) => {
  const [hops, setHops] = useState([{ id: 0 }]);
  const [showNewHopDialog, setShowNewHopDialog] = useState(false);
  const { addNewHop } = useIngredientSuggestions();

  const addHop = () => {
    setHops([...hops, { id: hops.length }]);
  };

  const removeHop = (id: number) => {
    if (hops.length <= 1) return;
    setHops(hops.filter((h) => h.id !== id));
  };

  const handleAddNewHop = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const hopData = {
      name: formData.get('name') as string,
      alpha: parseFloat(formData.get('alpha') as string),
      beta: parseFloat(formData.get('beta') as string) || 0,
      form: formData.get('form') as string,
      costPerUnit: parseFloat(formData.get('costPerUnit') as string) || 0,
      notes: formData.get('notes') as string || '',
      amount: 0,
      time: 0,
      use: 'Boil'
    };
    
    // Add the hop to the ingredient suggestions
    addNewHop(hopData);
    
    // Close the dialog
    setShowNewHopDialog(false);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Hops</h2>
      <HopsRowsList 
        hops={hops} 
        form={form} 
        removeHop={removeHop} 
        onCreateNew={() => setShowNewHopDialog(true)}
      />
      <div className="flex gap-2">
        <Button type="button" onClick={addHop} className="w-full">
          <Plus className="h-4 w-4 mr-2" /> Add Hop
        </Button>
        <Button type="button" onClick={() => setShowNewHopDialog(true)} variant="outline" className="whitespace-nowrap">
          Create New Hop
        </Button>
      </div>
      <HopDialogForm
        open={showNewHopDialog}
        onOpenChange={setShowNewHopDialog}
        onSubmit={handleAddNewHop}
      />
    </div>
  );
};

export default HopsSectionContainer;
