
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface EmptyFermentablesProps {
  onAdd: () => void;
  onCreate: () => void;
}

export const EmptyFermentables = ({ onAdd, onCreate }: EmptyFermentablesProps) => {
  return (
    <div className="text-center py-8 border-2 border-dashed rounded-lg">
      <p className="text-muted-foreground mb-4">No fermentables added yet</p>
      <div className="flex flex-col gap-2 items-center">
        <Button onClick={onAdd} variant="outline">
          <Plus className="h-4 w-4 mr-2" /> Add First Fermentable
        </Button>
        <Button variant="ghost" onClick={onCreate}>
          Create New Fermentable
        </Button>
      </div>
    </div>
  );
};
