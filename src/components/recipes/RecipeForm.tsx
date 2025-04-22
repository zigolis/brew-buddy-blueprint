
import { useForm } from "react-hook-form";
import { Recipe } from "@/types";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { GeneralInfoSection } from "./form/GeneralInfoSection";
import { RecipeStatsSection } from "./form/RecipeStatsSection";
import { FermentablesSection } from "./form/FermentablesSection";
import { HopsSection } from "./form/HopsSection";
import { YeastSection } from "./form/YeastSection";
import { MashScheduleSection } from "./form/MashScheduleSection";
import { BoilSection } from "./form/BoilSection";
import { ClarificationSection } from "./form/ClarificationSection";
import { FermentationSection } from "./form/FermentationSection";
import { ColdCrashSection } from "./form/ColdCrashSection";
import { CarbonationSection } from "./form/CarbonationSection";
import { BottlingSection } from "./form/BottlingSection";
import { Separator } from "@/components/ui/separator";
import { useRecipeCost } from "@/hooks/useRecipeCost";

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
      originalGravity: null,
      finalGravity: null,
      abv: null,
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
      },
      boil: {
        name: "Standard Boil",
        time: 60,
        temperature: 100
      },
      clarification: {
        name: "Standard Clarification",
        type: "Whirlpool",
        amount: 0,
        temperature: 20,
        notes: ""
      },
      fermentation: {
        name: "Primary Fermentation",
        type: "Primary",
        temperature: 20,
        period: 14,
        notes: ""
      },
      coldCrash: {
        name: "Standard Cold Crash",
        type: "Standard",
        temperature: 2,
        period: 48,
        notes: ""
      },
      carbonation: {
        name: "Standard Carbonation",
        type: "Natural",
        volumeCo2: 2.4,
        temperature: 20,
        period: 14,
        notes: ""
      },
      bottling: {
        name: "Standard Bottling",
        type: "Bottle",
        temperature: 20,
        period: 14,
        notes: ""
      }
    },
  });

  const formValues = form.watch();
  const { totalCost } = useRecipeCost(formValues);

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
        <Separator />
        <BoilSection form={form} />
        <Separator />
        <ClarificationSection form={form} />
        <Separator />
        <FermentationSection form={form} />
        <Separator />
        <ColdCrashSection form={form} />
        <Separator />
        <CarbonationSection form={form} />
        <Separator />
        <BottlingSection form={form} />
        
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">
            Total Recipe Cost: ${totalCost.toFixed(2)}
          </div>
          <Button type="submit">Create Recipe</Button>
        </div>
      </form>
    </Form>
  );
}
