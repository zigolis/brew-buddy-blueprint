
import React from 'react';
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";

interface StepDataFormProps {
  stepType: string;
  onSave: (data: any) => void;
  initialData?: any;
}

export const StepDataForm = ({ stepType, onSave, initialData }: StepDataFormProps) => {
  const form = useForm({
    defaultValues: initialData || {}
  });

  const handleSubmit = (data: any) => {
    onSave(data);
  };

  const renderMashingFields = () => (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="mashType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mash Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select mash type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Single Infusion">Single Infusion</SelectItem>
                  <SelectItem value="Step Mash">Step Mash</SelectItem>
                  <SelectItem value="Decoction">Decoction</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="strikeTemp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Strike Temperature (°C)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Mash Steps</h4>
        {form.watch('mashSteps')?.map((_, index) => (
          <div key={index} className="grid gap-4 md:grid-cols-3 border p-4 rounded-lg mb-4">
            <FormField
              control={form.control}
              name={`mashSteps.${index}.temperature`}
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
              name={`mashSteps.${index}.time`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time (min)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                const current = form.getValues('mashSteps');
                form.setValue('mashSteps', current.filter((_, i) => i !== index));
              }}
            >
              <Trash2 className="h-4 w-4" />
              Remove Step
            </Button>
          </div>
        ))}
        
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            const current = form.getValues('mashSteps') || [];
            form.setValue('mashSteps', [...current, { temperature: '', time: '' }]);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Mash Step
        </Button>
      </div>
    </div>
  );

  const renderSpargingFields = () => (
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

  const renderBoilFields = () => (
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

  const renderFermentationFields = () => (
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {stepType === 'Mash' && renderMashingFields()}
        {stepType === 'Sparging' && renderSpargingFields()}
        {stepType === 'Boil' && renderBoilFields()}
        {stepType === 'Fermentation' && renderFermentationFields()}
        
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your notes for this step..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        <Button type="submit">Save Data</Button>
      </form>
    </Form>
  );
};
