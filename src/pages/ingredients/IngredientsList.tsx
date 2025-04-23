
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

  // Search and filter logic
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
    if (editingIngredient) {
      updateIngredient(editingIngredient, data);
    } else {
      addIngredient(data);
    }
    setIsAddingIngredient(false);
    setEditingIngredient(null);
  };

  const handleBookmark = (id: string) => {
    setBookmarks(prev => prev.includes(id)
      ? prev.filter(bid => bid !== id)
      : [...prev, id]);
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
          costPerUnit: ingredient.costPerUnit,
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
      <div className="space-y-6 w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Ingredients</h1>
            <p className="text-muted-foreground">Manage your brewing ingredients</p>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <CustomInput
              className="w-48"
              placeholder="Search ingredients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              startIcon={<Search className="h-4 w-4" />}
            />
            <Select
              value={typeFilter || ""}
              onValueChange={val => setTypeFilter(val.length ? val : null)}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                {ingredientTypes.map(type => (
                  <SelectItem key={type} value={type}>
                    {getTypeDisplay(type)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!isAddingIngredient && (
              <Button onClick={handleAddNew}>
                <Plus className="h-4 w-4 mr-2" />
                Add Ingredient
              </Button>
            )}
          </div>
        </div>

        {/* Bookmarks Filter */}
        {bookmarks.length > 0 && (
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-medium text-muted-foreground text-xs">Bookmarked:</span>
            {bookmarks.map(bid => {
              const ing = getIngredientById(bid);
              return ing ? (
                <Badge
                  key={bid}
                  className="flex items-center gap-1"
                  onClick={() => handleBookmark(bid)}
                >
                  {ing.name} <Bookmark className="w-4 h-4" />
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
          <IngredientTable 
            ingredients={filteredIngredients}
            onEdit={handleEdit}
            onDelete={deleteIngredient}
            onBookmark={handleBookmark}
            bookmarks={bookmarks}
          />
        )}
      </div>
    </Layout>
  );
};

export default IngredientsList;
