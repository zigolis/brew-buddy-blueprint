
import { useState } from "react";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";

export const MashScheduleSection = ({ form }) => {
  const [steps, setSteps] = useState([{ id: 0 }]);

  const addStep = () => {
    setSteps([...steps, { id: steps.length }]);
  };

  const removeStep = (id: number) => {
    setSteps(steps.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Mash Schedule</h2>
      {steps.map((step, index) => (
        <div key={step.id} className="grid gap-4 md:grid-cols-4 items-end border p-4 rounded-lg">
          <FormField
            control={form.control}
            name={`mash.steps.${index}.name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name*</FormLabel>
                <FormControl>
                  <Input placeholder="Enter step name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`mash.steps.${index}.type`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
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
                <FormLabel>Temperature (°C)*</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => removeStep(step.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}

      <Button type="button" onClick={addStep} className="w-full">
        <Plus className="h-4 w-4 mr-2" /> Add Mash Step
      </Button>
    </div>
  );
};
