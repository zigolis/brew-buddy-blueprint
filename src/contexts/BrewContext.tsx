
import { createContext, useContext, useState, useEffect } from "react";
import { Recipe, Equipment } from "@/types";
import { mockRecipes } from "@/data/mockRecipes";
import { mockEquipment } from "@/data/mockEquipment";

interface BrewContextProps {
  recipes: Recipe[];
  equipment: Equipment[];
  addRecipe: (recipe: Recipe) => void;
  updateRecipe: (id: string, recipe: Recipe) => void;
  deleteRecipe: (id: string) => void;
  addEquipment: (equipment: Equipment) => void;
  updateEquipment: (id: string, equipment: Equipment) => void;
  deleteEquipment: (id: string) => void;
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
}

const BrewContext = createContext<BrewContextProps | undefined>(undefined);

export const BrewContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    try {
      const storedRecipes = localStorage.getItem("brewMasterRecipes");
      return storedRecipes ? JSON.parse(storedRecipes) : mockRecipes;
    } catch (error) {
      console.error("Error loading recipes from localStorage:", error);
      return mockRecipes;
    }
  });

  const [equipment, setEquipment] = useState<Equipment[]>(() => {
    try {
      const storedEquipment = localStorage.getItem("brewMasterEquipment");
      return storedEquipment ? JSON.parse(storedEquipment) : mockEquipment;
    } catch (error) {
      console.error("Error loading equipment from localStorage:", error);
      return mockEquipment;
    }
  });

  const [bookmarkedRecipes, setBookmarkedRecipes] = useState<string[]>(() => {
    try {
      const storedBookmarks = localStorage.getItem("brewMasterBookmarks");
      return storedBookmarks ? JSON.parse(storedBookmarks) : [];
    } catch (error) {
      console.error("Error loading bookmarks from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("brewMasterRecipes", JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem("brewMasterEquipment", JSON.stringify(equipment));
  }, [equipment]);

  useEffect(() => {
    localStorage.setItem("brewMasterBookmarks", JSON.stringify(bookmarkedRecipes));
  }, [bookmarkedRecipes]);

  const addRecipe = (recipe: Recipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, recipe]);
  };

  const updateRecipe = (id: string, updatedRecipe: Recipe) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) => (recipe.id === id ? updatedRecipe : recipe))
    );
  };

  const deleteRecipe = (id: string) => {
    setRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe.id !== id)
    );
    // Also remove from bookmarks if it exists there
    if (isBookmarked(id)) {
      toggleBookmark(id);
    }
  };

  const addEquipment = (equipment: Equipment) => {
    setEquipment((prevEquipment) => [...prevEquipment, equipment]);
  };

  const updateEquipment = (id: string, updatedEquipment: Equipment) => {
    setEquipment((prevEquipment) =>
      prevEquipment.map((item) => (item.id === id ? updatedEquipment : item))
    );
  };

  const deleteEquipment = (id: string) => {
    setEquipment((prevEquipment) =>
      prevEquipment.filter((item) => item.id !== id)
    );
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedRecipes((prevBookmarks) => {
      if (prevBookmarks.includes(id)) {
        return prevBookmarks.filter((bookmarkId) => bookmarkId !== id);
      } else {
        return [...prevBookmarks, id];
      }
    });
  };

  const isBookmarked = (id: string): boolean => {
    return bookmarkedRecipes.includes(id);
  };

  const value: BrewContextProps = {
    recipes,
    equipment,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    addEquipment,
    updateEquipment,
    deleteEquipment,
    toggleBookmark,
    isBookmarked,
  };

  return <BrewContext.Provider value={value}>{children}</BrewContext.Provider>;
};

export const useBrewContext = () => {
  const context = useContext(BrewContext);
  if (!context) {
    throw new Error("useBrewContext must be used within a BrewContextProvider");
  }
  return context;
};
