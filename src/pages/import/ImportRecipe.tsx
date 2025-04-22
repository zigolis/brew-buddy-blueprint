
import { useState, useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { parseBeerXml } from "@/utils/beerXmlParser";
import { useBrewContext } from "@/contexts/BrewContext";
import { toast } from "sonner";
import { Upload } from "lucide-react";

const ImportRecipe = () => {
  const [xmlContent, setXmlContent] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addRecipe } = useBrewContext();

  const handleImport = () => {
    if (!xmlContent.trim()) {
      toast.error("Please enter or upload XML content");
      return;
    }

    try {
      const recipes = parseBeerXml(xmlContent);
      recipes.forEach(recipe => {
        addRecipe(recipe);
      });
      toast.success(`Successfully imported ${recipes.length} recipes!`);
      setXmlContent("");
    } catch (error) {
      toast.error(`Error importing recipe: ${error.message}`);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setXmlContent(content);
      toast.success(`File "${file.name}" loaded successfully`);
    };
    reader.onerror = () => {
      toast.error("Error reading file");
    };
    reader.readAsText(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length === 0) return;
    
    const file = files[0];
    if (file.type !== "text/xml" && !file.name.endsWith(".xml")) {
      toast.error("Please upload an XML file");
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setXmlContent(content);
      toast.success(`File "${file.name}" loaded successfully`);
    };
    reader.onerror = () => {
      toast.error("Error reading file");
    };
    reader.readAsText(file);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Import Recipe</h1>
          <p className="text-muted-foreground">Import a recipe from BeerXML</p>
        </div>
        
        <div 
          className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
            isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <Upload className="h-10 w-10 text-muted-foreground" />
            <h3 className="text-lg font-medium">Drag and drop your BeerXML file</h3>
            <p className="text-sm text-muted-foreground">Or click to select a file</p>
            <Button 
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              Select XML File
            </Button>
            <input 
              ref={fileInputRef}
              type="file" 
              accept=".xml" 
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Or paste BeerXML content</h3>
          <Textarea
            placeholder="Paste BeerXML content here..."
            className="min-h-[200px]"
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
