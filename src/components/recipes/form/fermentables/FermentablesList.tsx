
import { EmptyFermentables } from "./EmptyFermentables";
import { FermentableRow } from "./FermentableRow";

interface FermentablesListProps {
  form: any;
  fermentables?: { id: number }[];
  onRemove?: (id: number) => void;
  onAdd?: () => void;
  onCreateNew?: () => void;
}

export const FermentablesList = ({
  form,
  fermentables = [],
  onRemove = () => {},
  onAdd = () => {},
  onCreateNew,
}: FermentablesListProps) => {
  if (!fermentables || fermentables.length === 0) {
    return <EmptyFermentables onAdd={onAdd} onCreate={onCreateNew} />;
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
