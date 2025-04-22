
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
} from "@/components/ui/command";
import { useIngredientSuggestions } from "@/hooks/useIngredientSuggestions";
import { Plus } from "lucide-react";

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
  const { getFermentableSuggestions } = useIngredientSuggestions();
  
  // Safely get suggestions, ensuring we always return an array
  const getSuggestions = (query: string) => {
    try {
      if (!query || query.trim() === '') {
        return [];
      }
      const results = getFermentableSuggestions(query);
      return Array.isArray(results) ? results : [];
    } catch (error) {
      console.error('Error getting fermentable suggestions:', error);
      return [];
    }
  };

  const suggestions = getSuggestions(searchQuery);

  return (
    <Popover open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (isOpen) setSearchQuery(value || '');
    }}>
      <PopoverTrigger asChild>
        <FormControl>
          <Input 
            placeholder="Search fermentable..." 
            value={value} 
            onClick={() => setOpen(true)}
            onChange={(e) => onChange(e.target.value)}
          />
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <Command>
          <CommandInput 
            placeholder="Search fermentable..." 
            value={searchQuery} 
            onValueChange={(value) => setSearchQuery(value || '')}
          />
          <CommandGroup>
            {suggestions.length > 0 ? (
              suggestions.map((item) => (
                <CommandItem
                  key={item.id || `fermentable-${Math.random()}`}
                  value={item.name}
                  onSelect={(value) => {
                    onSelect(value);
                    setOpen(false);
                  }}
                >
                  {item.name}
                </CommandItem>
              ))
            ) : (
              <CommandItem
                value="create-new"
                className="text-primary"
                onSelect={() => {
                  onCreateNew();
                  setOpen(false);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create "{searchQuery}"
              </CommandItem>
            )}
          </CommandGroup>
          <CommandEmpty>
            <CommandItem
              value="create-new-empty"
              className="text-primary"
              onSelect={() => {
                onCreateNew();
                setOpen(false);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create "{searchQuery}"
            </CommandItem>
          </CommandEmpty>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
