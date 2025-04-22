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
  const { getYeastSuggestions } = useIngredientSuggestions();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Yeast</h2>
        <div className="text-sm text-muted-foreground">
          Cost: $
          {form.watch('ingredients.yeasts.0')?.costPerUnit || 0}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <FormField
          control={form.control}
          name="ingredients.yeasts.0.name"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Name*</FormLabel>
              <Popover open={openPopover} onOpenChange={setOpenPopover}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Input placeholder="Search yeast..." {...field} />
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search yeast..." />
                    <CommandEmpty>No yeast found.</CommandEmpty>
                    <CommandGroup>
                      {getYeastSuggestions(field.value || '').map((item) => (
                        <CommandItem
                          key={item.id}
                          value={item.name}
                          onSelect={(value) => {
                            field.onChange(value);
                            form.setValue('ingredients.yeasts.0.costPerUnit', item.costPerUnit);
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
                <Input type="number" step="0.1" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
