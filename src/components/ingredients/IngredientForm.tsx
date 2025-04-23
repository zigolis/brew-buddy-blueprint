
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Ingredient } from "@/types/ingredients";
import { IngredientBasicFields } from "./form-sections/IngredientBasicFields";
import { IngredientYeastFields } from "./form-sections/IngredientYeastFields";
import { IngredientAdditionalFields } from "./form-sections/IngredientAdditionalFields";

// Define an extended form data type including yeast fields
type IngredientFormData = Omit<Ingredient, 'id' | 'createdAt' | 'updatedAt'> & {
  yeastType?: string;
  form?: string;
  laboratory?: string;
  minAttenuation?: number;
  maxAttenuation?: number;
};

interface IngredientFormProps {
  onSubmit: (data: Omit<Ingredient, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  ingredientId: string | null;
  defaultValues: IngredientFormData;
  typeOverride?: string;
  showYeastFields?: boolean;
}

export function IngredientForm({ 
  onSubmit, 
  onCancel, 
  defaultValues,
  typeOverride,
  showYeastFields = false 
}: IngredientFormProps) {
  const form = useForm<IngredientFormData>({
    defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  const handleSubmit = (data: IngredientFormData) => {
    // Extract only the base ingredient fields
    const { yeastType, form: yeastForm, laboratory, minAttenuation, maxAttenuation, ...ingredientData } = data;
    onSubmit(ingredientData);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <IngredientBasicFields form={form} typeOverride={typeOverride} />
        
        {showYeastFields && <IngredientYeastFields form={form} />}
        
        <IngredientAdditionalFields form={form} />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {defaultValues.name ? "Update" : "Add"} Ingredient
          </Button>
        </div>
      </form>
    </Form>
  );
}
