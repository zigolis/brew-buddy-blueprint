
import { useState } from "react";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export const FermentationSection = ({ form }) => {
  const [steps, setSteps] = useState([{ id: 0 }]);

  const addStep = () => {
    setSteps((prev) => [...prev, { id: prev.length }]);
  };

  const removeStep = (id: number) => {
    if (steps.length <= 1) return; 
    setSteps((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Fermentation</h2>
      {steps.map((step, index) => (
        <div key={step.id} className="grid gap-4 md:grid-cols-6 items-end">
          <FormField
            control={form.control}
            name={`fermentation.steps.${index}.name`}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Stage name (e.g. Primary, Secondary)" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`fermentation.steps.${index}.type`}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value || "Primary"}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Primary">Primary</SelectItem>
                    <SelectItem value="Secondary">Secondary</SelectItem>
                    <SelectItem value="Tertiary">Tertiary</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`fermentation.steps.${index}.temperature`}
            render={({ field }) => (
              <FormItem className="flex flex-col">
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
            name={`fermentation.steps.${index}.period`}
            render={({ field }) => (
              <FormItem className="flex flex-col">
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
            name={`fermentation.steps.${index}.notes`}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Notes about this stage..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => removeStep(step.id)}
            disabled={steps.length <= 1}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}

      <Button type="button" onClick={addStep} className="w-full">
        <Plus className="h-4 w-4 mr-2" /> Add Fermentation Step
      </Button>
    </div>
  );
};
