
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

interface FermentableSearchProps {
  index: number;
  value: string;
  onChange: (value: string) => void;
  onSelect: (value: string) => void;
}

export const FermentableSearch = ({
  index,
  value,
  onChange,
  onSelect,
}: FermentableSearchProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { getFermentableSuggestions } = useIngredientSuggestions();

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
          <CommandEmpty>No fermentable found.</CommandEmpty>
          <CommandGroup>
            {getFermentableSuggestions(searchQuery).map((item) => (
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
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
