
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
import { Plus } from "lucide-react";
import { Ingredient } from "@/types";

interface IngredientSearchProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (value: string) => void;
  onCreateNew: () => void;
  getSuggestions: (query: string) => Ingredient[];
  defaultSuggestions: Ingredient[];
  placeholder?: string;
}

export const IngredientSearch = ({
  value,
  onChange,
  onSelect,
  onCreateNew,
  getSuggestions,
  defaultSuggestions,
  placeholder = "Search ingredient...",
}: IngredientSearchProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (open) {
      setSearchQuery(value || '');
    }
  }, [open, value]);

  const suggestions = (query: string) => {
    try {
      if (!query || query.trim() === '') {
        return defaultSuggestions;
      }

      const customSuggestions = getSuggestions(query);
      const matchingDefaults = defaultSuggestions.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );

      let combinedSuggestions = [...(Array.isArray(customSuggestions) ? customSuggestions : [])];
      matchingDefaults.forEach(defaultItem => {
        if (!combinedSuggestions.some(item => item.name === defaultItem.name)) {
          combinedSuggestions.push(defaultItem);
        }
      });

      return combinedSuggestions;
    } catch (error) {
      console.error('Error getting suggestions:', error);
      return defaultSuggestions;
    }
  };

  const handleCreateClick = () => {
    if (!searchQuery.trim()) return;
    onCreateNew();
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Input 
            placeholder={placeholder}
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
            placeholder={placeholder}
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
            {suggestions(searchQuery).length > 0 && (
              <CommandGroup>
                {suggestions(searchQuery).map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.name}
                    onSelect={() => {
                      onSelect(item.name);
                      setOpen(false);
                    }}
                  >
                    {item.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
