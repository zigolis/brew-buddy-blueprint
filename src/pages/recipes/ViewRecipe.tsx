
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useBrewContext } from "@/contexts/BrewContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Beer, Package, FileText, BookmarkPlus, BookmarkCheck } from "lucide-react";

const ViewRecipe = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const { recipes, toggleBookmark, isBookmarked } = useBrewContext();
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

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold">{recipe.name}</h1>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => navigate(`/recipes/edit/${recipe.id}`)}
              >
                Edit Recipe
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => toggleBookmark(recipe.id)}
                className="h-10 w-10"
              >
                {isBookmarked(recipe.id) ? (
                  <BookmarkCheck className="h-5 w-5" />
                ) : (
                  <BookmarkPlus className="h-5 w-5" />
                )}
                <span className="sr-only">
                  {isBookmarked(recipe.id) ? "Remove bookmark" : "Add bookmark"}
                </span>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Beer className="h-5 w-5" />
                Recipe Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="font-semibold">Author</div>
                <div>{recipe.author}</div>
              </div>
              <div>
                <div className="font-semibold">Style</div>
                <div>{recipe.style?.name || "No style"}</div>
              </div>
              <div>
                <div className="font-semibold">Type</div>
                <div>{recipe.type}</div>
              </div>
              <div>
                <div className="font-semibold">Batch Size</div>
                <div>{recipe.batchSize} liters</div>
              </div>
              <div>
                <div className="font-semibold">Boil Time</div>
                <div>{recipe.boilTime} minutes</div>
              </div>
              <div>
                <div className="font-semibold">Efficiency</div>
                <div>{recipe.efficiency}%</div>
              </div>
              <div>
                <div className="font-semibold">Estimated Cost</div>
                <div>${recipe.estimatedCost?.toFixed(2) || "N/A"}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Ingredients
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {recipe.ingredients.fermentables.length > 0 && (
                <div>
                  <div className="font-semibold mb-2">Fermentables</div>
                  <ul className="list-disc pl-4 space-y-1">
                    {recipe.ingredients.fermentables.map((f) => (
                      <li key={f.id}>
                        {f.name} - {f.amount}kg
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {recipe.ingredients.hops.length > 0 && (
                <div>
                  <div className="font-semibold mb-2">Hops</div>
                  <ul className="list-disc pl-4 space-y-1">
                    {recipe.ingredients.hops.map((h) => (
                      <li key={h.id}>
                        {h.name} - {h.amount}kg ({h.use}, {h.time} min)
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {recipe.ingredients.yeasts.length > 0 && (
                <div>
                  <div className="font-semibold mb-2">Yeast</div>
                  <ul className="list-disc pl-4 space-y-1">
                    {recipe.ingredients.yeasts.map((y) => (
                      <li key={y.id}>
                        {y.name} ({y.laboratory} {y.productId})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          {recipe.notes && (
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{recipe.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ViewRecipe;
