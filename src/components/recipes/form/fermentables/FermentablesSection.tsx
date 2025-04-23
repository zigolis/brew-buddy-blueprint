
import { FermentablesToolbar } from "./FermentablesToolbar";
import { FermentablesList } from "./FermentablesList";
import { FermentableDialogForm } from "./FermentableDialogForm";
import { useFermentablesForm } from "./useFermentablesForm";
import { calculateFermentablesTotalCost } from "./fermentablesCost";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FermentablesSection = ({ form }) => {
  const {
    fermentables,
    setFermentables,
    removeFermentable,
    showNewFermentableDialog,
    setShowNewFermentableDialog,
    handleAddNewFermentable,
  } = useFermentablesForm(form);

  const formValues = form.getValues();
  const fermentablesData = formValues?.ingredients?.fermentables || [];
  const totalCost = calculateFermentablesTotalCost(fermentablesData);

  const handleAddFermentable = () => {
    const currentFermentables = form.getValues('ingredients.fermentables') || [];
    const newId = fermentables.length > 0
      ? Math.max(...fermentables.map(f => f.id)) + 1
      : 0;

    setFermentables([...fermentables, { id: newId }]);
    form.setValue(
      `ingredients.fermentables.${currentFermentables.length}`,
      {
        name: '',
        amount: 0,
        type: 'Grain',
        color: undefined,
        costPerUnit: 0,
        notes: '',
        unit: "g"
      },
      { shouldDirty: true, shouldTouch: true }
    );
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Fermentables</h2>
      <FermentablesList
        fermentables={fermentables}
        form={form}
        onRemove={removeFermentable}
        onAdd={handleAddFermentable}
      />
      <Button
        type="button"
        onClick={handleAddFermentable}
        className="w-full bg-brewing-amber text-white hover:bg-brewing-amber/90"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Fermentable
      </Button>
      <FermentableDialogForm
        open={showNewFermentableDialog}
        onOpenChange={setShowNewFermentableDialog}
        onSubmit={handleAddNewFermentable}
      />
    </div>
  );
};
