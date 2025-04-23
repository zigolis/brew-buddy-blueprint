
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useBrewContext } from "@/contexts/BrewContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Search, Database, Edit, Trash2, FlaskConical, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const RecipeList = () => {
  const { recipes, deleteRecipe } = useBrewContext();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [recipeType, setRecipeType] = useState("all");

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          recipe.style?.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (recipeType === "all") return matchesSearch;
    if (recipeType === "brewed") return matchesSearch && recipe.isBrewed;
    if (recipeType === "unbrewed") return matchesSearch && !recipe.isBrewed;
    
    return matchesSearch;
  });

  const handleDelete = (id: string) => {
    deleteRecipe(id);
  };

  const handleBrew = (id: string) => {
    navigate(`/batches/${id}`);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Recipes</h1>
            <p className="text-muted-foreground">Manage your brewing recipes</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/import">
              <Button variant="outline">
                <Database className="mr-2 h-4 w-4" />
                Import Recipe
              </Button>
            </Link>
            <Link to="/recipes/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Recipe
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative w-full sm:w-auto flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search recipes..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={recipeType === "all" ? "default" : "outline"}
              onClick={() => setRecipeType("all")}
              className="flex-1 sm:flex-none"
            >
              All
            </Button>
            <Button
              variant={recipeType === "brewed" ? "default" : "outline"}
              onClick={() => setRecipeType("brewed")}
              className="flex-1 sm:flex-none"
            >
              Brewed
            </Button>
            <Button
              variant={recipeType === "unbrewed" ? "default" : "outline"}
              onClick={() => setRecipeType("unbrewed")}
              className="flex-1 sm:flex-none"
            >
              Unbrewed
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <Card key={recipe.id} className="flex flex-col hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between items-start">
                    <Link to={`/recipes/${recipe.id}`} className="hover:underline">
                      {recipe.name}
                    </Link>
                    {recipe.isBrewed && (
                      <Badge variant="secondary">Brewed</Badge>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {recipe.style?.name || "Unknown Style"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm">
                      <div className="text-muted-foreground">ABV</div>
                      <div>{recipe.abv ? `${recipe.abv}%` : "N/A"}</div>
                    </div>
                    <div className="text-sm">
                      <div className="text-muted-foreground">IBU</div>
                      <div>{recipe.ibu || "N/A"}</div>
                    </div>
                    <div className="text-sm">
                      <div className="text-muted-foreground">Batch Size</div>
                      <div>{recipe.batchSize}L</div>
                    </div>
                    <div className="text-sm">
                      <div className="text-muted-foreground">Type</div>
                      <div>{recipe.type}</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <div className="flex justify-end w-full gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate(`/recipes/${recipe.id}`)}
                      title="View Recipe"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate(`/recipes/edit/${recipe.id}`)}
                      title="Edit Recipe"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(recipe.id)}
                      title="Delete Recipe"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleBrew(recipe.id)}
                      title="Brew Recipe"
                    >
                      <FlaskConical className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center p-12 bg-muted/30 rounded-lg border border-dashed">
              <h3 className="text-xl font-medium mb-2">No Recipes Found</h3>
              <p className="mb-4 text-muted-foreground text-center">
                {searchTerm ? "No recipes match your search" : "Start by adding a new recipe"}
              </p>
              <Link to="/recipes/new">
                <Button>Create Recipe</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default RecipeList;
