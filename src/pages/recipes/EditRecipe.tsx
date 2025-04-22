
import { Layout } from "@/components/layout/Layout";
import { RecipeForm } from "@/components/recipes/RecipeForm";
import { useBrewContext } from "@/contexts/BrewContext";
import { useNavigate, useParams } from "react-router-dom";
import { Recipe } from "@/types";
import { toast } from "sonner";

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
      navigate("/recipes");
    } catch (error) {
      console.error("Error updating recipe:", error);
      toast.error("Failed to update recipe. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Edit Recipe</h1>
          <p className="text-muted-foreground">
            Modify your recipe by updating the form below
          </p>
        </div>
        <RecipeForm onSubmit={handleUpdateRecipe} initialData={recipe} />
      </div>
    </Layout>
  );
};

export default EditRecipe;
