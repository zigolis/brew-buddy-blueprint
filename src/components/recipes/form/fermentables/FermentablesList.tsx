
import { EmptyFermentables } from "./EmptyFermentables";
import { FermentableRow } from "./FermentableRow";

interface FermentablesListProps {
  fermentables: { id: number }[];
  form: any;
  onRemove: (id: number) => void;
  onCreateNew: (index: number) => void;
  onAdd: () => void;
  onCreate: () => void;
}

export const FermentablesList = ({
  fermentables,
  form,
  onRemove,
  onCreateNew,
  onAdd,
  onCreate
}: FermentablesListProps) => {
  if (fermentables.length === 0) {
    return <EmptyFermentables onAdd={onAdd} onCreate={onCreate} />;
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
