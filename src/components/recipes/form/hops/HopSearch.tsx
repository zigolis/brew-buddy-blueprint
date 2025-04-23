
import { useState } from "react";
import { CreateIngredientDialog } from "../ingredients/CreateIngredientDialog";
import { useIngredients } from "@/hooks/useIngredients";
import { Ingredient } from "@/types";
import { IngredientSearch } from "../shared/IngredientSearch";

const DEFAULT_HOPS: Ingredient[] = [
  { 
    id: 'default-1', 
    name: "Citra",
    type: "Hop",
    amount: 50,
    unit: "g",
    costPerUnit: 0.30,
    notes: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    alpha: 12,
  },
  { 
    id: 'default-2',
    name: "Mosaic",
    type: "Hop",
    amount: 50,
    unit: "g",
    costPerUnit: 0.35,
    notes: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    alpha: 11.5,
  },
  { 
    id: 'default-3',
    name: "Simcoe",
    type: "Hop",
    amount: 50,
    unit: "g",
    costPerUnit: 0.32,
    notes: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    alpha: 13,
  },
];

interface HopSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function HopSearch({ value, onChange }: HopSearchProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const { addIngredient, getHopSuggestions } = useIngredients();

  const handleIngredientCreated = (ingredient: Ingredient) => {
    addIngredient(ingredient);
    onChange(ingredient.name);
  };

  return (
    <>
      <IngredientSearch
        value={value}
        onChange={onChange}
        onSelect={onChange}
        onCreateNew={() => setShowCreateDialog(true)}
        getSuggestions={getHopSuggestions}
        defaultSuggestions={DEFAULT_HOPS}
        placeholder="Search hop..."
      />

      <CreateIngredientDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        initialName={value}
        typeOverride="Hop"
        onIngredientCreated={handleIngredientCreated}
      />
    </>
  );
}
