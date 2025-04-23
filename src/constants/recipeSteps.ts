
export const recipeSteps = [
  {
    id: "general",
    title: "General",
    sections: ["general"]
  },
  {
    id: "stats",
    title: "Stats",
    sections: ["stats"]
  },
  {
    id: "ingredients",
    title: "Ingredients",
    sections: ["fermentables", "hops", "yeast"]
  },
  {
    id: "mash",
    title: "Mash",
    sections: ["mash"]
  },
  {
    id: "boil",
    title: "Boil",
    sections: ["boil"]
  },
  {
    id: "fermentation",
    title: "Fermentation",
    sections: ["fermentation", "clarification", "coldCrash"]
  },
  {
    id: "carbonation",
    title: "Carbonation",
    sections: ["carbonation", "bottling"]
  }
] as const;
