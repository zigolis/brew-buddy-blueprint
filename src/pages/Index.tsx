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
              <CardTitle className="text-2xl font-semibold">Quick Actions</CardTitle>
              <CardDescription>Jump right into brewing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                <Link to="/recipes/new" className="group">
                  <Button 
                    className="relative w-full h-[4.5rem] text-base flex items-center justify-start px-5 overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 border-2 border-transparent hover:border-primary/20 transition-all duration-300"
                    variant="outline"
                  >
                    <div className="flex items-center gap-3 z-10">
                      <div className="p-2 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Plus className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="font-semibold">New Recipe</span>
                        <span className="text-xs text-muted-foreground">Create a brew recipe</span>
                      </div>
                    </div>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all duration-300">
                      <div className="p-1.5 rounded-full bg-primary/10">
                        <Plus className="h-3 w-3 text-primary" />
                      </div>
                    </div>
                  </Button>
                </Link>

                <Link to="/brewing-guide" className="group">
                  <Button 
                    className="relative w-full h-[4.5rem] text-base flex items-center justify-start px-5 overflow-hidden bg-gradient-to-br from-secondary/10 to-secondary/5 hover:from-secondary/20 hover:to-secondary/10 border-2 border-transparent hover:border-secondary/20 transition-all duration-300"
                    variant="outline"
                  >
                    <div className="flex items-center gap-3 z-10">
                      <div className="p-2 rounded-md bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                        <Beer className="h-5 w-5 text-secondary group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="font-semibold">Start Brewing</span>
                        <span className="text-xs text-muted-foreground">Begin your brew day</span>
                      </div>
                    </div>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all duration-300">
                      <div className="p-1.5 rounded-full bg-secondary/10">
                        <Beer className="h-3 w-3 text-secondary" />
                      </div>
                    </div>
                  </Button>
                </Link>

                <Link to="/import" className="group">
                  <Button 
                    className="relative w-full h-[4.5rem] text-base flex items-center justify-start px-5 overflow-hidden bg-gradient-to-br from-accent/10 to-accent/5 hover:from-accent/20 hover:to-accent/10 border-2 border-transparent hover:border-accent/20 transition-all duration-300"
                    variant="outline"
                  >
                    <div className="flex items-center gap-3 z-10">
                      <div className="p-2 rounded-md bg-accent/10 group-hover:bg-accent/20 transition-colors">
                        <Database className="h-5 w-5 text-accent-foreground group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="font-semibold">Import BeerXML</span>
                        <span className="text-xs text-muted-foreground">Import your recipes</span>
                      </div>
                    </div>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all duration-300">
                      <div className="p-1.5 rounded-full bg-accent/10">
                        <Database className="h-3 w-3 text-accent-foreground" />
                      </div>
                    </div>
                  </Button>
                </Link>

                <Link to="/ingredients" className="group">
                  <Button 
                    className="relative w-full h-[4.5rem] text-base flex items-center justify-start px-5 overflow-hidden bg-gradient-to-br from-muted/40 to-muted/30 hover:from-muted/60 hover:to-muted/40 border-2 border-transparent hover:border-muted-foreground/20 transition-all duration-300"
                    variant="outline"
                  >
                    <div className="flex items-center gap-3 z-10">
                      <div className="p-2 rounded-md bg-muted-foreground/10 group-hover:bg-muted-foreground/20 transition-colors">
                        <FileText className="h-5 w-5 text-muted-foreground group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="font-semibold">Manage Inventory</span>
                        <span className="text-xs text-muted-foreground">Track ingredients</span>
                      </div>
                    </div>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all duration-300">
                      <div className="p-1.5 rounded-full bg-muted-foreground/10">
                        <FileText className="h-3 w-3 text-muted-foreground" />
                      </div>
                    </div>
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
