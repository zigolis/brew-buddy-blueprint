
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const BoilSection = ({ form }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Boil</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <FormField
          control={form.control}
          name="boil.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Main boil" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="boil.time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time (minutes)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="60" 
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="boil.temperature"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Temperature (°C)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="100" 
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
