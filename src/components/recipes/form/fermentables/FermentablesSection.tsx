
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

  // When user presses "+ Add Fermentable", add a new row for input (with unique id)
  const handleAddFermentable = () => {
    const currentFermentables = form.getValues('ingredients.fermentables') || [];
    // Always add a new row (do not auto-add blanks from dialog actions)
    const newId = fermentables.length > 0
      ? Math.max(...fermentables.map(f => f.id)) + 1
      : 0;

    // Add fermentable entry to fermentables rows
    setFermentables([...fermentables, { id: newId }]);
    // Also ensure the corresponding field exists in form state
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

  const handleCreateFermentable = () => {
    setShowNewFermentableDialog(true);
  };

  const handleCreateNew = (index: number) => {
    setShowNewFermentableDialog(true);
  };

  return (
    <div className="space-y-4">
      <FermentablesToolbar totalCost={totalCost} />
      <FermentablesList
        fermentables={fermentables}
        form={form}
        onRemove={removeFermentable}
        onCreateNew={handleCreateNew}
        onAdd={handleAddFermentable}
        onCreate={handleCreateFermentable}
      />
      <Button
        type="button"
        onClick={handleAddFermentable}
        className="w-full mt-2"
        variant="outline"
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
