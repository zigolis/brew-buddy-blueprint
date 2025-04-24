
import React from 'react';
import { Button } from "@/components/ui/button";
import { Recipe } from "@/types";
import { useNavigate } from "react-router-dom";

interface BrewingSessionHeaderProps {
  recipe: Recipe;
}

export const BrewingSessionHeader = ({ recipe }: BrewingSessionHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold">Brewing: {recipe.name}</h1>
        <p className="text-muted-foreground">{recipe.style?.name}</p>
      </div>
      <Button variant="outline" onClick={() => navigate('/brewing-guide')}>
        Exit Brewing Session
      </Button>
    </div>
  );
};
