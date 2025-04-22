
import { useState } from "react";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { useIngredientSuggestions } from "@/hooks/useIngredientSuggestions";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const HopsSection = ({ form }) => {
  const [hops, setHops] = useState([{ id: 0 }]);
  const [openPopover, setOpenPopover] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { getHopSuggestions } = useIngredientSuggestions();

  // Safely get suggestions, ensuring we always return an array
  const getSuggestions = (query: string) => {
    try {
      if (!query || query.trim() === '') {
        return [];
      }
      const results = getHopSuggestions(query);
      console.log('Hop suggestions in component:', query, results);
      return Array.isArray(results) ? results : [];
    } catch (error) {
      console.error('Error getting hop suggestions:', error);
      return [];
    }
  };

  const addHop = () => {
    setHops([...hops, { id: hops.length }]);
  };

  const removeHop = (id: number) => {
    if (hops.length <= 1) {
      return; // Don't remove the last hop
    }
    setHops(hops.filter(h => h.id !== id));
  };

  // Ensure we're initializing form watch with empty arrays when needed
  const watchedHops = form.watch('ingredients.hops') || [];

  // Calculate total cost, ensuring watchedHops is always an array
  const calculateTotalCost = () => {
    if (!Array.isArray(watchedHops)) {
      return 0; // Return 0 if watchedHops is not an array
    }
    
    return watchedHops.reduce((acc, hop) => {
      const amount = parseFloat(hop?.amount || '0') || 0;
      const cost = parseFloat(hop?.costPerUnit || '0') || 0;
      return acc + (amount * cost);
    }, 0).toFixed(2);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Hops</h2>
        <div className="text-sm text-muted-foreground">
          Total Cost: $
          {calculateTotalCost()}
        </div>
      </div>

      {hops.map((hop, index) => (
        <div key={hop.id} className="grid gap-4 md:grid-cols-8 items-end border p-4 rounded-lg">
          <FormField
            control={form.control}
            name={`ingredients.hops.${index}.name`}
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
                        placeholder="Search hop..." 
                        {...field} 
                        onClick={() => setOpenPopover(index)}
                      />
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0" align="start">
                    <Command>
                      <CommandInput 
                        placeholder="Search hop..." 
                        value={searchQuery} 
                        onValueChange={(value) => setSearchQuery(value || '')}
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
                                onSelect={(value) => {
                                  field.onChange(value);
                                  form.setValue(`ingredients.hops.${index}.costPerUnit`, item.costPerUnit || 0);
                                  setOpenPopover(null);
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

          <FormField
            control={form.control}
            name={`ingredients.hops.${index}.amount`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount (g)*</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    step="0.1" 
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
            name={`ingredients.hops.${index}.alpha`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alpha (%)</FormLabel>
                <FormControl>
                  <Input 
                    type="number"
                    step="0.01"
                    min="0"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value ? parseFloat(e.target.value) : 0;
                      field.onChange(isNaN(value) ? 0 : value);
                    }}
                    placeholder="e.g. 5.5"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`ingredients.hops.${index}.beta`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Beta (%)</FormLabel>
                <FormControl>
                  <Input 
                    type="number"
                    step="0.01"
                    min="0"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value ? parseFloat(e.target.value) : 0;
                      field.onChange(isNaN(value) ? 0 : value);
                    }}
                    placeholder="e.g. 4.2"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`ingredients.hops.${index}.time`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time (min)*</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value ? parseInt(e.target.value) : 0;
                      field.onChange(isNaN(value) ? 0 : value);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`ingredients.hops.${index}.use`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Use</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value || "Boil"}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select use" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Boil">Boil</SelectItem>
                    <SelectItem value="Dry Hop">Dry Hop</SelectItem>
                    <SelectItem value="Mash">Mash</SelectItem>
                    <SelectItem value="First Wort">First Wort</SelectItem>
                    <SelectItem value="Aroma">Aroma</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`ingredients.hops.${index}.form`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Form</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value || "Pellet"}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select form" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Pellet">Pellet</SelectItem>
                    <SelectItem value="Plug">Plug</SelectItem>
                    <SelectItem value="Leaf">Leaf</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => removeHop(hop.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}

      <Button type="button" onClick={addHop} className="w-full">
        <Plus className="h-4 w-4 mr-2" /> Add Hop
      </Button>
    </div>
  );
};
