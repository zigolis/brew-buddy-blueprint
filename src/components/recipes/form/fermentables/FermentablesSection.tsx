
import { FermentablesToolbar } from "./FermentablesToolbar";
import { FermentablesList } from "./FermentablesList";
import { FermentableDialogForm } from "./FermentableDialogForm";
import { useFermentablesForm } from "./useFermentablesForm";
import { calculateFermentablesTotalCost } from "./fermentablesCost";

export const FermentablesSection = ({ form }) => {
  const {
    fermentables,
    removeFermentable,
    showNewFermentableDialog,
    setShowNewFermentableDialog,
    handleAddNewFermentable,
  } = useFermentablesForm(form);

  const formValues = form.getValues();
  const fermentablesData = formValues?.ingredients?.fermentables || [];
  const totalCost = calculateFermentablesTotalCost(fermentablesData);

  const handleAddFermentable = () => {
    // Check if there's already an empty row before adding another
    const currentFermentables = form.getValues('ingredients.fermentables') || [];
    const hasEmptyRow = currentFermentables.some(f => !f.name || f.name === '');
    
    if (!hasEmptyRow) {
      // Only add a new row if there's no empty one
      form.setValue(`ingredients.fermentables.${currentFermentables.length}`, { 
        name: '', 
        amount: 0, 
        costPerUnit: 0 
      }, { 
        shouldDirty: true,
        shouldTouch: true
      });
      
      const newId = fermentables.length > 0 ? 
        Math.max(...fermentables.map(f => f.id)) + 1 : 0;
      useFermentablesForm(form).setFermentables([...fermentables, { id: newId }]);
    }
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
      <FermentableDialogForm
        open={showNewFermentableDialog}
        onOpenChange={setShowNewFermentableDialog}
        onSubmit={handleAddNewFermentable}
      />
    </div>
  );
};
