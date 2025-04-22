
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
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const HopsSection = ({ form }) => {
  const [hops, setHops] = useState([{ id: 0 }]);
  const [openPopover, setOpenPopover] = useState<number | null>(null);
  const { getHopSuggestions } = useIngredientSuggestions();

  const addHop = () => {
    setHops([...hops, { id: hops.length }]);
  };

  const removeHop = (id: number) => {
    setHops(hops.filter(h => h.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Hops</h2>
        <div className="text-sm text-muted-foreground">
          Total Cost: $
          {(form.watch('ingredients.hops') || []).reduce((acc, h) => 
            acc + (h?.amount || 0) * (h?.costPerUnit || 0), 0
          ).toFixed(2)}
        </div>
      </div>

      {hops.map((hop, index) => (
        <div key={hop.id} className="grid gap-4 md:grid-cols-5 items-end border p-4 rounded-lg">
          <FormField
            control={form.control}
            name={`ingredients.hops.${index}.name`}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Name*</FormLabel>
                <Popover 
                  open={openPopover === index} 
                  onOpenChange={(open) => setOpenPopover(open ? index : null)}
                >
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Input placeholder="Search hop..." {...field} />
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search hop..." />
                      <CommandEmpty>No hop found.</CommandEmpty>
                      <CommandGroup>
                        {/* Use an empty array as fallback */}
                        {(getHopSuggestions(field.value || '') || []).map((item) => (
                          <CommandItem
                            key={item.id}
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
                      field.onChange(parseFloat(e.target.value) || 0);
                    }}
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
                      field.onChange(parseInt(e.target.value) || 0);
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
