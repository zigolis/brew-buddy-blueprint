
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
      <div className="space-y-8">
        <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:justify-between md:items-center">
          <div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/recipes')}
              className="mb-3 animate-fade-in"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Recipes
            </Button>
            <h1 className="text-3xl font-extrabold tracking-tight mb-1">{recipe.name || "Unnamed Recipe"}</h1>
            <div className="flex gap-2 mt-1">
              {recipe.tags?.map((tag) =>
                <Badge variant="outline" key={tag} className="bg-muted/70 border">{tag}</Badge>
              )}
            </div>
          </div>
          <div className="flex gap-2 self-end">
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

        <div className="grid gap-8 md:grid-cols-2">
          {/* Recipe Details */}
          <Card className="shadow-xl rounded-2xl border-0 card-gradient">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Beer className="h-5 w-5 text-brewing-amber" />
                Recipe Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                <div>
                  <div className="font-semibold text-muted-foreground">Author</div>
                  <div>{recipe.author || "Unknown"}</div>
                </div>
                <div>
                  <div className="font-semibold text-muted-foreground">Style</div>
                  <div className="flex flex-col gap-0.5">
                    <span>{recipe.style?.name || "No style"}</span>
                    <span className="text-xs text-muted-foreground">{recipe.style?.category}</span>
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-muted-foreground">Type</div>
                  <Badge className="bg-brewing-amber/20 text-brewing-amber capitalize">{recipe.type || "Not specified"}</Badge>
                </div>
                <div>
                  <div className="font-semibold text-muted-foreground">Batch Size</div>
                  <Badge className="bg-muted border">{recipe.batchSize || 0} L</Badge>
                </div>
                <div>
                  <div className="font-semibold text-muted-foreground">Boil Time</div>
                  <Badge className="bg-muted border">{recipe.boilTime || 0} min</Badge>
                </div>
                <div>
                  <div className="font-semibold text-muted-foreground">Efficiency</div>
                  <Badge className="bg-brewing-hops/10 text-brewing-hops">{recipe.efficiency || 0}%</Badge>
                </div>
                <div>
                  <div className="font-semibold text-muted-foreground">Original Gravity (OG)</div>
                  <Badge variant="outline">{recipe.originalGravity || "Not specified"}</Badge>
                </div>
                <div>
                  <div className="font-semibold text-muted-foreground">Final Gravity (FG)</div>
                  <Badge variant="outline">{recipe.finalGravity || "Not specified"}</Badge>
                </div>
                <div>
                  <div className="font-semibold text-muted-foreground">ABV</div>
                  <Badge className="bg-brewing-copper/20 text-brewing-copper">
                    {recipe.abv ? `${recipe.abv}%` : "Not specified"}
                  </Badge>
                </div>
                <div>
                  <div className="font-semibold text-muted-foreground">Estimated Cost</div>
                  <Badge className="bg-brewing-brown/20 text-brewing-brown">
                    ${recipe.estimatedCost?.toFixed(2) || "0.00"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ingredients */}
          <Card className="shadow-xl rounded-2xl border-0 card-gradient">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-brewing-hops" />
                Ingredients
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-7">
              {Array.isArray(recipe.ingredients?.fermentables) && recipe.ingredients.fermentables.length > 0 && (
                <section>
                  <div className="font-semibold mb-2 text-brewing-malt">Fermentables</div>
                  <table className="w-full text-sm mb-4 rounded-md overflow-hidden">
                    <thead className="text-muted-foreground bg-muted">
                      <tr>
                        <th className="px-3 py-1 text-left">Name</th>
                        <th className="px-3 py-1 text-left">Amount (kg)</th>
                        <th className="px-3 py-1 text-left">Color (°L)</th>
                        <th className="px-3 py-1 text-left">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recipe.ingredients.fermentables.map((f, i) => (
                        <tr key={f.id || `fermentable-${i}`} className="hover:bg-muted/60">
                          <td className="px-3 py-1">{f.name || "Unnamed"}</td>
                          <td className="px-3 py-1">{f.amount || 0}</td>
                          <td className="px-3 py-1">{f.color || 0}</td>
                          <td className="px-3 py-1 text-xs">{f.notes || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              )}

              {Array.isArray(recipe.ingredients?.hops) && recipe.ingredients.hops.length > 0 && (
                <section>
                  <div className="font-semibold mb-2 text-brewing-hops">Hops</div>
                  <table className="w-full text-sm mb-4 rounded-md overflow-hidden">
                    <thead className="text-muted-foreground bg-muted">
                      <tr>
                        <th className="px-2 py-1">Name</th>
                        <th className="px-2 py-1">Alpha %</th>
                        <th className="px-2 py-1">Beta %</th>
                        <th className="px-2 py-1">Form</th>
                        <th className="px-2 py-1">Amount (kg)</th>
                        <th className="px-2 py-1">Time (min)</th>
                        <th className="px-2 py-1">Use</th>
                        <th className="px-2 py-1">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recipe.ingredients.hops.map((h, i) => (
                        <tr key={h.id || `hop-${i}`} className="hover:bg-muted/60">
                          <td className="px-2 py-1">{h.name || "Unnamed"}</td>
                          <td className="px-2 py-1">{h.alpha ?? '-'}</td>
                          <td className="px-2 py-1">{h.beta ?? '-'}</td>
                          <td className="px-2 py-1">{h.form ?? '-'}</td>
                          <td className="px-2 py-1">{h.amount || 0}</td>
                          <td className="px-2 py-1">{h.time ?? '-'}</td>
                          <td className="px-2 py-1">{h.use || '-'}</td>
                          <td className="px-2 py-1">{h.notes || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              )}

              {Array.isArray(recipe.ingredients?.yeasts) && recipe.ingredients.yeasts.length > 0 && (
                <section>
                  <div className="font-semibold mb-2 text-brewing-wheat">Yeast</div>
                  <table className="w-full text-sm mb-4 rounded-md overflow-hidden">
                    <thead className="text-muted-foreground bg-muted">
                      <tr>
                        <th className="px-2 py-1">Name</th>
                        <th className="px-2 py-1">Lab</th>
                        <th className="px-2 py-1">Product</th>
                        <th className="px-2 py-1">Type</th>
                        <th className="px-2 py-1">Form</th>
                        <th className="px-2 py-1">Flocculation</th>
                        <th className="px-2 py-1">Temp (°C)</th>
                        <th className="px-2 py-1">Attenuation (%)</th>
                        <th className="px-2 py-1">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recipe.ingredients.yeasts.map((y, i) => (
                        <tr key={y.id || `yeast-${i}`} className="hover:bg-muted/60">
                          <td className="px-2 py-1 font-semibold">{y.name || "Unnamed"}</td>
                          <td className="px-2 py-1">{y.laboratory || "-"}</td>
                          <td className="px-2 py-1">{y.productId || "-"}</td>
                          <td className="px-2 py-1">{y.type || "-"}</td>
                          <td className="px-2 py-1">{y.form || "-"}</td>
                          <td className="px-2 py-1">{y.flocculation || "-"}</td>
                          <td className="px-2 py-1">
                            {y.tempRange ? `${y.tempRange.min}–${y.tempRange.max}` : "-"}
                          </td>
                          <td className="px-2 py-1">
                            {typeof y.minAttenuation === "number" && typeof y.maxAttenuation === "number"
                              ? `${y.minAttenuation}–${y.maxAttenuation}`
                              : "-"}
                          </td>
                          <td className="px-2 py-1 text-xs">{y.notes || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              )}

              {Array.isArray(recipe.ingredients?.miscs) && recipe.ingredients.miscs.length > 0 && (
                <section>
                  <div className="font-semibold mb-2 text-brewing-copper">Miscellaneous</div>
                  <table className="w-full text-sm mb-4 rounded-md overflow-hidden">
                    <thead className="text-muted-foreground bg-muted">
                      <tr>
                        <th className="px-2 py-1">Name</th>
                        <th className="px-2 py-1">Amount</th>
                        <th className="px-2 py-1">Unit</th>
                        <th className="px-2 py-1">Time (min)</th>
                        <th className="px-2 py-1">Use</th>
                        <th className="px-2 py-1">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recipe.ingredients.miscs.map((m, i) => (
                        <tr key={m.id || `misc-${i}`} className="hover:bg-muted/60">
                          <td className="px-2 py-1">{m.name || "Unnamed"}</td>
                          <td className="px-2 py-1">{m.amount || 0}</td>
                          <td className="px-2 py-1">{m.unit || "-"}</td>
                          <td className="px-2 py-1">{m.time || 0}</td>
                          <td className="px-2 py-1">{m.use || "-"}</td>
                          <td className="px-2 py-1 text-xs">{m.notes || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              )}

              {(!recipe.ingredients?.fermentables?.length && !recipe.ingredients?.hops?.length &&
                !recipe.ingredients?.yeasts?.length && !recipe.ingredients?.miscs?.length) && (
                <div className="text-muted-foreground">No ingredients added</div>
              )}
            </CardContent>
          </Card>

          {/* Brewing Process */}
          <Card className="md:col-span-2 shadow-xl rounded-2xl border-0 card-gradient">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-brewing-stout" />
                Brewing Process
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 mt-2">
              <div>
                <div className="font-semibold mb-1 text-md">Mash Schedule</div>
                {Array.isArray(recipe.mash?.steps) && recipe.mash.steps.length > 0 ? (
                  <ul className="list-disc pl-4 fade-in">
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
                  <div className="text-muted-foreground">No mash steps.</div>
                )}
              </div>

              <div>
                <div className="font-semibold mb-1 text-md">Fermentation</div>
                {recipe.fermentation?.steps && Array.isArray(recipe.fermentation.steps) && recipe.fermentation.steps.length > 0 ? (
                  <ul className="list-disc pl-4 fade-in">
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
                  <div className="text-muted-foreground">No fermentation info.</div>
                )}
              </div>

              <div>
                <div className="font-semibold mb-1 text-md">Boil</div>
                {recipe.boil ? (
                  <span>
                    {recipe.boil.name || "Standard Boil"}, {recipe.boil.time || 60} min, {recipe.boil.temperature || 100}°C
                  </span>
                ) : (
                  <div className="text-muted-foreground">No boil info.</div>
                )}
              </div>

              <div>
                <div className="font-semibold mb-1 text-md">Clarification</div>
                {recipe.clarification ? (
                  <span>
                    {recipe.clarification.name || "Standard Clarification"}, 
                    {recipe.clarification.type ? ` ${recipe.clarification.type},` : ""} 
                    {typeof recipe.clarification.amount !== "undefined" ? ` ${recipe.clarification.amount}g,` : ""} 
                    {typeof recipe.clarification.temperature !== "undefined" ? ` ${recipe.clarification.temperature}°C` : ""}
                  </span>
                ) : (
                  <div className="text-muted-foreground">No clarification info.</div>
                )}
              </div>

              <div>
                <div className="font-semibold mb-1 text-md">Cold Crash</div>
                {recipe.coldCrash ? (
                  <span>
                    {recipe.coldCrash.name || "Standard Cold Crash"}, 
                    {typeof recipe.coldCrash.temperature !== "undefined" ? ` ${recipe.coldCrash.temperature}°C,` : ""} 
                    {typeof recipe.coldCrash.period !== "undefined" ? ` ${recipe.coldCrash.period} hours` : ""}
                  </span>
                ) : (
                  <div className="text-muted-foreground">No cold crash info.</div>
                )}
              </div>

              <div>
                <div className="font-semibold mb-1 text-md">Carbonation</div>
                {recipe.carbonation ? (
                  <span>
                    {recipe.carbonation.name || "Standard Carbonation"}, 
                    {recipe.carbonation.type ? ` ${recipe.carbonation.type},` : ""} 
                    {typeof recipe.carbonation.volumeCo2 !== "undefined" ? ` ${recipe.carbonation.volumeCo2} CO₂,` : ""} 
                    {typeof recipe.carbonation.temperature !== "undefined" ? ` ${recipe.carbonation.temperature}°C,` : ""} 
                    {typeof recipe.carbonation.period !== "undefined" ? ` ${recipe.carbonation.period} days` : ""}
                  </span>
                ) : (
                  <div className="text-muted-foreground">No carbonation info.</div>
                )}
              </div>

              <div>
                <div className="font-semibold mb-1 text-md">Bottling</div>
                {recipe.bottling ? (
                  <span>
                    {recipe.bottling.name || "Standard Bottling"}, 
                    {recipe.bottling.type ? ` ${recipe.bottling.type},` : ""} 
                    {typeof recipe.bottling.temperature !== "undefined" ? ` ${recipe.bottling.temperature}°C,` : ""} 
                    {typeof recipe.bottling.period !== "undefined" ? ` ${recipe.bottling.period} days` : ""}
                  </span>
                ) : (
                  <div className="text-muted-foreground">No bottling info.</div>
                )}
              </div>

              <div>
                <div className="font-semibold mb-1 text-md">Water Profile</div>
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
                  <span className="text-muted-foreground">No water profile.</span>
                )}
              </div>

              {recipe.notes && (
                <div>
                  <div className="font-semibold mb-1 text-md">Other Notes</div>
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
