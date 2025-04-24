import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { BrewContextProvider } from "@/contexts/BrewContext";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { useEffect, useState } from "react";

// Import all page components
import HomePage from "@/pages/Index";
import LandingPage from "@/pages/Landing";
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
import BatchesList from "@/pages/batches/BatchesList";
import BatchDetail from "@/pages/batches/BatchDetail";
import RefactoredBrewingGuide from "./pages/brewing-guide/RefactoredBrewingGuide";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = localStorage.getItem('theme') || (isDark ? 'dark' : 'light');
    document.documentElement.classList.add(theme);
    
    // For demo purposes, check if user has authenticated before
    const hasAuth = localStorage.getItem('ibeer-authenticated');
    setIsAuthenticated(hasAuth === 'true');
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
                {/* Landing page is the default for non-authenticated users */}
                <Route path="/" element={isAuthenticated ? <HomePage /> : <LandingPage />} />
                
                {/* Dashboard routes - require authentication */}
                <Route path="/dashboard" element={isAuthenticated ? <HomePage /> : <Navigate to="/" />} />
                <Route path="/recipes" element={isAuthenticated ? <RecipeList /> : <Navigate to="/" />} />
                <Route path="/recipes/new" element={isAuthenticated ? <NewRecipe /> : <Navigate to="/" />} />
                <Route path="/recipes/:recipeId" element={isAuthenticated ? <ViewRecipe /> : <Navigate to="/" />} />
                <Route path="/recipes/edit/:recipeId" element={isAuthenticated ? <EditRecipe /> : <Navigate to="/" />} />
                <Route path="/batches" element={isAuthenticated ? <BatchesList /> : <Navigate to="/" />} />
                <Route path="/batches/:recipeId" element={isAuthenticated ? <BatchDetail /> : <Navigate to="/" />} />
                <Route path="/ingredients" element={isAuthenticated ? <IngredientsList /> : <Navigate to="/" />} />
                <Route path="/equipment" element={isAuthenticated ? <EquipmentList /> : <Navigate to="/" />} />
                <Route path="/equipment/new" element={isAuthenticated ? <NewEquipment /> : <Navigate to="/" />} />
                <Route path="/equipment/edit/:equipmentId" element={isAuthenticated ? <EditEquipment /> : <Navigate to="/" />} />
                <Route path="/equipment/view/:equipmentId" element={isAuthenticated ? <ViewEquipment /> : <Navigate to="/" />} />
                <Route path="/calculator" element={isAuthenticated ? <CostCalculator /> : <Navigate to="/" />} />
                <Route path="/import" element={isAuthenticated ? <ImportRecipe /> : <Navigate to="/" />} />
                
                {/* Brewing guide is accessible without authentication */}
                <Route path="/brewing-guide" element={<RefactoredBrewingGuide />} />
                <Route path="/brewing-guide/:recipeId" element={<RefactoredBrewingGuide />} />
                <Route path="/my-account" element={isAuthenticated ? <MyAccount /> : <Navigate to="/" />} />
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
