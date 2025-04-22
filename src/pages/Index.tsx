import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Beer, Calculator, FileText, List, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { useBrewContext } from "@/contexts/BrewContext";
import { useIngredients } from "@/hooks/useIngredients";
import { RecipeActivityChart } from "@/components/stats/RecipeActivityChart";

const HomePage = () => {
  const { recipes, equipment } = useBrewContext();
  const { ingredients } = useIngredients();
  
  const recipeCount = recipes.length;
  const equipmentCount = equipment.length;
  const ingredientCount = ingredients.length;
  
  return (
    <Layout>
      <div className="space-y-8 fade-in">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight">Welcome to iBeer Brewing Pro</h1>
          <p className="text-lg text-muted-foreground">
            Your comprehensive brewing companion - manage recipes, track costs, and brew with confidence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="card-hover">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold">Recipes</CardTitle>
                <Beer className="h-5 w-5 text-primary" />
              </div>
              <CardDescription>Create and manage your brewing recipes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{recipeCount}</div>
              <p className="text-sm text-muted-foreground">saved recipes</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/recipes">View Recipes</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="card-hover">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold">Ingredients</CardTitle>
                <Package className="h-5 w-5 text-primary" />
              </div>
              <CardDescription>{ingredientCount} saved ingredients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{ingredientCount}</div>
              <p className="text-sm text-muted-foreground">saved ingredients</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/ingredients">View Ingredients</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="card-hover">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold">Equipment</CardTitle>
                <List className="h-5 w-5 text-primary" />
              </div>
              <CardDescription>Track your brewing gear</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{equipmentCount}</div>
              <p className="text-sm text-muted-foreground">equipment items</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/equipment">View Equipment</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RecipeActivityChart />
          
          <Card className="card-hover">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold">Brewing Guide</CardTitle>
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <CardDescription>Step-by-step brewing instructions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Interactive brewing guides to help you brew with confidence. Get started with a guided brewing session.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to="/brewing-guide">Start Brewing</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="card-hover">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold">Cost Calculator</CardTitle>
                <Calculator className="h-5 w-5 text-primary" />
              </div>
              <CardDescription>Track and analyze brewing costs</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Calculate the cost of your recipes, including ingredients, equipment, and utilities.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/calculator">Open Calculator</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <Card className="bg-accent mt-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Import BeerXML</CardTitle>
            <CardDescription>
              Import your existing recipes from BeerSmith, Brewfather or other brewing software
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              iBeer Brewing Pro supports the industry-standard BeerXML format for importing recipes.
            </p>
            <Button asChild>
              <Link to="/import">Import Recipe</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default HomePage;
