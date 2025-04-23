import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import { useState } from "react";
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

interface HopRowProps {
  form: any;
  control: any;
  index: number;
  hop: { id: number };
  onRemove: (id: number) => void;
  onAddToRecipe?: (hopData: any) => void;
}

export default function HopRow({ form, control, index, hop, onRemove, onAddToRecipe }: HopRowProps) {
  const watchedHop = form.watch(`ingredients.hops.${index}`) || {};
  const [openPopover, setOpenPopover] = useState(false);
  const [searchQuery, setSearchQuery] = useState(watchedHop.name || '');
  const { getHopSuggestions } = useIngredientSuggestions();

  const getSuggestions = (query: string) => {
    try {
      if (!query || query.trim() === "") return [];
      const results = getHopSuggestions(query);
      return Array.isArray(results) ? results : [];
    } catch {
      return [];
    }
  };

  const handleSelectHop = (hop: any) => {
    form.setValue(`ingredients.hops.${index}.name`, hop.name);
    form.setValue(`ingredients.hops.${index}.alpha`, hop.alpha || 0);
    form.setValue(`ingredients.hops.${index}.beta`, hop.beta || 0);
    form.setValue(`ingredients.hops.${index}.form`, hop.form || "Pellet");
    form.setValue(`ingredients.hops.${index}.costPerUnit`, hop.costPerUnit || 0);
    setOpenPopover(false);
  };

  return (
    <div className="grid gap-4 md:grid-cols-8 items-end">
      <FormField
        control={control}
        name={`ingredients.hops.${index}.name`}
        render={({ field }) => (
          <FormItem>
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
                      No results found.
                    </CommandEmpty>
                    {getSuggestions(searchQuery).length > 0 && (
                      <CommandGroup>
                        {getSuggestions(searchQuery).map((item) => (
                          <CommandItem
                            key={item.id || `hop-${Math.random()}`}
                            value={item.name}
                            onSelect={() => handleSelectHop(item)}
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
        control={control}
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
        control={control}
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
        control={control}
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
        control={control}
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
        control={control}
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
        control={control}
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
                <SelectItem value="Whole">Whole</SelectItem>
                <SelectItem value="Plug">Plug</SelectItem>
                <SelectItem value="Leaf">Leaf</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      <Button
        type="button"
        onClick={() => onRemove(hop.id)}
      >
        <Trash2 className="h-4 w-4 mr-2" /> Remove
      </Button>
    </div>
  );
}
