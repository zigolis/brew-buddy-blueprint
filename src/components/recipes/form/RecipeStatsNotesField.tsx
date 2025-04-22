
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";
import { Recipe } from "@/types/recipe";

interface RecipeStatsNotesFieldProps {
  form: {
    control: Control<any>;
  };
}

export const RecipeStatsNotesField = ({ form }: RecipeStatsNotesFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="recipeStats.notes"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Recipe Statistics Notes</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Enter any notes about your recipe statistics..."
              className="min-h-[100px]"
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
