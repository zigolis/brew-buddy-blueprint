
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useBrewContext } from "@/contexts/BrewContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Beer, Package, FileText, BookmarkPlus, BookmarkCheck, ArrowLeft, Edit } from "lucide-react";

export function ViewRecipe() {
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
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/recipes')}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Recipes
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => navigate(`/recipes/edit/${recipe.id}`)}
              >
                <Edit className="h-5 w-5 mr-2" />
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
          <h1 className="text-3xl font-bold">{recipe.name || "Unnamed Recipe"}</h1>
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
                <div>{recipe.author || "Unknown"}</div>
              </div>
              <div>
                <div className="font-semibold">Style</div>
                <div>{recipe.style?.name || "No style"}</div>
              </div>
              <div>
                <div className="font-semibold">Type</div>
                <div>{recipe.type || "Not specified"}</div>
              </div>
              <div>
                <div className="font-semibold">Batch Size</div>
                <div>{recipe.batchSize || 0} liters</div>
              </div>
              <div>
                <div className="font-semibold">Boil Time</div>
                <div>{recipe.boilTime || 0} minutes</div>
              </div>
              <div>
                <div className="font-semibold">Efficiency</div>
                <div>{recipe.efficiency || 0}%</div>
              </div>
              <div>
                <div className="font-semibold">Original Gravity (OG)</div>
                <div>{recipe.originalGravity || "Not specified"}</div>
              </div>
              <div>
                <div className="font-semibold">Final Gravity (FG)</div>
                <div>{recipe.finalGravity || "Not specified"}</div>
              </div>
              <div>
                <div className="font-semibold">ABV</div>
                <div>{recipe.abv ? `${recipe.abv}%` : "Not specified"}</div>
              </div>
              <div>
                <div className="font-semibold">Estimated Cost</div>
                <div>${recipe.estimatedCost?.toFixed(2) || "0.00"}</div>
              </div>
              <div>
                <div className="font-semibold">Tags</div>
                <div>{recipe.tags?.length ? recipe.tags.join(", ") : "No tags"}</div>
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
              {Array.isArray(recipe.ingredients?.fermentables) && recipe.ingredients.fermentables.length > 0 && (
                <div>
                  <div className="font-semibold mb-2">Fermentables</div>
                  <ul className="list-disc pl-4 space-y-1">
                    {recipe.ingredients.fermentables.map((f, i) => (
                      <li key={f.id || `fermentable-${i}`}>
                        {f.name || "Unnamed"} - {f.amount || 0}kg
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {Array.isArray(recipe.ingredients?.hops) && recipe.ingredients.hops.length > 0 && (
                <div>
                  <div className="font-semibold mb-2">Hops</div>
                  <ul className="list-disc pl-4 space-y-1">
                    {recipe.ingredients.hops.map((h, i) => (
                      <li key={h.id || `hop-${i}`}>
                        {h.name || "Unnamed"} - {h.amount || 0}kg ({h.use || "boil"}, {h.time || 0} min)
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {Array.isArray(recipe.ingredients?.yeasts) && recipe.ingredients.yeasts.length > 0 && (
                <div>
                  <div className="font-semibold mb-2">Yeast</div>
                  <ul className="list-disc pl-4 space-y-1">
                    {recipe.ingredients.yeasts.map((y, i) => (
                      <li key={y.id || `yeast-${i}`}>
                        {y.name || "Unnamed"}
                        {y.laboratory ? ` (${y.laboratory}${y.productId ? ` ${y.productId}` : ""})` : ""}
                        {y.type ? ` - ${y.type}` : ""}
                        {y.form ? `, ${y.form}` : ""}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {Array.isArray(recipe.ingredients?.miscs) && recipe.ingredients.miscs.length > 0 && (
                <div>
                  <div className="font-semibold mb-2">Miscellaneous</div>
                  <ul className="list-disc pl-4 space-y-1">
                    {recipe.ingredients.miscs.map((m, i) => (
                      <li key={m.id || `misc-${i}`}>
                        {m.name || "Unnamed"} - {m.amount || 0} {m.unit || ""} ({m.use || "boil"}, {m.time || 0} min)
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {(!recipe.ingredients?.fermentables?.length && !recipe.ingredients?.hops?.length && 
                !recipe.ingredients?.yeasts?.length && !recipe.ingredients?.miscs?.length) && (
                <div className="text-muted-foreground">No ingredients added</div>
              )}
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Brewing Process
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="font-semibold mb-1">Mash Schedule</div>
                {Array.isArray(recipe.mash?.steps) && recipe.mash.steps.length > 0 ? (
                  <ul className="list-disc pl-4">
                    {recipe.mash.steps.map((step, i) => (
                      <li key={i}>
                        <span className="font-medium">{step.name || `Step ${i + 1}`}</span>
                        {step.type ? ` | ${step.type}` : ""}
                        {typeof step.temperature !== "undefined" ? `, ${step.temperature}°C` : ""}
                        {typeof step.time !== "undefined" ? `, ${step.time} min` : ""}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div>No mash steps.</div>
                )}
              </div>
              
              <div>
                <div className="font-semibold mb-1">Fermentation</div>
                {recipe.fermentation?.steps && Array.isArray(recipe.fermentation.steps) && recipe.fermentation.steps.length > 0 ? (
                  <ul className="list-disc pl-4">
                    {recipe.fermentation.steps.map((step, i) => (
                      <li key={i}>
                        <span className="font-medium">{step.name || `Step ${i + 1}`}</span>
                        {step.type ? ` | ${step.type}` : ""}
                        {typeof step.temperature !== "undefined" ? `, ${step.temperature}°C` : ""}
                        {typeof step.time !== "undefined" ? `, ${step.time} days` : ""}
                        {typeof step.period !== "undefined" ? `, period: ${step.period} days` : ""}
                        {step.notes ? ` – ${step.notes}` : ""}
                      </li>
                    ))}
                  </ul>
                ) : recipe.fermentation ? (
                  <div>
                    {recipe.fermentation.name || "Primary"}
                    {recipe.fermentation.type ? ` | ${recipe.fermentation.type}` : ""}
                    {typeof recipe.fermentation.temperature !== "undefined" ? `, ${recipe.fermentation.temperature}°C` : ""}
                    {typeof recipe.fermentation.period !== "undefined" ? `, ${recipe.fermentation.period} days` : ""}
                    {recipe.fermentation.notes ? ` – ${recipe.fermentation.notes}` : ""}
                  </div>
                ) : (
                  <div>No fermentation info.</div>
                )}
              </div>
              
              <div>
                <div className="font-semibold mb-1">Boil</div>
                {recipe.boil ? (
                  <span>
                    {recipe.boil.name || "Standard Boil"}, {recipe.boil.time || 60} min, {recipe.boil.temperature || 100}°C
                  </span>
                ) : (
                  <div>No boil info.</div>
                )}
              </div>
              
              <div>
                <div className="font-semibold mb-1">Clarification</div>
                {recipe.clarification ? (
                  <span>
                    {recipe.clarification.name || "Standard Clarification"}, 
                    {recipe.clarification.type ? ` ${recipe.clarification.type},` : ""} 
                    {typeof recipe.clarification.amount !== "undefined" ? ` ${recipe.clarification.amount}g,` : ""} 
                    {typeof recipe.clarification.temperature !== "undefined" ? ` ${recipe.clarification.temperature}°C` : ""}
                  </span>
                ) : (
                  <div>No clarification info.</div>
                )}
              </div>
              
              <div>
                <div className="font-semibold mb-1">Cold Crash</div>
                {recipe.coldCrash ? (
                  <span>
                    {recipe.coldCrash.name || "Standard Cold Crash"}, 
                    {typeof recipe.coldCrash.temperature !== "undefined" ? ` ${recipe.coldCrash.temperature}°C,` : ""} 
                    {typeof recipe.coldCrash.period !== "undefined" ? ` ${recipe.coldCrash.period} hours` : ""}
                  </span>
                ) : (
                  <div>No cold crash info.</div>
                )}
              </div>
              
              <div>
                <div className="font-semibold mb-1">Carbonation</div>
                {recipe.carbonation ? (
                  <span>
                    {recipe.carbonation.name || "Standard Carbonation"}, 
                    {recipe.carbonation.type ? ` ${recipe.carbonation.type},` : ""} 
                    {typeof recipe.carbonation.volumeCo2 !== "undefined" ? ` ${recipe.carbonation.volumeCo2} CO₂,` : ""} 
                    {typeof recipe.carbonation.temperature !== "undefined" ? ` ${recipe.carbonation.temperature}°C,` : ""} 
                    {typeof recipe.carbonation.period !== "undefined" ? ` ${recipe.carbonation.period} days` : ""}
                  </span>
                ) : (
                  <div>No carbonation info.</div>
                )}
              </div>
              
              <div>
                <div className="font-semibold mb-1">Bottling</div>
                {recipe.bottling ? (
                  <span>
                    {recipe.bottling.name || "Standard Bottling"}, 
                    {recipe.bottling.type ? ` ${recipe.bottling.type},` : ""} 
                    {typeof recipe.bottling.temperature !== "undefined" ? ` ${recipe.bottling.temperature}°C,` : ""} 
                    {typeof recipe.bottling.period !== "undefined" ? ` ${recipe.bottling.period} days` : ""}
                  </span>
                ) : (
                  <div>No bottling info.</div>
                )}
              </div>
              
              <div>
                <div className="font-semibold mb-1">Water Profile</div>
                {recipe.waterProfile ? (
                  <ul className="list-disc pl-4">
                    <li>
                      {Object.entries(recipe.waterProfile)
                        .filter(([k, _]) => k !== "name" && k !== "notes")
                        .map(([k, v]) => (
                          <span key={k} className="mr-3 capitalize">
                            {k}: {typeof v === "number" ? v : String(v)}
                          </span>
                        ))}
                    </li>
                    {recipe.waterProfile.notes && (
                      <li>Notes: {recipe.waterProfile.notes}</li>
                    )}
                  </ul>
                ) : (
                  <span>No water profile.</span>
                )}
              </div>
              
              {recipe.notes && (
                <div>
                  <div className="font-semibold mb-1">Other Notes</div>
                  <p className="whitespace-pre-wrap">{recipe.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

export default ViewRecipe;
