import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useBrewContext } from "@/contexts/BrewContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const BatchesList = () => {
  const { recipes } = useBrewContext();
  const [searchQuery, setSearchQuery] = useState("");
  const brewedRecipes = recipes.filter(recipe => recipe.isBrewed);

  const filteredRecipes = brewedRecipes.filter(recipe => 
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.style?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Batches</h1>
            <p className="text-muted-foreground">Track and manage your brewed recipes</p>
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search batches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.length > 0 ? (
            brewedRecipes.map((recipe) => {
              // Calculate time since brewing
              const brewDate = new Date(recipe.updatedAt);
              const timeSince = formatDistanceToNow(brewDate, { addSuffix: true });
              
              return (
                <Card key={recipe.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex justify-between items-start">
                      <Link to={`/batches/${recipe.id}`} className="hover:underline">
                        {recipe.name}
                      </Link>
                      <Badge>{recipe.style?.name || "No style"}</Badge>
                    </CardTitle>
                    <CardDescription>Brewed {timeSince}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="text-sm">
                        <div className="text-muted-foreground">Batch Size</div>
                        <div>{recipe.batchSize}L</div>
                      </div>
                      <div className="text-sm">
                        <div className="text-muted-foreground">ABV</div>
                        <div>{recipe.abv ? `${recipe.abv}%` : "N/A"}</div>
                      </div>
                      <div className="text-sm">
                        <div className="text-muted-foreground">IBU</div>
                        <div>{recipe.ibu || "N/A"}</div>
                      </div>
                      <div className="text-sm">
                        <div className="text-muted-foreground">Est. Cost</div>
                        <div>
                          {recipe.estimatedCost 
                            ? `$${recipe.estimatedCost.toFixed(2)}` 
                            : "N/A"}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Link to={`/batches/${recipe.id}`}>
                        <Button variant="outline" size="sm">View Details</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center p-12 bg-muted/30 rounded-lg border border-dashed">
              <h3 className="text-xl font-medium mb-2">No Batches Found</h3>
              <p className="mb-4 text-muted-foreground text-center">
                Start brewing recipes to track your batches
              </p>
              <Link to="/brewing-guide">
                <Button>Start Brewing</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BatchesList;
