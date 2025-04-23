
import { EmptyFermentables } from "./EmptyFermentables";
import { FermentableRow } from "./FermentableRow";

interface FermentablesListProps {
  fermentables: { id: number }[];
  form: any;
  onRemove: (id: number) => void;
  onAdd: () => void;
}

export const FermentablesList = ({
  fermentables,
  form,
  onRemove,
  onAdd,
}: FermentablesListProps) => {
  if (fermentables.length === 0) {
    return <EmptyFermentables onAdd={onAdd} />;
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
        />
      ))}
    </>
  );
};
