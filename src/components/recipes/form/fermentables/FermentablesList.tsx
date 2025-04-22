
import { EmptyFermentables } from "./EmptyFermentables";
import { FermentableRow } from "./FermentableRow";

interface FermentablesListProps {
  fermentables: { id: number }[];
  form: any;
  onRemove: (id: number) => void;
  onAdd: () => void;
  onCreateNew: (index: number) => void;
  setShowNewFermentableDialog: (val: boolean) => void;
}

export const FermentablesList = ({
  fermentables,
  form,
  onRemove,
  onAdd,
  onCreateNew
}: FermentablesListProps) => {
  if (fermentables.length === 0) {
    // The EmptyFermentables no longer shows the ghost button because
    // it's now in the toolbar
    return (
      <EmptyFermentables onAdd={onAdd} onCreate={() => onCreateNew(0)} />
    );
  }

  return (
    <>
      {fermentables.map((fermentable, index) => (
        <FermentableRow
          key={fermentable.id}
          index={index}
          fermentable={fermentable}
          form={form}
          onRemove={onRemove}
          onCreateNew={onCreateNew}
        />
      ))}
    </>
  );
};

