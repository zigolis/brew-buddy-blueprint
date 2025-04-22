
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  // Safely get suggestions, ensuring we always return an array
  const getSuggestions = (query: string) => {
    try {
      const results = getFermentableSuggestions(query);
      return Array.isArray(results) ? results : [];
    } catch (error) {
      console.error('Error getting fermentable suggestions:', error);
      return [];
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Fermentables</h2>
        <div className="text-sm text-muted-foreground">
          Total Cost: $
          {(form.watch('ingredients.fermentables') || []).reduce((acc, f) => 
            acc + (parseFloat(f?.amount) || 0) * (parseFloat(f?.costPerUnit) || 0), 0
          ).toFixed(2)}
        </div>
      </div>

      {fermentables.map((fermentable, index) => (
        <div key={fermentable.id} className="grid gap-4 md:grid-cols-4 items-end border p-4 rounded-lg">
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
                      <Input placeholder="Search fermentable..." {...field} />
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
                <FormLabel>Amount (kg)*</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    step="0.001" 
                    {...field} 
                    onChange={(e) => {
                      const value = e.target.value ? parseFloat(e.target.value) : 0;
                      field.onChange(isNaN(value) ? 0 : value);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`ingredients.fermentables.${index}.type`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Grain">Grain</SelectItem>
                    <SelectItem value="Sugar">Sugar</SelectItem>
                    <SelectItem value="Extract">Extract</SelectItem>
                    <SelectItem value="Dry Extract">Dry Extract</SelectItem>
                    <SelectItem value="Adjunct">Adjunct</SelectItem>
                  </SelectContent>
                </Select>
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
