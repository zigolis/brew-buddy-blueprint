
import React from 'react';
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { MashingForm } from './forms/MashingForm';
import { SpargingForm } from './forms/SpargingForm';
import { BoilForm } from './forms/BoilForm';
import { FermentationForm } from './forms/FermentationForm';

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

  const renderStepFields = () => {
    switch (stepType) {
      case 'Mash':
        return <MashingForm form={form} />;
      case 'Sparging':
        return <SpargingForm form={form} />;
      case 'Boil':
        return <BoilForm form={form} />;
      case 'Fermentation':
        return <FermentationForm form={form} />;
      default:
        return null;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {renderStepFields()}
        
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
