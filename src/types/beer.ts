// Core recipe types
export interface Recipe {
  id: string;
  name: string;
  author: string;
  type: 'All Grain' | 'Extract' | 'Partial Mash';
  batchSize: number; // in liters
  boilTime: number; // in minutes
  efficiency: number; // brewhouse efficiency in %
  originalGravity: number | null;
  finalGravity: number | null;
  abv: number | null;
  style: Style;
  ingredients: {
    fermentables: Fermentable[];
    hops: Hop[];
    yeasts: Yeast[];
    miscs: Misc[];
  };
  mash: MashProfile;
  fermentation: FermentationProfile;
  waterProfile: WaterProfile;
  notes: string;
  estimatedCost: number;
  totalCost?: number;
  costPerServing?: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Style {
  name: string;
  category: string;
  categoryNumber: string;
  styleLetter: string;
  styleGuide: string;
  type: 'Lager' | 'Ale' | 'Wheat' | 'Mixed' | 'Other';
  minOg: number;
  maxOg: number;
  minFg: number;
  maxFg: number;
  minIbu: number;
  maxIbu: number;
  minColor: number; // in SRM
  maxColor: number; // in SRM
  minAbv: number;
  maxAbv: number;
  notes: string;
  profile: string;
  ingredients: string;
  examples: string;
}

// Ingredients
export interface Fermentable {
  id: string;
  name: string;
  type: 'Grain' | 'Sugar' | 'Extract' | 'Dry Extract' | 'Adjunct';
  amount: number; // in kg
  yield: number; // in percent
  color: number; // in lovibond
  supplier: string;
  notes: string;
  costPerUnit: number;
  inInventory?: number;
}

export interface Hop {
  id: string;
  name: string;
  alpha: number; // in percent
  amount: number; // in kg
  use: 'Boil' | 'Dry Hop' | 'Mash' | 'First Wort' | 'Aroma';
  time: number; // in minutes
  form: 'Pellet' | 'Plug' | 'Leaf';
  notes: string;
  costPerUnit: number;
  inInventory?: number;
}

export interface Yeast {
  id: string;
  name: string;
  type: 'Ale' | 'Lager' | 'Wheat' | 'Wine' | 'Champagne';
  form: 'Liquid' | 'Dry' | 'Slant' | 'Culture';
  laboratory: string;
  productId: string;
  minAttenuation: number;
  maxAttenuation: number;
  tempRange: {
    min: number; // in C
    max: number; // in C
  };
  flocculation: 'Low' | 'Medium' | 'High' | 'Very High';
  notes: string;
  costPerUnit: number;
  inInventory?: number;
}

export interface Misc {
  id: string;
  name: string;
  type: 'Spice' | 'Fining' | 'Water Agent' | 'Herb' | 'Flavor' | 'Other';
  use: 'Boil' | 'Mash' | 'Primary' | 'Secondary' | 'Bottling';
  time: number; // in minutes
  amount: number; // in kg
  amountIsWeight: boolean;
  notes: string;
  costPerUnit: number;
  inInventory?: number;
}

// Brewing Process
export interface MashStep {
  name: string;
  type: 'Infusion' | 'Temperature' | 'Decoction';
  temperature: number; // in C
  time: number; // in minutes
}

export interface MashProfile {
  name: string;
  grainTemp: number; // in C
  mashTemp: number; // in C
  spargeTemp: number; // in C
  ph: number;
  steps: MashStep[];
  notes: string;
}

export interface FermentationStep {
  name: string;
  temperature: number; // in C
  time: number; // in days
}

export interface FermentationProfile {
  name: string;
  steps: FermentationStep[];
  notes: string;
}

export interface WaterProfile {
  name: string;
  calcium: number; // in ppm
  magnesium: number; // in ppm
  sodium: number; // in ppm
  chloride: number; // in ppm
  sulfate: number; // in ppm
  bicarbonate: number; // in ppm
  ph: number;
  notes: string;
}

// Equipment
export interface Equipment {
  id: string;
  name: string;
  type: string;
  batchSize: number; // in liters
  boilSize: number; // in liters
  boilTime: number; // in minutes
  efficiency: number; // in percent
  notes: string;
  cost: number;
  purchaseDate?: string;
}

// Brewing session
export interface BrewingSession {
  id: string;
  recipeId: string;
  brewDate: string;
  brewers: string[];
  actualBatchSize: number;
  efficiency: number;
  notes: string;
  steps: BrewingStep[];
  measurements: Measurement[];
  costs: Cost[];
  totalCost: number;
}

export interface BrewingStep {
  id: string;
  type: 'Preparation' | 'Mash' | 'Boil' | 'Fermentation' | 'Packaging';
  name: string;
  instructions: string;
  completed: boolean;
  startTime?: string;
  endTime?: string;
  notes?: string;
}

export interface Measurement {
  id: string;
  type: 'Temperature' | 'Gravity' | 'pH' | 'Volume' | 'Other';
  value: number;
  unit: string;
  timestamp: string;
  notes?: string;
}

export interface Cost {
  id: string;
  category: 'Ingredients' | 'Equipment' | 'Utilities' | 'Other';
  name: string;
  amount: number;
  notes?: string;
}
```
```typescript
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

  // Ensure we're initializing form watch with empty arrays when needed
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
