
import { Layout } from "@/components/layout/Layout";
import { RecipeForm } from "@/components/recipes/RecipeForm";
import { useBrewContext } from "@/contexts/BrewContext";
import { useNavigate, useParams } from "react-router-dom";
import { Recipe } from "@/types";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { X, Save } from "lucide-react";

const EditRecipe = () => {
  const { recipeId } = useParams();
  const { recipes, updateRecipe } = useBrewContext();
  const navigate = useNavigate();

  const recipe = recipes.find((r) => r.id === recipeId);

  if (!recipe) {
    return (
      <Layout>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Recipe Not Found</h1>
          <p>The recipe you're looking for doesn't exist.</p>
        </div>
      </Layout>
    );
  }

  const handleUpdateRecipe = (formData: Partial<Recipe>) => {
    try {
      const updatedRecipe = {
        ...recipe,
        ...formData,
        updatedAt: new Date().toISOString(),
      };
      
      updateRecipe(recipe.id, updatedRecipe as Recipe);
      toast.success("Recipe updated successfully!");
      navigate(`/recipes/${recipe.id}`);
    } catch (error) {
      console.error("Error updating recipe:", error);
      toast.error("Failed to update recipe. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate(`/recipes/${recipe.id}`);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Edit Recipe</h1>
            <p className="text-muted-foreground">
              Modify your recipe by updating the form below
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button form="recipe-form" type="submit">
              <Save className="mr-2 h-4 w-4" />
              Save Recipe
            </Button>
          </div>
        </div>
        <RecipeForm onSubmit={handleUpdateRecipe} initialData={recipe} />
      </div>
    </Layout>
  );
};

export default EditRecipe;
