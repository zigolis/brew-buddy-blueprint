import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useBrewContext } from "@/contexts/BrewContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayCircle, ChevronRight } from "lucide-react";

const EnhancedBrewingGuide = () => {
  const { recipes } = useBrewContext();
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(recipeId || null);

  // If recipeId is provided, show that specific recipe's brewing steps
  if (recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    
    if (!recipe) {
      return (
        <Layout>
          <div>
            <h1 className="text-3xl font-bold mb-6">Recipe Not Found</h1>
            <p className="mb-4">Sorry, the recipe you selected could not be found.</p>
            <Button onClick={() => navigate("/brewing-guide")}>
              Back to Brewing Guide
            </Button>
          </div>
        </Layout>
      );
    }
    
    return (
      <Layout>
        <div>
          <h1 className="text-3xl font-bold mb-6">Brewing Guide: {recipe.name}</h1>
          
          {/* Your existing brewing guide components */}
          <div className="existing-content">
            {/* Content from the original BrewingGuide component would go here */}
          </div>
        </div>
      </Layout>
    );
  }
  
  // Otherwise show the recipe selection list
  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold mb-2">Brewing Guide</h1>
        <p className="text-muted-foreground mb-6">Select a recipe to begin brewing</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map(recipe => (
            <Card key={recipe.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{recipe.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><span className="font-medium">Style:</span> {recipe.style?.name || 'N/A'}</p>
                  <p><span className="font-medium">ABV:</span> {recipe.abv ? `${recipe.abv}%` : 'N/A'}</p>
                  <div className="flex justify-end mt-4">
                    <Button 
                      onClick={() => navigate(`/brewing-guide/${recipe.id}`)}
                      className="flex items-center"
                    >
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Start Brewing
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {recipes.length === 0 && (
            <div className="col-span-full text-center p-12 bg-muted rounded-lg">
              <h3 className="text-xl font-medium mb-2">No Recipes Found</h3>
              <p className="mb-6">You haven't created any recipes yet.</p>
              <Link to="/recipes/new">
                <Button>Create Your First Recipe</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default EnhancedBrewingGuide;
