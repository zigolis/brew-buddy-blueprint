
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface FermentablesToolbarProps {
  totalCost: string;
  onAdd: () => void;
  onCreate: () => void;
}

export const FermentablesToolbar = ({
  totalCost,
  onAdd,
  onCreate
}: FermentablesToolbarProps) => (
  <div className="flex items-center justify-between">
    <h2 className="text-xl font-semibold">Fermentables</h2>
    <div className="flex gap-2 items-center">
      <span className="text-sm text-muted-foreground">
        Total Cost: ${totalCost}
      </span>
      <Button type="button" onClick={onAdd} className="ml-3">
        <Plus className="h-4 w-4 mr-2" /> Add Fermentable
      </Button>
      <Button variant="ghost" onClick={onCreate}>
        Create New Fermentable
      </Button>
    </div>
  </div>
);

