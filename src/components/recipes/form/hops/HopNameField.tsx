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
import { Plus } from "lucide-react";

const DEFAULT_HOPS = [
  { id: 'default-1', name: "Citra", alpha: 12, beta: 4, form: "Pellet", costPerUnit: 0.30 },
  { id: 'default-2', name: "Mosaic", alpha: 11.5, beta: 3.8, form: "Pellet", costPerUnit: 0.35 },
  { id: 'default-3', name: "Simcoe", alpha: 13, beta: 4.5, form: "Pellet", costPerUnit: 0.32 },
];

interface HopNameFieldProps {
  control: any;
  form: any;
  index: number;
  value: string;
}

export default function HopNameField({ control, form, index, value }: HopNameFieldProps) {
  const { getHopSuggestions, addNewHop } = useIngredientSuggestions();
  const [openPopover, setOpenPopover] = useState(false);
  const [searchQuery, setSearchQuery] = useState(value || '');

  const getSuggestions = (query: string) => {
    try {
      if (!query || query.trim() === '') {
        return DEFAULT_HOPS;
      }
      
      const customSuggestions = getHopSuggestions(query);
      
      const matchingDefaults = DEFAULT_HOPS.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      
      let combinedSuggestions = [...(Array.isArray(customSuggestions) ? customSuggestions : [])];
      
      matchingDefaults.forEach(defaultItem => {
        if (!combinedSuggestions.some(item => item.name === defaultItem.name)) {
          combinedSuggestions.push(defaultItem);
        }
      });
      
      return combinedSuggestions;
    } catch {
      return DEFAULT_HOPS;
    }
  };

  const handleCreateHop = () => {
    if (!searchQuery.trim()) return;
    
    const newHop = {
      name: searchQuery,
      alpha: 0,
      beta: 0,
      form: "Pellet",
      costPerUnit: 0
    };
    
    addNewHop(newHop);
    
    form.setValue(`ingredients.hops.${index}.name`, searchQuery);
    
    setOpenPopover(false);
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
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
              <Command>
                <CommandInput
                  placeholder="Search hop..."
                  value={searchQuery}
                  onValueChange={(val) => setSearchQuery(val || "")}
                />
                <CommandList>
                  <CommandEmpty>
                    <div 
                      className="flex items-center px-2 py-1.5 text-sm rounded-sm cursor-pointer hover:bg-accent"
                      onClick={handleCreateHop}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      + Create "{searchQuery}"
                    </div>
                  </CommandEmpty>
                  
                  {getSuggestions(searchQuery).length > 0 && (
                    <CommandGroup>
                      {getSuggestions(searchQuery).map((item) => (
                        <CommandItem
                          key={item.id || `hop-${Math.random()}`}
                          value={item.name}
                          onSelect={(val) => {
                            field.onChange(val);
                            
                            if (item.alpha) {
                              form.setValue(`ingredients.hops.${index}.alpha`, item.alpha);
                            }
                            if (item.beta) {
                              form.setValue(`ingredients.hops.${index}.beta`, item.beta);
                            }
                            if (item.form) {
                              form.setValue(`ingredients.hops.${index}.form`, item.form);
                            }
                            if (item.costPerUnit) {
                              form.setValue(`ingredients.hops.${index}.costPerUnit`, item.costPerUnit);
                            }
                            
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
