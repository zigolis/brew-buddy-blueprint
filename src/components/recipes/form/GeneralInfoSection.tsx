import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { WaterSection } from "./WaterSection";
import { BeerStyleAutocomplete } from "./style/BeerStyleAutocomplete";
import { waterProfiles } from "./style/beerStyles";

export const GeneralInfoSection = ({ form }) => {
  const handleStyleChange = (style) => {
    form.setValue("style", style);
    
    // Update water profile based on selected style
    const waterProfile = waterProfiles[style.name];
    if (waterProfile) {
      form.setValue("waterProfile", waterProfile);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">General Information</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="name"
          rules={{ required: "Recipe name is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipe Name*</FormLabel>
              <FormControl>
                <Input placeholder="Enter recipe name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brewer</FormLabel>
              <FormControl>
                <Input placeholder="Enter brewer name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="style.name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Beer Style</FormLabel>
            <FormControl>
              <BeerStyleAutocomplete
                value={field.value}
                onChange={handleStyleChange}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Notes</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter recipe notes"
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <WaterSection form={form} />
    </div>
  );
};
