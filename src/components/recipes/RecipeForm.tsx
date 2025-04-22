
import { useForm } from "react-hook-form";
import { Recipe } from "@/types/beer";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { GeneralInfoSection } from "./form/GeneralInfoSection";
import { RecipeStatsSection } from "./form/RecipeStatsSection";
import { FermentablesSection } from "./form/FermentablesSection";
import { HopsSection } from "./form/HopsSection";
import { YeastSection } from "./form/YeastSection";
import { MashScheduleSection } from "./form/MashScheduleSection";
import { Separator } from "@/components/ui/separator";

interface RecipeFormProps {
  onSubmit: (data: Partial<Recipe>) => void;
  initialData?: Partial<Recipe>;
}

export function RecipeForm({ onSubmit, initialData }: RecipeFormProps) {
  const form = useForm<Partial<Recipe>>({
    defaultValues: initialData || {
      name: "",
      author: "",
      type: "All Grain",
      batchSize: 20,
      boilTime: 60,
      efficiency: 75,
      notes: "",
      tags: [],
      ingredients: {
        fermentables: [],
        hops: [],
        yeasts: [{}],
        miscs: []
      },
      mash: {
        name: "Single Infusion",
        steps: [],
        notes: ""
      }
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <GeneralInfoSection form={form} />
        <Separator />
        <RecipeStatsSection form={form} />
        <Separator />
        <FermentablesSection form={form} />
        <Separator />
        <HopsSection form={form} />
        <Separator />
        <YeastSection form={form} />
        <Separator />
        <MashScheduleSection form={form} />
        
        <div className="flex justify-end space-x-4">
          <Button type="submit">Create Recipe</Button>
        </div>
      </form>
    </Form>
  );
}
