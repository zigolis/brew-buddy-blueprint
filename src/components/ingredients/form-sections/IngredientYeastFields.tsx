
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function IngredientYeastFields({ form }: { form: any }) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="yeastType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Yeast Type</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select yeast type" />
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
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="form"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Form</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
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
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="laboratory"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Laboratory</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="minAttenuation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Min Attenuation (%)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maxAttenuation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max Attenuation (%)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
