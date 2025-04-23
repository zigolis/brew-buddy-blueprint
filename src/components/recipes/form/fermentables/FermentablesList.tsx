import { EmptyFermentables } from "./EmptyFermentables";
import { FermentableRow } from "./FermentableRow";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
    <div className="space-y-4">
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
      <Button
        type="button"
        onClick={onAdd}
        className="w-full bg-brewing-amber text-white hover:bg-brewing-amber/90"
      >
        <Plus className="h-4 w-4 mr-2" /> Add Fermentable
      </Button>
    </div>
  );
};
