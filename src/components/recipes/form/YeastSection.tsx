
import { useState } from "react";
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
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const YeastSection = ({ form }) => {
  const [openPopover, setOpenPopover] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [yeasts, setYeasts] = useState([{ id: 0 }]);
  const { getYeastSuggestions } = useIngredientSuggestions();

  const getSuggestions = (query: string) => {
    try {
      if (!query || query.trim() === '') {
        return [];
      }
      const results = getYeastSuggestions(query);
      return Array.isArray(results) ? results : [];
    } catch (error) {
      console.error('Error getting yeast suggestions:', error);
      return [];
    }
  };

  const handleYeastSelect = (item: any) => {
    form.setValue('ingredients.yeasts.0.name', item.name);
    if (item.type) form.setValue('ingredients.yeasts.0.type', item.type);
    if (item.form) form.setValue('ingredients.yeasts.0.form', item.form);
    if (item.laboratory) form.setValue('ingredients.yeasts.0.laboratory', item.laboratory);
    if (item.productId) form.setValue('ingredients.yeasts.0.productId', item.productId);
    if (item.minAttenuation) form.setValue('ingredients.yeasts.0.minAttenuation', item.minAttenuation);
    if (item.maxAttenuation) form.setValue('ingredients.yeasts.0.maxAttenuation', item.maxAttenuation);
    if (item.costPerUnit) form.setValue('ingredients.yeasts.0.costPerUnit', item.costPerUnit);
    setOpenPopover(false);
  };

  const addYeast = () => {
    setYeasts([...yeasts, { id: yeasts.length }]);
  };

  const removeYeast = (id: number) => {
    if (yeasts.length <= 1) return;
    setYeasts(yeasts.filter((y) => y.id !== id));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Yeast</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-4 rounded-lg">
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
                    <CommandList>
                      <CommandEmpty>
                        <div className="py-1.5 px-2 text-sm">No yeast found.</div>
                      </CommandEmpty>
                      {getSuggestions(searchQuery).length > 0 && (
                        <CommandGroup>
                          {getSuggestions(searchQuery).map((item) => (
                            <CommandItem
                              key={item.id || `yeast-${Math.random()}`}
                              value={item.name}
                              onSelect={() => handleYeastSelect(item)}
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
          name="ingredients.yeasts.0.amount"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Amount (g)*</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="1"
                  placeholder="11.5"
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
        <FormField
          control={form.control}
          name="ingredients.yeasts.0.type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || "Ale"}>
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
      </div>
      
      <div className="grid gap-4 md:grid-cols-4 border p-4 rounded-lg">
        <FormField
          control={form.control}
          name="ingredients.yeasts.0.form"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Form</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || "Dry"}>
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
              <FormLabel>Min Attenuation (%)</FormLabel>
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
          name="ingredients.yeasts.0.maxAttenuation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max Attenuation (%)</FormLabel>
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
      
      <Button
        type="button"
        onClick={addYeast}
        className="w-full bg-amber-500 text-white hover:bg-amber-600"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Yeast
      </Button>
    </div>
  );
};
