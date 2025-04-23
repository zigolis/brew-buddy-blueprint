
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const stepTypes = [
  "Main conversion",
  "Body & stability",
  "Mash out",
  "Sparging"
] as const;

export const MashScheduleSection = ({ form }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Mash Schedule</h2>
      
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="mash.strikeTemp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Strike Temperature (°C)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="mash.time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time (min)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      {form.watch('mash.steps')?.map((_, index) => (
        <div key={index} className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name={`mash.steps.${index}.name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Step Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select step type" />
                  </SelectTrigger>
                  <SelectContent>
                    {stepTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name={`mash.steps.${index}.temperature`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Temperature (°C)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name={`mash.steps.${index}.time`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time (min)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      ))}
    </div>
  );
};
