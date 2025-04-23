
import { useState } from "react";
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

interface YeastSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function YeastSearch({ value, onChange }: YeastSearchProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const { addIngredient, getYeastSuggestions } = useIngredients();

  const handleIngredientCreated = (ingredient: Ingredient) => {
    addIngredient(ingredient);
    onChange(ingredient.name);
    setOpen(false);
  };

  const suggestions = getYeastSuggestions(searchQuery);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <FormControl>
            <Input 
              placeholder="Search yeast..." 
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
              placeholder="Search yeast..." 
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
                {suggestions.map((yeast) => (
                  <CommandItem
                    key={yeast.id}
                    value={yeast.name}
                    onSelect={() => {
                      onChange(yeast.name);
                      setOpen(false);
                    }}
                  >
                    {yeast.name}
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
        typeOverride="Yeast"
        showYeastFields={true}
        onIngredientCreated={handleIngredientCreated}
      />
    </>
  );
}
