
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrewContextProvider } from "@/contexts/BrewContext";
import Index from "./pages/Index";
import RecipeList from "./pages/recipes/RecipeList";
import NewRecipe from "./pages/recipes/NewRecipe";
import ImportRecipe from "./pages/import/ImportRecipe";
import BrewingGuide from "./pages/brewing-guide/BrewingGuide";
import IngredientsList from "./pages/ingredients/IngredientsList";
import EquipmentList from "./pages/equipment/EquipmentList";
import CostCalculator from "./pages/calculator/CostCalculator";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrewContextProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/recipes" element={<RecipeList />} />
            <Route path="/recipes/new" element={<NewRecipe />} />
            <Route path="/ingredients" element={<IngredientsList />} />
            <Route path="/equipment" element={<EquipmentList />} />
            <Route path="/calculator" element={<CostCalculator />} />
            <Route path="/import" element={<ImportRecipe />} />
            <Route path="/brewing-guide" element={<BrewingGuide />} />
            <Route path="/brewing-guide/:recipeId" element={<BrewingGuide />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </BrewContextProvider>
  </QueryClientProvider>
);

export default App;
