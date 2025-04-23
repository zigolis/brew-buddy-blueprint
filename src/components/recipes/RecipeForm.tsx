
import { useForm } from "react-hook-form";
import { Recipe } from "@/types";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { GeneralInfoSection } from "./form/GeneralInfoSection";
import { RecipeStatsSection } from "./form/RecipeStatsSection";
import { RecipeStatsNotesField } from "./form/RecipeStatsNotesField";
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
      recipeStats: { notes: "" },
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

  const sectionsToRender = visibleSections && visibleSections.length > 0 
    ? Object.entries(sectionComponents).filter(([key]) => visibleSections.includes(key))
    : Object.entries(sectionComponents);

  // Check if we're on specific steps
  const isOnFermentationStep = visibleSections?.includes('fermentation');
  const isOnCarbonationStep = visibleSections?.includes('carbonation');
  
  return (
    <Form {...form}>
      <form id="recipe-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        {sectionsToRender.map(([key, Component]) => (
          <div key={key} className="bg-background p-6 rounded-lg shadow-sm mb-8">
            <Component form={form} />
            {key === 'stats' && <RecipeStatsNotesField form={form} />}
          </div>
        ))}
        
        {isOnCarbonationStep && (
          <div className="flex justify-end pt-4">
            <Button type="submit">
              Create Recipe
            </Button>
          </div>
        )}
        
        {/* Show save button on the edit page */}
        {!visibleSections && (
          <div className="flex justify-end pt-4">
            <Button type="submit">
              Save Recipe
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};
