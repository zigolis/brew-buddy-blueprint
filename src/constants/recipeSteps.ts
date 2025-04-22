
export const recipeSteps = [
  { id: "general", title: "General Info", sections: ["general", "stats"] },
  { id: "ingredients", title: "Ingredients", sections: ["fermentables", "hops", "yeast"] },
  { id: "mashing", title: "Mashing", sections: ["mash"] },
  { id: "boil", title: "Boil & Clarification", sections: ["boil", "clarification"] },
  { id: "fermentation", title: "Fermentation", sections: ["fermentation", "coldCrash"] },
  { id: "finishing", title: "Finishing", sections: ["carbonation", "bottling"] },
] as const;
