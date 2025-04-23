import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrewContextProvider } from "@/contexts/BrewContext";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { useEffect } from "react";

// Import all page components
import HomePage from "@/pages/Index";
import RecipeList from "@/pages/recipes/RecipeList";
import NewRecipe from "@/pages/recipes/NewRecipe";
import { ViewRecipe } from "@/pages/recipes/ViewRecipe";
import IngredientsList from "@/pages/ingredients/IngredientsList";
import EquipmentList from "@/pages/equipment/EquipmentList";
import NewEquipment from "@/pages/equipment/NewEquipment";
import EditEquipment from "@/pages/equipment/EditEquipment";
import ViewEquipment from "@/pages/equipment/ViewEquipment";
import CostCalculator from "@/pages/calculator/CostCalculator";
import ImportRecipe from "@/pages/import/ImportRecipe";
import EnhancedBrewingGuide from "@/pages/brewing-guide/EnhancedBrewingGuide";
import BrewingPlanner from "@/pages/brewing-planner/BrewingPlanner";
import NotFound from "@/pages/NotFound";
import EditRecipe from "@/pages/recipes/EditRecipe";
import MyAccount from "@/pages/my-account/MyAccount";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = localStorage.getItem('theme') || (isDark ? 'dark' : 'light');
    document.documentElement.classList.add(theme);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        <BrewContextProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/recipes" element={<RecipeList />} />
                <Route path="/recipes/new" element={<NewRecipe />} />
                <Route path="/recipes/:recipeId" element={<ViewRecipe />} />
                <Route path="/recipes/edit/:recipeId" element={<EditRecipe />} />
                <Route path="/ingredients" element={<IngredientsList />} />
                <Route path="/equipment" element={<EquipmentList />} />
                <Route path="/equipment/new" element={<NewEquipment />} />
                <Route path="/equipment/edit/:equipmentId" element={<EditEquipment />} />
                <Route path="/equipment/view/:equipmentId" element={<ViewEquipment />} />
                <Route path="/calculator" element={<CostCalculator />} />
                <Route path="/import" element={<ImportRecipe />} />
                <Route path="/brewing-guide" element={<EnhancedBrewingGuide />} />
                <Route path="/brewing-guide/:recipeId" element={<EnhancedBrewingGuide />} />
                <Route path="/brewing-planner" element={<BrewingPlanner />} />
                <Route path="/my-account" element={<MyAccount />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </BrewContextProvider>
      </SettingsProvider>
    </QueryClientProvider>
  );
};

export default App;
