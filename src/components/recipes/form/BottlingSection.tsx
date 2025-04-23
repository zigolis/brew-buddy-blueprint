
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export const BottlingSection = ({ form }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Bottling</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="bottling.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Standard bottling" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bottling.type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value || "Bottle"}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Bottle">Bottle</SelectItem>
                  <SelectItem value="Keg">Keg</SelectItem>
                  <SelectItem value="Both">Both</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bottling.temperature"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Temperature (°C)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="20" 
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bottling.period"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Period (days)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="14" 
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bottling.notes"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Add any notes about bottling..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
