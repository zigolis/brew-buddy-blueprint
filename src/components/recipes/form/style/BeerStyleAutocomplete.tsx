
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
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

  // Make sure we're working with a valid array of beer styles
  const validBeerStyles = React.useMemo(() => {
    return Array.isArray(beerStyles) ? beerStyles : [];
  }, []);

  const filteredStyles = React.useMemo(() => {
    if (!searchQuery.trim()) return validBeerStyles;
    return validBeerStyles.filter((style) =>
      style.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, validBeerStyles]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? validBeerStyles.find((style) => style.name === value)?.name || value
            : "Select beer style..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput 
            placeholder="Search beer styles..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandGroup className="max-h-[300px] overflow-y-auto">
            {filteredStyles.length > 0 ? (
              filteredStyles.map((style) => (
                <CommandItem
                  key={style.name}
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
              ))
            ) : (
              <div className="py-6 text-center text-sm">No beer style found.</div>
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
