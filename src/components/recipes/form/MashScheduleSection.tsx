
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { MashStep } from "@/types";

const MASH_TYPES = [
  "Single Infusion",
  "Step Mash",
  "Decoction",
  "Temperature Mash",
  "No Mash"
] as const;

export const MashScheduleSection = ({ form }) => {
  const addMashStep = () => {
    const currentSteps = form.getValues('mash.steps') || [];
    form.setValue('mash.steps', [...currentSteps, {
      name: `Step ${currentSteps.length + 1}`,
      type: 'Infusion',
      temperature: 67,
      time: 60
    }]);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Mash Schedule</h2>
      
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="mash.type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mash Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select mash type" />
                </SelectTrigger>
                <SelectContent>
                  {MASH_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mash.strikeTemp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Strike Temperature (°C)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {form.watch('mash.steps')?.map((step: MashStep, index: number) => (
        <div key={index} className="grid gap-4 md:grid-cols-3 border p-4 rounded-lg">
          <FormField
            control={form.control}
            name={`mash.steps.${index}.type`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Infusion">Infusion</SelectItem>
                    <SelectItem value="Temperature">Temperature</SelectItem>
                    <SelectItem value="Decoction">Decoction</SelectItem>
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

      <Button type="button" variant="outline" onClick={addMashStep} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Mash Step
      </Button>

      <FormField
        control={form.control}
        name="mash.notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mash Notes</FormLabel>
            <FormControl>
              <Textarea placeholder="Enter any notes about the mash schedule..." {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
