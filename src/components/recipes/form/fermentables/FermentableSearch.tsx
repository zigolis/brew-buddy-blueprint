
import { useState } from "react";
import { CreateIngredientDialog } from "../ingredients/CreateIngredientDialog";
import { useIngredients } from "@/hooks/useIngredients";
import { Ingredient } from "@/types";
import { IngredientSearch } from "../shared/IngredientSearch";

const DEFAULT_FERMENTABLES: Ingredient[] = [
  { 
    id: 'default-1', 
    name: "Pilsner Malt", 
    type: "Grain", 
    amount: 5000,
    unit: "g", 
    costPerUnit: 2.5,
    notes: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    color: 2,
    yield: 80
  },
  { 
    id: 'default-2', 
    name: "Munich Malt", 
    type: "Grain", 
    amount: 1000,
    unit: "g", 
    costPerUnit: 3,
    notes: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    color: 9,
    yield: 78
  },
  { 
    id: 'default-3', 
    name: "Crystal Malt", 
    type: "Grain", 
    amount: 500,
    unit: "g", 
    costPerUnit: 3.2,
    notes: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    color: 60,
    yield: 75
  },
];

interface FermentableSearchProps {
  index: number;
  value: string;
  onChange: (value: string) => void;
  onSelect: (value: string) => void;
  onCreateNew: () => void;
}

export const FermentableSearch = ({
  index,
  value,
  onChange,
  onSelect,
  onCreateNew,
}: FermentableSearchProps) => {
  const { addIngredient, getFermentableSuggestions } = useIngredients();
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const handleIngredientCreated = (ingredient: Ingredient) => {
    addIngredient(ingredient);
    onChange(ingredient.name);
    onSelect(ingredient.name);
  };

  return (
    <>
      <IngredientSearch
        value={value}
        onChange={onChange}
        onSelect={onSelect}
        onCreateNew={() => setShowCreateDialog(true)}
        getSuggestions={getFermentableSuggestions}
        defaultSuggestions={DEFAULT_FERMENTABLES}
        placeholder="Search fermentable..."
      />

      <CreateIngredientDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        initialName={value}
        typeOverride="Grain"
        onIngredientCreated={handleIngredientCreated}
      />
    </>
  );
};
