
import { Layout } from "@/components/layout/Layout";
import { useBrewContext } from "@/contexts/BrewContext";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FileText, Upload, Check, AlertTriangle, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { parseBeerXml } from "@/utils/beerXmlParser";
import { Recipe } from "@/types/beer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ImportRecipe = () => {
  const { addRecipe } = useBrewContext();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileList | null>(null);
  const [parsedRecipes, setParsedRecipes] = useState<Recipe[]>([]);
  const [selectedRecipes, setSelectedRecipes] = useState<Set<string>>(new Set());
  const [importStatus, setImportStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportStatus('loading');
    setErrorMessage(null);
    setParsedRecipes([]);
    setSelectedRecipes(new Set());
    
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) {
      setImportStatus('idle');
      return;
    }
    
    setFiles(fileList);
    
    try {
      // Process each file
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const reader = new FileReader();
        
        reader.onload = (e) => {
          try {
            const xmlContent = e.target?.result as string;
            const recipes = parseBeerXml(xmlContent);
            
            if (recipes.length === 0) {
              throw new Error("No valid recipes found in the XML file.");
            }
            
            // Select all recipes by default
            const newSelectedRecipes = new Set(selectedRecipes);
            recipes.forEach(recipe => newSelectedRecipes.add(recipe.id));
            
            setParsedRecipes(prev => [...prev, ...recipes]);
            setSelectedRecipes(newSelectedRecipes);
            setImportStatus('success');
          } catch (error) {
            console.error("Error parsing XML:", error);
            setErrorMessage(error instanceof Error ? error.message : "Unknown error parsing XML");
            setImportStatus('error');
          }
        };
        
        reader.onerror = () => {
          setErrorMessage("Error reading file");
          setImportStatus('error');
        };
        
        reader.readAsText(file);
      }
    } catch (error) {
      console.error("Error handling files:", error);
      setErrorMessage(error instanceof Error ? error.message : "Unknown error handling files");
      setImportStatus('error');
    }
  };

  const toggleRecipeSelection = (recipeId: string) => {
    const newSelected = new Set(selectedRecipes);
    if (newSelected.has(recipeId)) {
      newSelected.delete(recipeId);
    } else {
      newSelected.add(recipeId);
    }
    setSelectedRecipes(newSelected);
  };

  const handleImport = () => {
    // Import only selected recipes
    const recipesToImport = parsedRecipes.filter(recipe => selectedRecipes.has(recipe.id));
    
    recipesToImport.forEach(recipe => {
      addRecipe(recipe);
    });
    
    navigate('/recipes', { state: { imported: recipesToImport.length } });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Import Recipes</h1>
          <p className="text-muted-foreground">Import recipes from BeerXML files</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Upload BeerXML Files</CardTitle>
            <CardDescription>
              Import recipes from BeerSmith, Brewfather, or other brewing software that supports the BeerXML format.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-6 mb-4">
              <FileText className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-center mb-4">Drag & drop your BeerXML files here, or click to browse</p>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".xml"
                multiple
                className="hidden"
              />
              <Button onClick={triggerFileInput}>
                <Upload className="h-4 w-4 mr-2" />
                Browse Files
              </Button>
            </div>
            
            {importStatus === 'loading' && (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Processing</AlertTitle>
                <AlertDescription>
                  Parsing your BeerXML files...
                </AlertDescription>
              </Alert>
            )}
            
            {importStatus === 'error' && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Import Error</AlertTitle>
                <AlertDescription>
                  {errorMessage || "There was an error importing your recipes. Please check your file format."}
                </AlertDescription>
              </Alert>
            )}
            
            {files && files.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Selected Files:</h3>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  {Array.from(files).map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
        
        {parsedRecipes.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Found Recipes</CardTitle>
              <CardDescription>
                Select the recipes you want to import
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="list">
                <TabsList className="mb-4">
                  <TabsTrigger value="list">List View</TabsTrigger>
                  <TabsTrigger value="details">Detailed View</TabsTrigger>
                </TabsList>
                
                <TabsContent value="list">
                  <div className="space-y-2">
                    {parsedRecipes.map(recipe => (
                      <div 
                        key={recipe.id}
                        className={`p-3 rounded-md flex items-center justify-between cursor-pointer ${
                          selectedRecipes.has(recipe.id) ? 'bg-accent' : 'hover:bg-muted'
                        }`}
                        onClick={() => toggleRecipeSelection(recipe.id)}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-sm border mr-3 flex items-center justify-center ${
                            selectedRecipes.has(recipe.id) ? 'bg-primary border-primary' : 'border-primary'
                          }`}>
                            {selectedRecipes.has(recipe.id) && <Check className="h-3 w-3 text-primary-foreground" />}
                          </div>
                          <div>
                            <div className="font-medium">{recipe.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {recipe.style.name} | {recipe.type} | {recipe.batchSize}L
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          by {recipe.author}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="details">
                  <div className="space-y-4">
                    {parsedRecipes.map(recipe => (
                      <Card key={recipe.id} className={selectedRecipes.has(recipe.id) ? 'border-primary' : ''}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{recipe.name}</CardTitle>
                            <div 
                              className={`w-5 h-5 rounded-sm border flex items-center justify-center cursor-pointer ${
                                selectedRecipes.has(recipe.id) ? 'bg-primary border-primary' : 'border-primary'
                              }`}
                              onClick={() => toggleRecipeSelection(recipe.id)}
                            >
                              {selectedRecipes.has(recipe.id) && <Check className="h-3 w-3 text-primary-foreground" />}
                            </div>
                          </div>
                          <CardDescription>{recipe.style.name} by {recipe.author}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-y-2 text-sm">
                            <div><span className="font-medium">Type:</span> {recipe.type}</div>
                            <div><span className="font-medium">Batch Size:</span> {recipe.batchSize}L</div>
                            <div><span className="font-medium">Boil Time:</span> {recipe.boilTime} min</div>
                            <div><span className="font-medium">Efficiency:</span> {recipe.efficiency}%</div>
                          </div>
                          
                          <div className="mt-3">
                            <div className="font-medium text-sm">Ingredients:</div>
                            <div className="text-sm">
                              {recipe.ingredients.fermentables.length} Fermentables, 
                              {recipe.ingredients.hops.length} Hops,
                              {recipe.ingredients.yeasts.length} Yeasts,
                              {recipe.ingredients.miscs.length} Miscellaneous
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline" onClick={() => {
                setParsedRecipes([]);
                setSelectedRecipes(new Set());
                setFiles(null);
                setImportStatus('idle');
                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
              }}>
                Clear
              </Button>
              <Button 
                onClick={handleImport}
                disabled={selectedRecipes.size === 0}
              >
                Import {selectedRecipes.size} Recipe{selectedRecipes.size !== 1 ? 's' : ''}
              </Button>
            </CardFooter>
          </Card>
        )}
        
        <Alert className="bg-accent">
          <Info className="h-4 w-4" />
          <AlertTitle>BeerXML Format</AlertTitle>
          <AlertDescription>
            <p className="mb-2">
              BeerXML is an industry standard format for beer recipes, supported by most brewing software.
            </p>
            <p>
              You can export BeerXML files from software such as BeerSmith, Brewfather, and many others.
            </p>
          </AlertDescription>
        </Alert>
      </div>
    </Layout>
  );
};

export default ImportRecipe;
