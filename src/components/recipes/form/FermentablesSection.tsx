import { useState } from "react";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useIngredientSuggestions } from "@/hooks/useIngredientSuggestions";
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

export const FermentablesSection = ({ form }) => {
  const [fermentables, setFermentables] = useState([{ id: 0 }]);
  const [openPopover, setOpenPopover] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { getFermentableSuggestions } = useIngredientSuggestions();

  const addFermentable = () => {
    setFermentables([...fermentables, { id: fermentables.length }]);
  };

  const removeFermentable = (id: number) => {
    setFermentables(fermentables.filter(f => f.id !== id));
  };

  const getSuggestions = (query: string) => {
    try {
      if (!query || query.trim() === '') {
        return [];
      }
      const results = getFermentableSuggestions(query);
      console.log('Fermentable suggestions in component:', query, results);
      return Array.isArray(results) ? results : [];
    } catch (error) {
      console.error('Error getting fermentable suggestions:', error);
      return [];
    }
  };

  const watchedFermentables = form.watch('ingredients.fermentables') || [];
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Fermentables</h2>
        <div className="text-sm text-muted-foreground">
          Total Cost: $
          {watchedFermentables.reduce((acc, f) => 
            acc + ((parseFloat(f?.amount || '0') / 1000) || 0) * (parseFloat(f?.costPerUnit || '0') || 0), 0
          ).toFixed(2)}
        </div>
      </div>

      {fermentables.map((fermentable, index) => (
        <div key={fermentable.id} className="grid gap-4 md:grid-cols-3 items-end border p-4 rounded-lg">
          <FormField
            control={form.control}
            name={`ingredients.fermentables.${index}.name`}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Name*</FormLabel>
                <Popover 
                  open={openPopover === index} 
                  onOpenChange={(open) => {
                    setOpenPopover(open ? index : null);
                    if (open) setSearchQuery(field.value || '');
                  }}
                >
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Input 
                        placeholder="Search fermentable..." 
                        {...field} 
                        onClick={() => setOpenPopover(index)}
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
                        {getSuggestions(searchQuery).map((item) => (
                          <CommandItem
                            key={item.id}
                            value={item.name}
                            onSelect={(value) => {
                              field.onChange(value);
                              form.setValue(`ingredients.fermentables.${index}.costPerUnit`, item.costPerUnit || 0);
                              setOpenPopover(null);
                            }}
                          >
                            {item.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`ingredients.fermentables.${index}.amount`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount (g)*</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    step="1" 
                    placeholder="500"
                    {...field} 
                    onChange={(e) => {
                      const value = e.target.value ? Number(e.target.value) : 0;
                      field.onChange(value);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => removeFermentable(fermentable.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}

      <Button type="button" onClick={addFermentable} className="w-full">
        <Plus className="h-4 w-4 mr-2" /> Add Fermentable
      </Button>
    </div>
  );
};
