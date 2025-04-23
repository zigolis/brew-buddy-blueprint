
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const SpargingSection = ({ form }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Sparging</h2>
      
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="sparging.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Batch Sparge" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sparging.temperature"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Temperature (°C)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sparging.amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount (L)</FormLabel>
              <FormControl>
                <Input type="number" step="0.1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sparging.time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time (min)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="sparging.notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sparging Notes</FormLabel>
            <FormControl>
              <Textarea placeholder="Enter any notes about the sparging process..." {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
