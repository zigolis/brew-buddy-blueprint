
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const RecipeStatsSection = ({ form }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Recipe Statistics</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <FormField
          control={form.control}
          name="batchSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Batch Size (L)*</FormLabel>
              <FormControl>
                <Input type="number" step="0.1" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="boilTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Boil Time (min)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="efficiency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Efficiency (%)</FormLabel>
              <FormControl>
                <Input type="number" step="0.1" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <FormField
          control={form.control}
          name="originalGravity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Original Gravity</FormLabel>
              <FormControl>
                <Input type="number" step="0.001" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="finalGravity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Final Gravity</FormLabel>
              <FormControl>
                <Input type="number" step="0.001" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ibu"
          render={({ field }) => (
            <FormItem>
              <FormLabel>IBU</FormLabel>
              <FormControl>
                <Input type="number" step="0.1" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="abv"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ABV (%)</FormLabel>
              <FormControl>
                <Input type="number" step="0.1" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color (EBC)</FormLabel>
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
