
import { useBrewContext } from "@/contexts/BrewContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { Recipe, Style } from "@/types";

const defaultStyle: Style = {
  name: "",
  category: "",
  categoryNumber: "",
  styleLetter: "",
  styleGuide: "",
  type: "Ale",
  minOg: 1.045,
  maxOg: 1.060,
  minFg: 1.010,
  maxFg: 1.015,
  minIbu: 20,
  maxIbu: 40,
  minColor: 5,
  maxColor: 15,
  minAbv: 4.5,
  maxAbv: 6.0,
  notes: "",
  profile: "",
  ingredients: "",
  examples: ""
};

export const useCreateRecipe = (recipeFormData, setRecipeFormData) => {
  const { addRecipe } = useBrewContext();
  const navigate = useNavigate();

  const handleStepFormSubmit = (stepData: Partial<Recipe>, currentStep: number, setCurrentStep: (n:number)=>void, recipeSteps) => {
    setRecipeFormData((prev: any) => ({
      ...prev,
      ...stepData,
    }));
    if (currentStep < recipeSteps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handleCreateRecipe = (formData: Partial<Recipe>) => {
    try {
      const completeFormData = {
        ...recipeFormData,
        ...formData
      };

      // Handle style merge and defaults
      const recipeName = completeFormData.name?.trim() ? completeFormData.name : "New Recipe";
      const recipeAuthor = completeFormData.author?.trim() ? completeFormData.author : "Anonymous";
      const styleName = completeFormData.style?.name?.trim() ? completeFormData.style.name : "Generic Ale";

      const newRecipe: Recipe = {
        id: uuidv4(),
        name: recipeName,
        author: recipeAuthor,
        type: completeFormData.type || "All Grain",
        batchSize: completeFormData.batchSize || 20,
        boilSize: completeFormData.boilSize || 23,
        boilTime: completeFormData.boilTime || 60,
        efficiency: completeFormData.efficiency || 75,
        originalGravity: completeFormData.originalGravity || null,
        finalGravity: completeFormData.finalGravity || null,
        abv: completeFormData.abv || null,
        notes: completeFormData.notes || "",
        style: completeFormData.style
          ? { ...defaultStyle, ...completeFormData.style }
          : { ...defaultStyle, name: styleName },
        ingredients: completeFormData.ingredients || {
          fermentables: [],
          hops: [],
          yeasts: [],
          miscs: []
        },
        mash: completeFormData.mash || {
          name: "Single Infusion",
          grainTemp: 20,
          mashTemp: 67,
          spargeTemp: 76,
          ph: 5.4,
          steps: [
            {
              name: "Mash In",
              type: "Infusion",
              temperature: 67,
              time: 60,
            }
          ],
          notes: ""
        },
        fermentation: completeFormData.fermentation || {
          name: "Ale",
          type: "Primary",
          temperature: 20,
          period: 14,
          notes: "",
          steps: [
            {
              name: "Primary",
              temperature: 20,
              time: 14,
            },
          ]
        },
        waterProfile: completeFormData.waterProfile || {
          name: "Default",
          calcium: 0,
          magnesium: 0,
          sodium: 0,
          chloride: 0,
          sulfate: 0,
          bicarbonate: 0,
          ph: 7.0,
          notes: ""
        },
        boil: completeFormData.boil || {
          name: "Standard Boil",
          time: 60,
          temperature: 100
        },
        clarification: completeFormData.clarification || {
          name: "Standard Clarification",
          type: "Whirlpool",
          amount: 0,
          temperature: 20,
          notes: ""
        },
        coldCrash: completeFormData.coldCrash || {
          name: "Standard Cold Crash",
          type: "Standard",
          temperature: 2,
          period: 48,
          notes: ""
        },
        carbonation: completeFormData.carbonation || {
          name: "Standard Carbonation",
          type: "Natural",
          volumeCo2: 2.4,
          temperature: 20,
          period: 14,
          notes: ""
        },
        bottling: completeFormData.bottling || {
          name: "Standard Bottling",
          type: "Bottle",
          temperature: 20,
          period: 14,
          notes: ""
        },
        estimatedCost: 0,
        tags: completeFormData.tags || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      addRecipe(newRecipe);
      toast.success(`Recipe "${recipeName}" created successfully!`);
      navigate("/recipes");
    } catch (err) {
      toast.error("Failed to create recipe. Please try again.");
    }
  };

  return {
    handleStepFormSubmit,
    handleCreateRecipe,
  };
};
