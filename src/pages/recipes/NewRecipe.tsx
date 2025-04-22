
import { Layout } from "@/components/layout/Layout";
import { RecipeForm } from "@/components/recipes/RecipeForm";
import { toast } from "sonner";
import { useBrewContext } from "@/contexts/BrewContext";
import { useNavigate } from "react-router-dom";
import { Recipe } from "@/types/beer";
import { v4 as uuidv4 } from "uuid";

const NewRecipe = () => {
  const { addRecipe } = useBrewContext();
  const navigate = useNavigate();

  const handleCreateRecipe = (formData: Partial<Recipe>) => {
    try {
      const newRecipe: Recipe = {
        ...formData,
        id: uuidv4(),
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
