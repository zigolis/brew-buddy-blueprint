
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Bookmark, Filter, Search } from "lucide-react";
import { IngredientTable } from "@/components/ingredients/IngredientTable";
import { IngredientForm } from "@/components/ingredients/IngredientForm";
import { useIngredients } from "@/hooks/useIngredients";
import { Ingredient } from "@/types/ingredients";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomInput } from "@/components/ui/custom-input";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

const ingredientTypes = [
  "Grain", "Sugar", "Extract", "Dry Extract", "Adjunct", "Hop", "Yeast", "Other"
];

const getTypeDisplay = (type: string) => type === "Dry Extract" ? "Dry Ext." : type;

const IngredientsList = () => {
  const [editingIngredient, setEditingIngredient] = useState<string | null>(null);
  const [isAddingIngredient, setIsAddingIngredient] = useState(false);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const { ingredients, addIngredient, updateIngredient, deleteIngredient, getIngredientById } = useIngredients();

  const filteredIngredients = ingredients
    .filter((ing) => (typeFilter ? ing.type === typeFilter : true))
    .filter((ing) =>
      ing.name?.toLowerCase().includes(search.toLowerCase()) ||
      ing.supplier?.toLowerCase().includes(search.toLowerCase()) ||
      ing.type?.toLowerCase().includes(search.toLowerCase())
    );

  const handleEdit = (id: string) => {
    setEditingIngredient(id);
    setIsAddingIngredient(true);
  };

  const handleAddNew = () => {
    setEditingIngredient(null);
    setIsAddingIngredient(true);
  };

  const handleCancel = () => {
    setIsAddingIngredient(false);
    setEditingIngredient(null);
  };

  const handleSubmit = (data: Omit<Ingredient, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (editingIngredient) {
        updateIngredient(editingIngredient, data);
        toast.success("Ingredient updated successfully");
      } else {
        addIngredient(data);
        toast.success("Ingredient added successfully");
      }
      setIsAddingIngredient(false);
      setEditingIngredient(null);
    } catch (error) {
      console.error("Error handling ingredient:", error);
      toast.error("An error occurred while saving the ingredient");
    }
  };

  const handleBookmark = (id: string) => {
    setBookmarks(prev => prev.includes(id)
      ? prev.filter(bid => bid !== id)
      : [...prev, id]);
  };

  const handleDelete = (id: string) => {
    try {
      deleteIngredient(id);
      toast.success("Ingredient deleted successfully");
      
      if (bookmarks.includes(id)) {
        setBookmarks(prev => prev.filter(bid => bid !== id));
      }
    } catch (error) {
      console.error("Error deleting ingredient:", error);
      toast.error("An error occurred while deleting the ingredient");
    }
  };

  const getFormDefaultValues = (): Omit<Ingredient, 'id' | 'createdAt' | 'updatedAt'> => {
    if (editingIngredient) {
      const ingredient = getIngredientById(editingIngredient);
      if (ingredient) {
        return {
          name: ingredient.name,
          type: ingredient.type,
          amount: ingredient.amount,
          unit: ingredient.unit,
          costPerUnit: ingredient.costPerUnit || 0,
          supplier: ingredient.supplier || "",
          notes: ingredient.notes || "",
        };
      }
    }
    
    return {
      name: "",
      type: "Grain" as const,
      amount: 0,
      unit: "kg",
      costPerUnit: 0,
      supplier: "",
      notes: "",
    };
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Ingredients</h1>
            <p className="text-muted-foreground">
              Manage your brewing ingredients
            </p>
          </div>
          {!isAddingIngredient && (
            <Button onClick={handleAddNew}>
              <Plus className="mr-2 h-4 w-4" />
              Add Ingredient
            </Button>
          )}
        </div>

        <div className="flex justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search ingredients..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select
            value={typeFilter || "all-types"}
            onValueChange={val => setTypeFilter(val === "all-types" ? null : val)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-types">All Types</SelectItem>
              {ingredientTypes.map(type => (
                <SelectItem key={type} value={type}>
                  {getTypeDisplay(type)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {bookmarks.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Bookmarked:</span>
            {bookmarks.map(bid => {
              const ing = getIngredientById(bid);
              return ing ? (
                <Badge
                  key={bid}
                  variant="secondary"
                  className="flex items-center gap-1 cursor-pointer hover:bg-secondary/80"
                  onClick={() => handleBookmark(bid)}
                >
                  {ing.name}
                  <Bookmark className="w-3 h-3 ml-1" />
                </Badge>
              ) : null;
            })}
          </div>
        )}

        {isAddingIngredient ? (
          <Card>
            <CardHeader>
              <CardTitle>{editingIngredient ? "Edit Ingredient" : "Add Ingredient"}</CardTitle>
            </CardHeader>
            <CardContent>
              <IngredientForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                ingredientId={editingIngredient}
                defaultValues={getFormDefaultValues()}
                showYeastFields={
                  (editingIngredient && getIngredientById(editingIngredient)?.type === 'Yeast') ||
                  (!editingIngredient && typeFilter === 'Yeast')
                }
              />
            </CardContent>
          </Card>
        ) : (
          <div className="rounded-lg border">
            <IngredientTable 
              ingredients={filteredIngredients}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onBookmark={handleBookmark}
              bookmarks={bookmarks}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default IngredientsList;
