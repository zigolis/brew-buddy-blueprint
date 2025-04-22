
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import { useState } from "react";

export const YeastSection = ({ form }) => {
  const [openPopover, setOpenPopover] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { getYeastSuggestions } = useIngredientSuggestions();

  // Safely get suggestions, ensuring we always return an array
  const getSuggestions = (query: string) => {
    try {
      if (!query || query.trim() === '') {
        return [];
      }
      const results = getYeastSuggestions(query);
      console.log('Yeast suggestions in component:', query, results);
      return Array.isArray(results) ? results : [];
    } catch (error) {
      console.error('Error getting yeast suggestions:', error);
      return [];
    }
  };

  // Safely get the yeast cost value
  const yeastCost = parseFloat(form.watch('ingredients.yeasts.0.costPerUnit') || '0') || 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Yeast</h2>
        <div className="text-sm text-muted-foreground">
          Cost: ${yeastCost.toFixed(2)}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <FormField
          control={form.control}
          name="ingredients.yeasts.0.name"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Name*</FormLabel>
              <Popover 
                open={openPopover} 
                onOpenChange={(open) => {
                  setOpenPopover(open);
                  if (open) setSearchQuery(field.value || '');
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
                <PopoverContent className="p-0" align="start">
                  <Command>
                    <CommandInput 
                      placeholder="Search yeast..." 
                      value={searchQuery} 
                      onValueChange={(value) => setSearchQuery(value || '')}
                    />
                    <CommandEmpty>No yeast found.</CommandEmpty>
                    <CommandGroup>
                      {getSuggestions(searchQuery).map((item) => (
                        <CommandItem
                          key={item.id}
                          value={item.name}
                          onSelect={(value) => {
                            field.onChange(value);
                            form.setValue('ingredients.yeasts.0.costPerUnit', item.costPerUnit || 0);
                            setOpenPopover(false);
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
          name="ingredients.yeasts.0.type"
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
                  <SelectItem value="Ale">Ale</SelectItem>
                  <SelectItem value="Lager">Lager</SelectItem>
                  <SelectItem value="Wheat">Wheat</SelectItem>
                  <SelectItem value="Wine">Wine</SelectItem>
                  <SelectItem value="Champagne">Champagne</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ingredients.yeasts.0.form"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Form</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select form" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Liquid">Liquid</SelectItem>
                  <SelectItem value="Dry">Dry</SelectItem>
                  <SelectItem value="Slant">Slant</SelectItem>
                  <SelectItem value="Culture">Culture</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ingredients.yeasts.0.laboratory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Laboratory</FormLabel>
              <FormControl>
                <Input placeholder="Enter laboratory" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ingredients.yeasts.0.minAttenuation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Attenuation (%)</FormLabel>
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
      </div>
    </div>
  );
};
