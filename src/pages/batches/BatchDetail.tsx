
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useBrewContext } from "@/contexts/BrewContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const MAX_RATING = 5;

const BatchDetail = () => {
  const { recipeId } = useParams();
  const { recipes, updateRecipe } = useBrewContext();
  const navigate = useNavigate();
  
  const recipe = recipes.find(r => r.id === recipeId);
  
  const [rating, setRating] = useState(recipe?.rating || 0);
  const [notes, setNotes] = useState(recipe?.brewingNotes || "");
  
  if (!recipe) {
    return (
      <Layout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Batch Not Found</h1>
          <p>The batch you are looking for does not exist.</p>
          <Button onClick={() => navigate("/batches")}>Back to Batches</Button>
        </div>
      </Layout>
    );
  }
  
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    updateRecipe(recipe.id, {
      ...recipe,
      rating: newRating
    });
    toast.success("Rating updated");
  };
  
  const handleSaveNotes = () => {
    updateRecipe(recipe.id, {
      ...recipe,
      brewingNotes: notes
    });
    toast.success("Brewing notes saved");
  };

  // Calculate differences between target and actual
  const calculateDifference = (target: number | null, actual: number | null) => {
    if (target === null || actual === null) return null;
    return ((actual - target) / target * 100).toFixed(1);
  };
  
  const originalGravityDiff = calculateDifference(recipe.originalGravity, recipe.actualOriginalGravity);
  const finalGravityDiff = calculateDifference(recipe.finalGravity, recipe.actualFinalGravity);
  const abvDiff = calculateDifference(recipe.abv, recipe.actualAbv);
  const ibuDiff = calculateDifference(recipe.ibu, recipe.actualIbu);
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <Link to="/batches">
              <Button variant="outline" size="sm" className="mb-2">
                <ChevronLeft className="mr-1 h-4 w-4" /> Back to Batches
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">{recipe.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge>{recipe.style?.name || "No style"}</Badge>
              <span className="text-muted-foreground">Brewed on {new Date(recipe.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            {[...Array(MAX_RATING)].map((_, i) => (
              <button
                key={i}
                onClick={() => handleRatingChange(i + 1)}
                className="focus:outline-none"
              >
                <Star
                  className={`h-6 w-6 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                />
              </button>
            ))}
          </div>
        </div>
        
        <Tabs defaultValue="summary">
          <TabsList>
            <TabsTrigger value="summary">Batch Summary</TabsTrigger>
            <TabsTrigger value="notes">Brewing Notes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Batch Results</CardTitle>
                <CardDescription>Comparison between target and actual values</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Original Gravity</h3>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-muted-foreground">Target</span>
                      <span className="font-medium">{recipe.originalGravity || "N/A"}</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-muted-foreground">Actual</span>
                      <span className="font-medium">{recipe.actualOriginalGravity || "N/A"}</span>
                    </div>
                    {originalGravityDiff && (
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Difference</span>
                        <span className={`font-medium ${Number(originalGravityDiff) > 0 ? 'text-green-500' : Number(originalGravityDiff) < 0 ? 'text-red-500' : ''}`}>
                          {originalGravityDiff}%
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Final Gravity</h3>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-muted-foreground">Target</span>
                      <span className="font-medium">{recipe.finalGravity || "N/A"}</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-muted-foreground">Actual</span>
                      <span className="font-medium">{recipe.actualFinalGravity || "N/A"}</span>
                    </div>
                    {finalGravityDiff && (
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Difference</span>
                        <span className={`font-medium ${Number(finalGravityDiff) > 0 ? 'text-green-500' : Number(finalGravityDiff) < 0 ? 'text-red-500' : ''}`}>
                          {finalGravityDiff}%
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">ABV</h3>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-muted-foreground">Target</span>
                      <span className="font-medium">{recipe.abv ? `${recipe.abv}%` : "N/A"}</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-muted-foreground">Actual</span>
                      <span className="font-medium">{recipe.actualAbv ? `${recipe.actualAbv}%` : "N/A"}</span>
                    </div>
                    {abvDiff && (
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Difference</span>
                        <span className={`font-medium ${Number(abvDiff) > 0 ? 'text-green-500' : Number(abvDiff) < 0 ? 'text-red-500' : ''}`}>
                          {abvDiff}%
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">IBU</h3>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-muted-foreground">Target</span>
                      <span className="font-medium">{recipe.ibu || "N/A"}</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-muted-foreground">Actual</span>
                      <span className="font-medium">{recipe.actualIbu || "N/A"}</span>
                    </div>
                    {ibuDiff && (
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Difference</span>
                        <span className={`font-medium ${Number(ibuDiff) > 0 ? 'text-green-500' : Number(ibuDiff) < 0 ? 'text-red-500' : ''}`}>
                          {ibuDiff}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notes">
            <Card>
              <CardHeader>
                <CardTitle>Brewing Notes</CardTitle>
                <CardDescription>Record your observations and experiences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Enter your brewing notes, observations, and what you might change next time..."
                    className="min-h-[200px]"
                  />
                  <Button onClick={handleSaveNotes}>Save Notes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default BatchDetail;
