
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
                <div className="font-semibold">Original Gravity (OG)</div>
                <div>{recipe.originalGravity}</div>
              </div>
              <div>
                <div className="font-semibold">Final Gravity (FG)</div>
                <div>{recipe.finalGravity}</div>
              </div>
              <div>
                <div className="font-semibold">ABV</div>
                <div>{recipe.abv}%</div>
              </div>
              <div>
                <div className="font-semibold">Estimated Cost</div>
                <div>${recipe.estimatedCost?.toFixed(2) || "N/A"}</div>
              </div>
              <div>
                <div className="font-semibold">Tags</div>
                <div>{recipe.tags?.join(", ")}</div>
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
                      <li key={f.id || f.name}>
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
                      <li key={h.id || h.name}>
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
                      <li key={y.id || y.name}>
                        {y.name} ({y.laboratory} {y.productId}) {y.type ? `- ${y.type}` : ""}, {y.form}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {recipe.ingredients.miscs && recipe.ingredients.miscs.length > 0 && (
                <div>
                  <div className="font-semibold mb-2">Miscellaneous</div>
                  <ul className="list-disc pl-4 space-y-1">
                    {recipe.ingredients.miscs.map((m) => (
                      <li key={m.id || m.name}>
                        {m.name} - {m.amount} {m.unit || ""} ({m.use}, {m.time} min)
                      </li>
                    ))}
                  </ul>
                </div>
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
                {recipe.mash?.steps?.length ? (
                  <ul className="list-disc pl-4">
                    {recipe.mash.steps.map((step, i) => (
                      <li key={i}>
                        <span className="font-medium">{step.name}</span> | {step.type}, {step.temperature}°C, {step.time ? `${step.time} min` : ''} 
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div>No mash steps.</div>
                )}
              </div>
              <div>
                <div className="font-semibold mb-1">Fermentation</div>
                {recipe.fermentation?.steps?.length ? (
                  <ul className="list-disc pl-4">
                    {recipe.fermentation.steps.map((step, i) => (
                      <li key={i}>
                        <span className="font-medium">{step.name}</span> | {step.temperature}°C, {step.time} days
                        {step.notes ? ` – ${step.notes}` : ""}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div>
                    {recipe.fermentation?.name
                      ? `${recipe.fermentation.name} | ${recipe.fermentation.type}, ${recipe.fermentation.temperature}°C, ${recipe.fermentation.period} days`
                      : "No fermentation info."}
                  </div>
                )}
              </div>
              <div>
                <div className="font-semibold mb-1">Boil</div>
                {recipe.boil && (
                  <span>
                    {recipe.boil.name}, {recipe.boil.time} min, {recipe.boil.temperature}°C
                  </span>
                )}
              </div>
              <div>
                <div className="font-semibold mb-1">Clarification</div>
                {recipe.clarification && (
                  <span>
                    {recipe.clarification.name}, {recipe.clarification.type}, {recipe.clarification.amount}g, {recipe.clarification.temperature}°C
                  </span>
                )}
              </div>
              <div>
                <div className="font-semibold mb-1">Cold Crash</div>
                {recipe.coldCrash && (
                  <span>
                    {recipe.coldCrash.name}, {recipe.coldCrash.temperature}°C, {recipe.coldCrash.period} hours
                  </span>
                )}
              </div>
              <div>
                <div className="font-semibold mb-1">Carbonation</div>
                {recipe.carbonation && (
                  <span>
                    {recipe.carbonation.name}, {recipe.carbonation.type}, {recipe.carbonation.volumeCo2} CO₂, {recipe.carbonation.temperature}°C, {recipe.carbonation.period} days
                  </span>
                )}
              </div>
              <div>
                <div className="font-semibold mb-1">Bottling</div>
                {recipe.bottling && (
                  <span>
                    {recipe.bottling.name}, {recipe.bottling.type}, {recipe.bottling.temperature}°C, {recipe.bottling.period} days
                  </span>
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
};

export default ViewRecipe;
