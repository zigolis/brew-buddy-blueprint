
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Bookmark } from "lucide-react";
import { Ingredient } from "@/types/ingredients";

interface IngredientTableProps {
  ingredients: Ingredient[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onBookmark?: (id: string) => void;
  bookmarks?: string[];
}

export const IngredientTable = ({ 
  ingredients, 
  onEdit, 
  onDelete,
  onBookmark,
  bookmarks = [] 
}: IngredientTableProps) => {
  if (ingredients.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-muted-foreground">No ingredients added yet.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Cost per Unit</TableHead>
          <TableHead>Supplier</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ingredients.map((ingredient) => (
          <TableRow key={ingredient.id}>
            <TableCell className="font-medium">{ingredient.name}</TableCell>
            <TableCell>{ingredient.type}</TableCell>
            <TableCell>{ingredient.amount} {ingredient.unit}</TableCell>
            <TableCell>${ingredient.costPerUnit.toFixed(2)}</TableCell>
            <TableCell>{ingredient.supplier || '-'}</TableCell>
            <TableCell className="text-right space-x-2">
              {onBookmark && (
                <Button
                  variant={bookmarks.includes(ingredient.id) ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onBookmark(ingredient.id)}
                >
                  <Bookmark className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(ingredient.id)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(ingredient.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
