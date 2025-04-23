import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { beerStyles } from "./beerStyles";
import { Style } from "@/types";

interface BeerStyleAutocompleteProps {
  value?: string;
  onChange: (style: Style) => void;
}

export function BeerStyleAutocomplete({
  value,
  onChange,
}: BeerStyleAutocompleteProps) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  // Ensure we always have a valid array of styles - defensive programming
  const styles = React.useMemo(() => {
    return Array.isArray(beerStyles) ? beerStyles : [];
  }, []);

  // Filter styles based on search query with additional safety checks
  const filteredStyles = React.useMemo(() => {
    if (!searchQuery || searchQuery.trim() === "") {
      return styles;
    }
    
    const query = searchQuery.toLowerCase().trim();
    return styles.filter((style) => {
      return style && style.name && typeof style.name === 'string' && 
        style.name.toLowerCase().includes(query);
    });
  }, [searchQuery, styles]);

  // Find the currently selected style name
  const selectedStyleName = React.useMemo(() => {
    if (!value) return "Select beer style...";
    const selected = styles.find(style => style && style.name === value);
    return selected ? selected.name : "Select beer style...";
  }, [value, styles]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedStyleName}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start" sideOffset={4}>
        <Command>
          <CommandInput 
            placeholder="Search beer styles..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>No beer style found.</CommandEmpty>
            <CommandGroup>
              {filteredStyles.map((style) => {
                // Additional safety check before rendering each item
                if (!style || !style.name) return null;
                
                return (
                  <CommandItem
                    key={`${style.name}-${style.category || 'unknown'}`}
                    value={style.name}
                    onSelect={() => {
                      onChange(style);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === style.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {style.name}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
