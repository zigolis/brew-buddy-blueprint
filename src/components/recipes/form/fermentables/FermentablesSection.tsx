
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

  return (
    <div className="space-y-4">
      <FermentablesToolbar totalCost={totalCost} />
      <FermentablesList
        fermentables={fermentables}
        form={form}
        onRemove={removeFermentable}
      />
      <FermentableDialogForm
        open={showNewFermentableDialog}
        onOpenChange={setShowNewFermentableDialog}
        onSubmit={handleAddNewFermentable}
      />
    </div>
  );
};
