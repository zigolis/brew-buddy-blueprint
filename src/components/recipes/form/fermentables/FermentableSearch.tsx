
import { useState, useEffect } from "react";
import { FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useIngredients } from "@/hooks/useIngredients";
import { Plus } from "lucide-react";
import { CreateIngredientDialog } from "../ingredients/CreateIngredientDialog";
import { Ingredient } from "@/types";

// Default fermentable suggestions to always show
const DEFAULT_FERMENTABLES = [
  { id: 'default-1', name: "Pilsner Malt", type: "Grain", amount: 5000, color: 2, yield: 80, costPerUnit: 2.5 },
  { id: 'default-2', name: "Munich Malt", type: "Grain", amount: 1000, color: 9, yield: 78, costPerUnit: 3 },
  { id: 'default-3', name: "Crystal Malt", type: "Grain", amount: 500, color: 60, yield: 75, costPerUnit: 3.2 },
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
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const { addIngredient, getFermentableSuggestions } = useIngredients();
  
  // Only update the search query when the popover opens or value changes
  useEffect(() => {
    if (open) {
      setSearchQuery(value || '');
    }
  }, [open, value]);
  
  // Get suggestions based on the current search query
  const getSuggestions = (query: string) => {
    try {
      // Always show default suggestions if no search query
      if (!query || query.trim() === '') {
        return DEFAULT_FERMENTABLES;
      }
      
      // Get suggestions from the hook
      const customSuggestions = getFermentableSuggestions(query);
      
      // Filter default suggestions based on query
      const matchingDefaults = DEFAULT_FERMENTABLES.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      
      // Combine custom suggestions with filtered defaults
      let combinedSuggestions = [...(Array.isArray(customSuggestions) ? customSuggestions : [])];
      
      // Add default suggestions that aren't already in the custom suggestions
      matchingDefaults.forEach(defaultItem => {
        if (!combinedSuggestions.some(item => item.name === defaultItem.name)) {
          combinedSuggestions.push(defaultItem);
        }
      });
      
      return combinedSuggestions;
    } catch (error) {
      console.error('Error getting fermentable suggestions:', error);
      return DEFAULT_FERMENTABLES;
    }
  };

  // Get suggestions based on the current search query
  const suggestions = getSuggestions(searchQuery);

  const handleCreateClick = () => {
    if (!searchQuery.trim()) return;
    setShowCreateDialog(true);
    setOpen(false);
  };

  const handleIngredientCreated = (ingredient: Ingredient) => {
    addIngredient(ingredient);
    onChange(ingredient.name);
    onSelect(ingredient.name);
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <FormControl>
            <Input 
              placeholder="Search fermentable..." 
              value={value} 
              onClick={() => setOpen(true)}
              onChange={(e) => onChange(e.target.value)}
              className="w-full"
            />
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
          <Command>
            <CommandInput 
              placeholder="Search fermentable..." 
              value={searchQuery} 
              onValueChange={setSearchQuery}
            />
            <CommandList>
              <CommandEmpty>
                <div 
                  className="flex items-center px-2 py-1.5 text-sm rounded-sm cursor-pointer hover:bg-accent"
                  onClick={handleCreateClick}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create "{searchQuery}"
                </div>
              </CommandEmpty>
              {suggestions.length > 0 && (
                <CommandGroup>
                  {suggestions.map((item) => (
                    <CommandItem
                      key={item.id || `fermentable-${Math.random()}`}
                      value={item.name}
                      onSelect={() => {
                        onSelect(item.name);
                        setOpen(false);
                      }}
                    >
                      {item.name}
                    </CommandItem>
                  ))}
                  {searchQuery.trim() !== '' && (
                    <div 
                      className="flex items-center px-2 py-1.5 text-sm rounded-sm cursor-pointer text-primary hover:bg-accent"
                      onClick={handleCreateClick}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Create "{searchQuery}"
                    </div>
                  )}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <CreateIngredientDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        initialName={searchQuery}
        typeOverride="Grain"
        onIngredientCreated={handleIngredientCreated}
      />
    </>
  );
};
