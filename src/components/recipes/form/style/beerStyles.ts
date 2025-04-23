
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
  {
    name: "English IPA",
    category: "India Pale Ale",
    categoryNumber: "12",
    styleLetter: "C",
    styleGuide: "BJCP 2015",
    type: "Ale",
    minOg: 1.050,
    maxOg: 1.075,
    minFg: 1.010,
    maxFg: 1.018,
    minIbu: 40,
    maxIbu: 60,
    minColor: 8,
    maxColor: 18,
    minAbv: 5.0,
    maxAbv: 7.5,
    notes: "A hoppy, moderately-strong, very well-attenuated pale British ale with a dry finish and a hoppy aroma and flavor.",
    profile: "Hoppy, moderately strong, and bitter",
    ingredients: "Pale ale malt, English hops, English yeast",
    examples: "Freeminer Trafalgar IPA, Fuller's Bengal Lancer, Samuel Smith's India Ale"
  },
  {
    name: "German Pilsner",
    category: "Pale Lager",
    categoryNumber: "5",
    styleLetter: "D",
    styleGuide: "BJCP 2015",
    type: "Lager",
    minOg: 1.044,
    maxOg: 1.050,
    minFg: 1.008,
    maxFg: 1.013,
    minIbu: 22,
    maxIbu: 40,
    minColor: 2,
    maxColor: 5,
    minAbv: 4.4,
    maxAbv: 5.2,
    notes: "A light-bodied, highly-attenuated, gold-colored, bottom-fermented bitter German beer showing excellent head retention and an elegant, floral hop aroma.",
    profile: "Crisp, clean, and refreshing",
    ingredients: "Pilsner malt, German hops, German lager yeast",
    examples: "Bitburger, König Pilsener, Warsteiner"
  }
];

// Water profiles mapped to beer styles
export const waterProfiles = {
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
  "English IPA": {
    calcium: 80,
    magnesium: 10,
    sodium: 15,
    chloride: 80,
    sulfate: 120,
    bicarbonate: 25,
    ph: 5.5,
    notes: "Slightly more mineral character than American IPAs"
  },
  "German Pilsner": {
    calcium: 50,
    magnesium: 5,
    sodium: 5,
    chloride: 40,
    sulfate: 70,
    bicarbonate: 0,
    ph: 5.2,
    notes: "Very soft water profile for clean malt character"
  }
};
