
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface BoilFormProps {
  form: UseFormReturn<any>;
}

export const BoilForm = ({ form }: BoilFormProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
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
        name="preBoilVolume"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pre-boil Volume (L)</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
