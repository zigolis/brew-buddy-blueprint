
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface SpargingFormProps {
  form: UseFormReturn<any>;
}

export const SpargingForm = ({ form }: SpargingFormProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <FormField
        control={form.control}
        name="spargeTemp"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sparge Temperature (°C)</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="spargeAmount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sparge Amount (L)</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
