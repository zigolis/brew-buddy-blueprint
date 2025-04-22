import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { parseBeerXml } from "@/utils/beerXmlParser";
import { useBrewContext } from "@/contexts/BrewContext";
import { Recipe } from "@/types";
import { toast } from "sonner";

const ImportRecipe = () => {
  const [xmlContent, setXmlContent] = useState("");
  const { addRecipe } = useBrewContext();

  const handleImport = () => {
    try {
      const recipes = parseBeerXml(xmlContent);
      recipes.forEach(recipe => {
        addRecipe(recipe);
      });
      toast.success(`Successfully imported ${recipes.length} recipes!`);
    } catch (error) {
      toast.error(`Error importing recipe: ${error.message}`);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Import Recipe</h1>
          <p className="text-muted-foreground">Import a recipe from BeerXML</p>
        </div>
        <div>
          <Textarea
            placeholder="Paste BeerXML content here..."
            className="min-h-[300px] resize-none"
            value={xmlContent}
            onChange={(e) => setXmlContent(e.target.value)}
          />
        </div>
        <Button onClick={handleImport}>Import Recipe</Button>
      </div>
    </Layout>
  );
};

export default ImportRecipe;
