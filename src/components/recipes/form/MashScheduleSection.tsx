
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Plus, X } from "lucide-react";

export const MashScheduleSection = ({ form }) => {
  const [steps, setSteps] = useState([{ id: 0 }]);

  const addStep = () => {
    setSteps([...steps, { id: steps.length }]);
  };

  const removeStep = (id) => {
    if (steps.length <= 1) return;
    setSteps(steps.filter((step) => step.id !== id));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Mash Schedule</h2>

      <div className="grid gap-4 md:grid-cols-4">
        <FormField
          control={form.control}
          name="mash.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Single Infusion" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mash.grainTemp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grain Temp (°C)</FormLabel>
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
          name="mash.mashTemp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mash Temp (°C)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="67" 
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mash.spargeTemp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sparge Temp (°C)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="76" 
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <div className="border p-4 rounded-md space-y-4">
        <h3 className="text-lg font-medium">Mash Steps</h3>
        
        {steps.map((step, index) => (
          <div key={step.id} className="grid gap-4 md:grid-cols-4 items-end pb-4 border-b last:border-b-0">
            <FormField
              control={form.control}
              name={`mash.steps.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Step Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Mash In" {...field} />
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
                  <Select onValueChange={field.onChange} defaultValue={field.value || "Infusion"}>
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
                  <FormLabel>Temp (°C)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="67" 
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name={`mash.steps.${index}.time`}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Time (min)</FormLabel>
                  <div className="flex">
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="60" 
                        className="rounded-r-none"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    {steps.length > 1 && (
                      <Button 
                        type="button" 
                        variant="destructive"
                        className="rounded-l-none"
                        onClick={() => removeStep(step.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </FormItem>
              )}
            />
          </div>
        ))}
        
        <Button
          type="button"
          onClick={addStep}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Step
        </Button>
      </div>
      
      <FormField
        control={form.control}
        name="mashNotes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Notes</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Add notes about your mash schedule here..."
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
