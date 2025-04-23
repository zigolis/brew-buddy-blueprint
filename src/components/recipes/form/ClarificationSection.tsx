
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export const ClarificationSection = ({ form }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Clarification</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="clarification.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Whirlpool" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="clarification.type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value || "Whirlpool"}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Whirlpool">Whirlpool</SelectItem>
                  <SelectItem value="Filter">Filter</SelectItem>
                  <SelectItem value="Fining">Fining</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="clarification.amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount (g/ml)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="0" 
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="clarification.temperature"
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
          name="clarification.notes"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Add any notes about clarification..."
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
