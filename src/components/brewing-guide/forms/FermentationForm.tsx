
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface FermentationFormProps {
  form: UseFormReturn<any>;
}

export const FermentationForm = ({ form }: FermentationFormProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <FormField
        control={form.control}
        name="fermentationTemp"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Fermentation Temperature (°C)</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
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
    </div>
  );
};
