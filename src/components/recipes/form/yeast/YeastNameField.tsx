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

const DEFAULT_YEASTS = [
  { id: 'default-1', name: "Safale US-05", type: "Ale", form: "Dry", amount: 1, costPerUnit: 7.99 },
  { id: 'default-2', name: "Wyeast 1056 American Ale", type: "Ale", form: "Liquid", amount: 1, costPerUnit: 9.99 },
  { id: 'default-3', name: "White Labs WLP001", type: "Ale", form: "Liquid", amount: 1, costPerUnit: 8.99 },
];

export const YeastNameField = ({ control, index, form }) => {
  const { getYeastSuggestions, addNewYeast } = useIngredientSuggestions();
  const [openPopover, setOpenPopover] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const getSuggestions = (query: string) => {
    try {
      if (!query || query.trim() === '') {
        return DEFAULT_YEASTS;
      }
      
      const customSuggestions = getYeastSuggestions(query);
      
      const matchingDefaults = DEFAULT_YEASTS.filter(item => 
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
      return DEFAULT_YEASTS;
    }
  };

  const handleCreateYeast = () => {
    if (!searchQuery.trim()) return;
    
    const newYeast = {
      name: searchQuery,
      type: "Ale",
      form: "Dry",
      amount: 1,
      costPerUnit: 0
    };
    
    addNewYeast(newYeast);
    
    form.setValue(`ingredients.yeasts.${index}.name`, searchQuery);
    
    setOpenPopover(false);
  };

  return (
    <FormField
      control={control}
      name={`ingredients.yeasts.${index}.name`}
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
                  placeholder="Search yeast..."
                  {...field}
                  onClick={() => setOpenPopover(true)}
                />
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
              <Command>
                <CommandInput
                  placeholder="Search yeast..."
                  value={searchQuery}
                  onValueChange={(val) => setSearchQuery(val || "")}
                />
                <CommandList>
                  <CommandEmpty>
                    <div 
                      className="flex items-center px-2 py-1.5 text-sm rounded-sm cursor-pointer hover:bg-accent"
                      onClick={handleCreateYeast}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      + Create "{searchQuery}"
                    </div>
                  </CommandEmpty>
                  
                  {getSuggestions(searchQuery).length > 0 && (
                    <CommandGroup>
                      {getSuggestions(searchQuery).map((item) => (
                        <CommandItem
                          key={item.id || `yeast-${Math.random()}`}
                          value={item.name}
                          onSelect={(val) => {
                            field.onChange(val);
                            
                            if (item.type) {
                              form.setValue(`ingredients.yeasts.${index}.type`, item.type);
                            }
                            if (item.form) {
                              form.setValue(`ingredients.yeasts.${index}.form`, item.form);
                            }
                            if (item.costPerUnit) {
                              form.setValue(`ingredients.yeasts.${index}.costPerUnit`, item.costPerUnit);
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
};
