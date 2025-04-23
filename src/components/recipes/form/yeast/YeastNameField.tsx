
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

// Default yeast suggestions to always show
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
      // Always show default suggestions if no search query
      if (!query || query.trim() === '') {
        return DEFAULT_YEASTS;
      }
      
      // Get suggestions from the hook
      const customSuggestions = getYeastSuggestions(query);
      
      // Filter default suggestions based on query
      const matchingDefaults = DEFAULT_YEASTS.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      
      // Combine custom suggestions with filtered defaults
      let combinedSuggestions = [...(Array.isArray(customSuggestions) ? customSuggestions : [])];
      
      // Add default suggestions that aren't already in the custom suggestions
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
    
    // Add to ingredients database
    addNewYeast(newYeast);
    
    // Update form field
    form.setValue(`ingredients.yeasts.${index}.name`, searchQuery);
    
    // Close popover
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
            <PopoverContent className="p-0 w-[--radix-popover-trigger-width]" align="start">
              <Command>
                <CommandInput
                  placeholder="Search yeast..."
                  value={searchQuery}
                  onValueChange={(val) => setSearchQuery(val || "")}
                />
                <CommandList>
                  <CommandEmpty>
                    {searchQuery.trim() !== '' && (
                      <div 
                        className="flex items-center px-2 py-1.5 text-sm rounded-sm cursor-pointer hover:bg-accent"
                        onClick={handleCreateYeast}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Create "{searchQuery}"
                      </div>
                    )}
                  </CommandEmpty>
                  
                  {getSuggestions(searchQuery).length > 0 && (
                    <CommandGroup>
                      {getSuggestions(searchQuery).map((item) => (
                        <CommandItem
                          key={item.id || `yeast-${Math.random()}`}
                          value={item.name}
                          onSelect={(val) => {
                            field.onChange(val);
                            
                            // Update other related fields
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
                      
                      {searchQuery.trim() !== '' && (
                        <div 
                          className="flex items-center px-2 py-1.5 text-sm rounded-sm cursor-pointer text-primary hover:bg-accent"
                          onClick={handleCreateYeast}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Create "{searchQuery}"
                        </div>
                      )}
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
