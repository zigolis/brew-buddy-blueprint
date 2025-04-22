import { useForm } from "react-hook-form";
import { Recipe } from "@/types";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { GeneralInfoSection } from "./form/GeneralInfoSection";
import { RecipeStatsSection } from "./form/RecipeStatsSection";
import { FermentablesSection } from "./form/fermentables/FermentablesSection";
import HopsSection from "./form/HopsSection"; 
import { YeastSection } from "./form/YeastSection";
import { MashScheduleSection } from "./form/MashScheduleSection";
import { BoilSection } from "./form/BoilSection";
import { ClarificationSection } from "./form/ClarificationSection";
import { FermentationSection } from "./form/FermentationSection";
import { ColdCrashSection } from "./form/ColdCrashSection";
import { CarbonationSection } from "./form/CarbonationSection";
import { BottlingSection } from "./form/BottlingSection";
import { useRecipeCost } from "@/hooks/useRecipeCost";
import { useEffect } from "react";

interface RecipeFormProps {
  onSubmit: (data: Partial<Recipe>) => void;
  initialData?: Partial<Recipe>;
  visibleSections?: string[];
}

const sectionComponents = {
  general: GeneralInfoSection,
  stats: RecipeStatsSection,
  fermentables: FermentablesSection,
  hops: HopsSection,
  yeast: YeastSection,
  mash: MashScheduleSection,
  boil: BoilSection,
  clarification: ClarificationSection,
  fermentation: FermentationSection,
  coldCrash: ColdCrashSection,
  carbonation: CarbonationSection,
  bottling: BottlingSection,
};

export function RecipeForm({ onSubmit, initialData, visibleSections }: RecipeFormProps) {
  const form = useForm<Partial<Recipe>>({
    defaultValues: initialData || {
      name: "",
      author: "",
      type: "All Grain",
      batchSize: 20,
      boilSize: 23,
      boilTime: 60,
      efficiency: 75,
      originalGravity: null,
      finalGravity: null,
      abv: null,
      notes: "",
      style: { name: "" },
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

  useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach(key => {
        form.setValue(key as any, initialData[key as keyof typeof initialData]);
      });
    }
  }, [initialData, form]);

  const formValues = form.watch();
  const { totalCost } = useRecipeCost(formValues);

  const sectionsToRender = visibleSections && visibleSections.length > 0 
    ? Object.entries(sectionComponents).filter(([key]) => visibleSections.includes(key))
    : Object.entries(sectionComponents);

  return (
    <Form {...form}>
      <form
        id="recipe-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 px-1 md:px-8 py-8 bg-muted/30 rounded-2xl shadow-md max-w-5xl mx-auto"
      >
        {sectionsToRender.map(([key, Component], sectionIdx) => (
          <div
            key={key}
            className={`p-4 md:p-8 bg-background/80 rounded-xl space-y-8 shadow-md ${
              sectionIdx !== 0 ? "mt-12" : ""
            }`}
          >
            <Component form={form} />
          </div>
        ))}

        {(visibleSections?.includes('bottling') || !visibleSections) && (
          <div className="flex flex-col md:flex-row justify-between items-center pt-6 gap-6">
            <div className="text-lg font-semibold text-center md:text-left">
              Total Recipe Cost: <span className="text-primary">${totalCost.toFixed(2)}</span>
            </div>
            <Button
              type="submit"
              className="w-full md:w-auto px-10 py-3 rounded-lg text-lg font-bold shadow bg-primary hover:bg-primary/90 mt-2"
            >
              {visibleSections?.includes('bottling') ? 'Create Recipe' : 'Save and Continue'}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
