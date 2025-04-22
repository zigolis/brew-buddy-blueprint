
import { EmptyFermentables } from "./EmptyFermentables";
import { FermentableRow } from "./FermentableRow";

interface FermentablesListProps {
  fermentables: { id: number }[];
  form: any;
  onRemove: (id: number) => void;
}

export const FermentablesList = ({
  fermentables,
  form,
  onRemove
}: FermentablesListProps) => {
  if (fermentables.length === 0) {
    return <EmptyFermentables />;
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
