
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
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
            ? beerStyles.find((style) => style.name === value)?.name
            : "Select beer style..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search beer styles..." />
          <CommandEmpty>No beer style found.</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-y-auto">
            {beerStyles.map((style) => (
              <CommandItem
                key={style.name}
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
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
