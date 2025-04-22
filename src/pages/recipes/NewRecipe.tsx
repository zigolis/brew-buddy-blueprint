
import { Layout } from "@/components/layout/Layout";
import { RecipeForm } from "@/components/recipes/RecipeForm";
import { toast } from "sonner";
import { useBrewContext } from "@/contexts/BrewContext";
import { useNavigate } from "react-router-dom";
import { Recipe } from "@/types";
import { v4 as uuidv4 } from "uuid";

const NewRecipe = () => {
  const { addRecipe } = useBrewContext();
  const navigate = useNavigate();

  const handleCreateRecipe = (formData: Partial<Recipe>) => {
    try {
      // Initialize default values for required fields
      const defaultStyle = {
        name: "Generic Ale",
        category: "Other",
        categoryNumber: "0",
        styleLetter: "A",
        styleGuide: "Custom",
        type: "Ale" as const,
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

      const defaultIngredients = {
        fermentables: [],
        hops: [],
        yeasts: [],
        miscs: []
      };

      const defaultMash = {
        name: "Single Infusion",
        grainTemp: 20,
        mashTemp: 67,
        spargeTemp: 76,
        ph: 5.4,
        steps: [{
          name: "Mash In",
          type: "Infusion" as const,
          temperature: 67,
          time: 60
        }],
        notes: ""
      };

      const defaultFermentation = {
        name: "Ale",
        type: "Primary" as const,
        temperature: 20,
        period: 14,
        notes: "",
        steps: [{
          name: "Primary",
          temperature: 20,
          time: 14
        }]
      };

      const defaultWaterProfile = {
        name: "Default",
        calcium: 0,
        magnesium: 0,
        sodium: 0,
        chloride: 0,
        sulfate: 0,
        bicarbonate: 0,
        ph: 7.0,
        notes: ""
      };

      const newRecipe: Recipe = {
        ...formData,
        id: uuidv4(),
        style: formData.style || defaultStyle,
        ingredients: formData.ingredients || defaultIngredients,
        mash: formData.mash || defaultMash,
        fermentation: formData.fermentation || defaultFermentation,
        waterProfile: formData.waterProfile || defaultWaterProfile,
        boil: formData.boil || {
          name: "Standard Boil",
          time: 60,
          temperature: 100
        },
        clarification: formData.clarification || {
          name: "Standard Clarification",
          type: "Whirlpool",
          amount: 0,
          temperature: 20,
          notes: ""
        },
        coldCrash: formData.coldCrash || {
          name: "Standard Cold Crash",
          type: "Standard",
          temperature: 2,
          period: 48,
          notes: ""
        },
        carbonation: formData.carbonation || {
          name: "Standard Carbonation",
          type: "Natural",
          volumeCo2: 2.4,
          temperature: 20,
          period: 14,
          notes: ""
        },
        bottling: formData.bottling || {
          name: "Standard Bottling",
          type: "Bottle",
          temperature: 20,
          period: 14,
          notes: ""
        },
        estimatedCost: 0,
        tags: formData.tags || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Recipe;

      addRecipe(newRecipe);
      toast.success("Recipe created successfully!");
      navigate("/recipes");
    } catch (error) {
      console.error("Error creating recipe:", error);
      toast.error("Failed to create recipe. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Create New Recipe</h1>
          <p className="text-muted-foreground">
            Create a new beer recipe by filling out the form below
          </p>
        </div>
        <RecipeForm onSubmit={handleCreateRecipe} />
      </div>
    </Layout>
  );
};

export default NewRecipe;
