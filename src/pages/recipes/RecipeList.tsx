import { Layout } from "@/components/layout/Layout";
import { useBrewContext } from "@/contexts/BrewContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Beer, Edit, FileText, Trash2, BookmarkPlus, BookmarkCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const RecipeList = () => {
  const { recipes, deleteRecipe, toggleBookmark, isBookmarked } = useBrewContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [styleFilter, setStyleFilter] = useState<string>("all");
  
  const uniqueStyles = Array.from(
    new Set(
      recipes
        .filter(recipe => recipe.style && recipe.style.name)
        .map(recipe => recipe.style.name)
    )
  );
  
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          recipe.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          recipe.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) || false;
    
    const matchesStyle = styleFilter === "all" || (recipe.style && recipe.style.name === styleFilter);
    
    return matchesSearch && matchesStyle;
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Recipes</h1>
            <p className="text-muted-foreground">Manage your brewing recipes</p>
          </div>
          <Button asChild size="sm">
            <Link to="/recipes/new">
              <Beer className="mr-2 h-4 w-4" />
              New Recipe
            </Link>
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-2/3">
            <Input 
              placeholder="Search recipes..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="w-full md:w-1/3">
            <Select value={styleFilter} onValueChange={setStyleFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Styles</SelectItem>
                {uniqueStyles.map(style => (
                  <SelectItem key={style} value={style}>{style}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Tabs defaultValue="grid" className="w-full">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="grid">Grid</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>
            <div className="text-sm text-muted-foreground">
              {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''}
            </div>
          </div>
          
          <TabsContent value="grid" className="mt-6">
            {filteredRecipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes.map(recipe => (
                  <Card key={recipe.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl truncate">{recipe.name}</CardTitle>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleBookmark(recipe.id)}
                          className="h-8 w-8"
                        >
                          {isBookmarked(recipe.id) ? (
                            <BookmarkCheck className="h-4 w-4" />
                          ) : (
                            <BookmarkPlus className="h-4 w-4" />
                          )}
                          <span className="sr-only">
                            {isBookmarked(recipe.id) ? "Remove bookmark" : "Add bookmark"}
                          </span>
                        </Button>
                      </div>
                      <CardDescription>
                        <span className="block">{recipe.style?.name || "No style"}</span>
                        <span className="text-sm">by {recipe.author}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="outline">{recipe.type}</Badge>
                        <Badge variant="secondary">{recipe.batchSize}L</Badge>
                        <Badge variant="secondary">{recipe.ingredients?.hops?.length || 0} Hops</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <div className="font-medium">ABV</div>
                          <div>{recipe.style ? ((recipe.style.minAbv + recipe.style.maxAbv) / 2).toFixed(1) : "N/A"}%</div>
                        </div>
                        <div>
                          <div className="font-medium">IBU</div>
                          <div>{recipe.style ? ((recipe.style.minIbu + recipe.style.maxIbu) / 2).toFixed(0) : "N/A"}</div>
                        </div>
                        <div>
                          <div className="font-medium">Cost</div>
                          <div>${recipe.estimatedCost?.toFixed(2) || "0.00"}</div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/recipes/${recipe.id}`}>
                          <FileText className="mr-1 h-4 w-4" />
                          View
                        </Link>
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/recipes/${recipe.id}/edit`}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Link>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => deleteRecipe(recipe.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Alert>
                <AlertTitle>No recipes found</AlertTitle>
                <AlertDescription>
                  No recipes match your current search criteria. Try adjusting your filters or create a new recipe.
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>
          
          <TabsContent value="list" className="mt-6">
            {filteredRecipes.length > 0 ? (
              <div className="space-y-4">
                {filteredRecipes.map(recipe => (
                  <Card key={recipe.id}>
                    <div className="flex flex-col md:flex-row">
                      <div className="p-4 md:w-2/3">
                        <div className="flex justify-between items-start mb-1">
                          <Link to={`/recipes/${recipe.id}`} className="text-lg font-medium hover:underline">
                            {recipe.name}
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleBookmark(recipe.id)}
                            className="h-8 w-8"
                          >
                            {isBookmarked(recipe.id) ? (
                              <BookmarkCheck className="h-4 w-4" />
                            ) : (
                              <BookmarkPlus className="h-4 w-4" />
                            )}
                            <span className="sr-only">
                              {isBookmarked(recipe.id) ? "Remove bookmark" : "Add bookmark"}
                            </span>
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge variant="outline">{recipe.style?.name || "No style"}</Badge>
                          <Badge variant="outline">{recipe.type}</Badge>
                          <Badge variant="secondary">{recipe.batchSize}L</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {recipe.notes || "No recipe notes available."}
                        </p>
                      </div>
                      <div className="p-4 bg-muted/50 md:w-1/3 flex flex-row md:flex-col justify-between">
                        <div>
                          <div className="text-sm font-medium">Author</div>
                          <div className="text-sm">{recipe.author}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Est. Cost</div>
                          <div className="text-sm">${recipe.estimatedCost?.toFixed(2) || "0.00"}</div>
                        </div>
                        <div className="flex gap-2 md:mt-4">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/recipes/${recipe.id}/edit`}>
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Link>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => deleteRecipe(recipe.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1 text-destructive" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Alert>
                <AlertTitle>No recipes found</AlertTitle>
                <AlertDescription>
                  No recipes match your current search criteria. Try adjusting your filters or create a new recipe.
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default RecipeList;
