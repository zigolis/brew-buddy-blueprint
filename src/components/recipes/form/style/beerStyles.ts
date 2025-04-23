
import { Style } from "@/types";

export const beerStyles: Style[] = [
  {
    name: "American IPA",
    category: "India Pale Ale",
    categoryNumber: "21",
    styleLetter: "A",
    styleGuide: "BJCP 2015",
    type: "Ale",
    minOg: 1.056,
    maxOg: 1.070,
    minFg: 1.008,
    maxFg: 1.014,
    minIbu: 40,
    maxIbu: 70,
    minColor: 6,
    maxColor: 14,
    minAbv: 5.5,
    maxAbv: 7.5,
    notes: "A decidedly hoppy and bitter, moderately strong American pale ale.",
    profile: "Clean, dry, hoppy",
    ingredients: "Pale ale malt, American hops, American yeast",
    examples: "Bell's Two Hearted, Stone IPA, Sierra Nevada Celebration"
  },
  // Add more styles as needed...
];

// Water profiles mapped to beer styles
export const waterProfiles: Record<string, any> = {
  "American IPA": {
    calcium: 75,
    magnesium: 5,
    sodium: 10,
    chloride: 50,
    sulfate: 150,
    bicarbonate: 0,
    ph: 5.4,
    notes: "Balanced profile favoring hop character"
  },
  // Add more water profiles...
};
