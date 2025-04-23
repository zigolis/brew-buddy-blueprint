
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ModernActivityChart } from "@/components/stats/ModernActivityChart";
import { useBrewContext } from "@/contexts/BrewContext";
import { Link } from "react-router-dom";
import { Beer, FileText, Plus, Database, LayoutGrid } from "lucide-react";

export default function HomePage() {
  const { recipes } = useBrewContext();
  const totalRecipes = recipes.length;
  const brewedRecipes = recipes.filter(recipe => recipe.isBrewed).length;
  
  // Process chart data
  const chartData = recipes.map(recipe => ({
    date: new Date(recipe.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    created: 1,
    brewed: recipe.isBrewed ? 1 : 0,
    updated: recipe.updatedAt ? 1 : 0,
  }));
  
  return (
    <Layout>
      <div className="space-y-8 fade-in">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-lg text-muted-foreground">Your brewing activity overview</p>
        </div>
        
        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Recipes</CardTitle>
              <LayoutGrid className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRecipes}</div>
            </CardContent>
          </Card>
          
          <Card className="transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Brewed Recipes</CardTitle>
              <Beer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{brewedRecipes}</div>
            </CardContent>
          </Card>
          
          <Card className="transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ingredients</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-</div>
            </CardContent>
          </Card>
          
          <Card className="transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Equipment</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <Card className="col-span-1 transition-all duration-200 hover:shadow-lg">
            <ModernActivityChart data={chartData} />
          </Card>
          
          <Card className="col-span-1 transition-all duration-200 hover:shadow-lg">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                <Link to="/recipes/new" className="w-full">
                  <Button className="w-full h-12 text-base" variant="outline">
                    <Plus className="mr-2 h-5 w-5" />
                    New Recipe
                  </Button>
                </Link>
                <Link to="/brewing-guide" className="w-full">
                  <Button className="w-full h-12 text-base" variant="outline">
                    <Beer className="mr-2 h-5 w-5" />
                    Start Brewing
                  </Button>
                </Link>
                <Link to="/import" className="w-full">
                  <Button className="w-full h-12 text-base" variant="outline">
                    <Database className="mr-2 h-5 w-5" />
                    Import BeerXML
                  </Button>
                </Link>
                <Link to="/ingredients" className="w-full">
                  <Button className="w-full h-12 text-base" variant="outline">
                    <FileText className="mr-2 h-5 w-5" />
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
