
import { useState } from "react";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useIngredientSuggestions } from "@/hooks/useIngredientSuggestions";

interface HopNameFieldProps {
  control: any;
  form: any;
  index: number;
  value: string;
}

export default function HopNameField({ control, form, index, value }: HopNameFieldProps) {
  const { getHopSuggestions } = useIngredientSuggestions();
  const [openPopover, setOpenPopover] = useState(false);
  const [searchQuery, setSearchQuery] = useState(value || '');

  const getSuggestions = (query: string) => {
    try {
      if (!query || query.trim() === "") return [];
      const results = getHopSuggestions(query);
      return Array.isArray(results) ? results : [];
    } catch {
      return [];
    }
  };

  return (
    <FormField
      control={control}
      name={`ingredients.hops.${index}.name`}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Name*</FormLabel>
          <Popover 
            open={openPopover} 
            onOpenChange={(open) => {
              setOpenPopover(open);
              if (open) setSearchQuery(field.value || "");
            }}
          >
            <PopoverTrigger asChild>
              <FormControl>
                <Input
                  placeholder="Search hop..."
                  {...field}
                  onClick={() => setOpenPopover(true)}
                />
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start">
              <Command>
                <CommandInput
                  placeholder="Search hop..."
                  value={searchQuery}
                  onValueChange={(val) => setSearchQuery(val || "")}
                />
                <CommandList>
                  <CommandEmpty>
                    <div className="py-1.5 px-2 text-sm">No hop found.</div>
                  </CommandEmpty>
                  {getSuggestions(searchQuery).length > 0 && (
                    <CommandGroup>
                      {getSuggestions(searchQuery).map((item) => (
                        <CommandItem
                          key={item.id || `hop-${Math.random()}`}
                          value={item.name}
                          onSelect={(val) => {
                            field.onChange(val);
                            form.setValue(
                              `ingredients.hops.${index}.costPerUnit`,
                              item.costPerUnit || 0
                            );
                            setOpenPopover(false);
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
        </FormItem>
      )}
    />
  );
}
