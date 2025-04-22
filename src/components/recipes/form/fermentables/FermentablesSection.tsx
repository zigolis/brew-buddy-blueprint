
import { FermentablesToolbar } from "./FermentablesToolbar";
import { FermentablesList } from "./FermentablesList";
import { FermentableDialogForm } from "./FermentableDialogForm";
import { useFermentablesForm } from "./useFermentablesForm";
import { calculateFermentablesTotalCost } from "./fermentablesCost";

export const FermentablesSection = ({ form }) => {
  const {
    fermentables,
    addFermentable,
    removeFermentable,
    showNewFermentableDialog,
    setShowNewFermentableDialog,
    handleAddNewFermentable,
    handleCreateNewClick,
  } = useFermentablesForm(form);

  const formValues = form.getValues();
  const fermentablesData = formValues?.ingredients?.fermentables || [];
  const totalCost = calculateFermentablesTotalCost(fermentablesData);

  return (
    <div className="space-y-4">
      <FermentablesToolbar
        totalCost={totalCost}
        onAdd={addFermentable}
        onCreate={() => handleCreateNewClick(fermentables.length)}
      />
      <FermentablesList
        fermentables={fermentables}
        form={form}
        onRemove={removeFermentable}
        onAdd={addFermentable}
        onCreateNew={handleCreateNewClick}
        setShowNewFermentableDialog={setShowNewFermentableDialog}
      />
      <FermentableDialogForm
        open={showNewFermentableDialog}
        onOpenChange={setShowNewFermentableDialog}
        onSubmit={handleAddNewFermentable}
      />
    </div>
  );
};
