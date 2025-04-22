import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Recipe, Equipment, BrewingSession } from '@/types/beer';

// Default mock data for testing UI
import { mockRecipes } from '@/data/mockRecipes';
import { mockEquipment } from '@/data/mockEquipment';

interface BrewContextType {
  recipes: Recipe[];
  equipment: Equipment[];
  brewingSessions: BrewingSession[];
  bookmarkedRecipes: Set<string>;
  addRecipe: (recipe: Recipe) => void;
  updateRecipe: (recipeId: string, updatedRecipe: Recipe) => void;
  deleteRecipe: (recipeId: string) => void;
  toggleBookmark: (recipeId: string) => void;
  isBookmarked: (recipeId: string) => boolean;
  addEquipment: (equipment: Equipment) => void;
  updateEquipment: (equipmentId: string, updatedEquipment: Equipment) => void;
  deleteEquipment: (equipmentId: string) => void;
  addBrewingSession: (session: BrewingSession) => void;
  updateBrewingSession: (sessionId: string, updatedSession: BrewingSession) => void;
  deleteBrewingSession: (sessionId: string) => void;
}

// Create context with default values
const BrewContext = createContext<BrewContextType>({
  recipes: [],
  equipment: [],
  brewingSessions: [],
  bookmarkedRecipes: new Set(),
  addRecipe: () => {},
  updateRecipe: () => {},
  deleteRecipe: () => {},
  toggleBookmark: () => {},
  isBookmarked: () => false,
  addEquipment: () => {},
  updateEquipment: () => {},
  deleteEquipment: () => {},
  addBrewingSession: () => {},
  updateBrewingSession: () => {},
  deleteBrewingSession: () => {},
});

export function useBrewContext() {
  return useContext(BrewContext);
}

interface BrewContextProviderProps {
  children: ReactNode;
}

export function BrewContextProvider({ children }: BrewContextProviderProps) {
  // State for all our data
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [brewingSessions, setBrewingSessions] = useState<BrewingSession[]>([]);
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState<Set<string>>(new Set());

  // Load data from localStorage on initial mount
  useEffect(() => {
    try {
      const storedRecipes = localStorage.getItem('brewMasterRecipes');
      const storedEquipment = localStorage.getItem('brewMasterEquipment');
      const storedSessions = localStorage.getItem('brewMasterSessions');
      const storedBookmarks = localStorage.getItem('brewMasterBookmarks');
      
      // Use mock data if nothing stored
      setRecipes(storedRecipes ? JSON.parse(storedRecipes) : mockRecipes);
      setEquipment(storedEquipment ? JSON.parse(storedEquipment) : mockEquipment);
      setBrewingSessions(storedSessions ? JSON.parse(storedSessions) : []);
      setBookmarkedRecipes(new Set(storedBookmarks ? JSON.parse(storedBookmarks) : []));
    } catch (error) {
      console.error('Error loading data from localStorage', error);
      setRecipes(mockRecipes);
      setEquipment(mockEquipment);
      setBrewingSessions([]);
      setBookmarkedRecipes(new Set());
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('brewMasterRecipes', JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem('brewMasterEquipment', JSON.stringify(equipment));
  }, [equipment]);

  useEffect(() => {
    localStorage.setItem('brewMasterSessions', JSON.stringify(brewingSessions));
  }, [brewingSessions]);

  useEffect(() => {
    localStorage.setItem('brewMasterBookmarks', JSON.stringify(Array.from(bookmarkedRecipes)));
  }, [bookmarkedRecipes]);

  // Recipe methods
  const addRecipe = (recipe: Recipe) => {
    setRecipes(prev => [...prev, recipe]);
  };

  const updateRecipe = (recipeId: string, updatedRecipe: Recipe) => {
    setRecipes(prev => prev.map(recipe => 
      recipe.id === recipeId ? updatedRecipe : recipe
    ));
  };

  const deleteRecipe = (recipeId: string) => {
    setRecipes(prev => prev.filter(recipe => recipe.id !== recipeId));
  };

  // Equipment methods
  const addEquipment = (equipment: Equipment) => {
    setEquipment(prev => [...prev, equipment]);
  };

  const updateEquipment = (equipmentId: string, updatedEquipment: Equipment) => {
    setEquipment(prev => prev.map(equipment => 
      equipment.id === equipmentId ? updatedEquipment : equipment
    ));
  };

  const deleteEquipment = (equipmentId: string) => {
    setEquipment(prev => prev.filter(equipment => equipment.id !== equipmentId));
  };

  // Brewing session methods
  const addBrewingSession = (session: BrewingSession) => {
    setBrewingSessions(prev => [...prev, session]);
  };

  const updateBrewingSession = (sessionId: string, updatedSession: BrewingSession) => {
    setBrewingSessions(prev => prev.map(session => 
      session.id === sessionId ? updatedSession : session
    ));
  };

  const deleteBrewingSession = (sessionId: string) => {
    setBrewingSessions(prev => prev.filter(session => session.id !== sessionId));
  };

  // Bookmark methods
  const toggleBookmark = (recipeId: string) => {
    setBookmarkedRecipes(prev => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(recipeId)) {
        newBookmarks.delete(recipeId);
      } else {
        newBookmarks.add(recipeId);
      }
      return newBookmarks;
    });
  };

  const isBookmarked = (recipeId: string) => bookmarkedRecipes.has(recipeId);

  // Context value
  const value = {
    recipes,
    equipment,
    brewingSessions,
    bookmarkedRecipes,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    toggleBookmark,
    isBookmarked,
    addEquipment,
    updateEquipment,
    deleteEquipment,
    addBrewingSession,
    updateBrewingSession,
    deleteBrewingSession,
  };

  return (
    <BrewContext.Provider value={value}>
      {children}
    </BrewContext.Provider>
  );
}
