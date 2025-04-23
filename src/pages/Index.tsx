
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RecipeActivityChart } from "@/components/stats/RecipeActivityChart";
import { ModernActivityChart } from "@/components/stats/ModernActivityChart";
import { useBrewContext } from "@/contexts/BrewContext";
import { Link } from "react-router-dom";
import { Beer, FileText, Plus, Database } from "lucide-react";

export default function HomePage() {
  const { recipes } = useBrewContext();
  const totalRecipes = recipes.length;
  const brewedRecipes = recipes.filter(recipe => recipe.isBrewed).length;
  
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Your brewing activity overview</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Recipes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalRecipes}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Brewed Recipes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{brewedRecipes}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Ingredients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">-</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Equipment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">-</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recipe Activity</CardTitle>
              <CardDescription>Your recipe creation and brewing activity</CardDescription>
            </CardHeader>
            <CardContent>
              <ModernActivityChart data={recipes} />
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link to="/recipes/new">
                  <Button className="w-full" variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    New Recipe
                  </Button>
                </Link>
                <Link to="/brewing-guide">
                  <Button className="w-full" variant="outline">
                    <Beer className="mr-2 h-4 w-4" />
                    Start Brewing
                  </Button>
                </Link>
                <Link to="/import">
                  <Button className="w-full" variant="outline">
                    <Database className="mr-2 h-4 w-4" />
                    Import BeerXML
                  </Button>
                </Link>
                <Link to="/ingredients">
                  <Button className="w-full" variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Manage Inventory
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
