
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Your brewing activity overview</p>
        </div>
        
        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Recipes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRecipes}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Brewed Recipes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{brewedRecipes}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Ingredients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Equipment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <Card className="col-span-1">
            <ModernActivityChart data={recipes} />
          </Card>
          
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                <Link to="/recipes/new" className="w-full">
                  <Button className="w-full h-10" variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    New Recipe
                  </Button>
                </Link>
                <Link to="/brewing-guide" className="w-full">
                  <Button className="w-full h-10" variant="outline">
                    <Beer className="mr-2 h-4 w-4" />
                    Start Brewing
                  </Button>
                </Link>
                <Link to="/import" className="w-full">
                  <Button className="w-full h-10" variant="outline">
                    <Database className="mr-2 h-4 w-4" />
                    Import BeerXML
                  </Button>
                </Link>
                <Link to="/ingredients" className="w-full">
                  <Button className="w-full h-10" variant="outline">
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
