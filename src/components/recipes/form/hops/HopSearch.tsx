
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

interface HopSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function HopSearch({ value, onChange }: HopSearchProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const { addIngredient, getHopSuggestions } = useIngredients();

  const handleIngredientCreated = (ingredient: Ingredient) => {
    addIngredient(ingredient);
    onChange(ingredient.name);
    setOpen(false);
  };

  const suggestions = getHopSuggestions(searchQuery);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <FormControl>
            <Input 
              placeholder="Search hop..." 
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
              placeholder="Search hop..." 
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandList>
              <CommandEmpty>
                <div 
                  className="flex items-center px-2 py-1.5 text-sm rounded-sm cursor-pointer hover:bg-accent"
                  onClick={() => {
                    setShowCreateDialog(true);
                    setOpen(false);
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create "{searchQuery}"
                </div>
              </CommandEmpty>
              <CommandGroup>
                {suggestions.map((hop) => (
                  <CommandItem
                    key={hop.id}
                    value={hop.name}
                    onSelect={() => {
                      onChange(hop.name);
                      setOpen(false);
                    }}
                  >
                    {hop.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <CreateIngredientDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        initialName={searchQuery}
        typeOverride="Hop"
        onIngredientCreated={handleIngredientCreated}
      />
    </>
  );
}
