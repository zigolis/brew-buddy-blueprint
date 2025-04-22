import { v4 as uuidv4 } from 'uuid';
import { Recipe } from '@/types';

const now = new Date().toISOString();

export const mockRecipes: Recipe[] = [
  {
    id: uuidv4(),
    name: 'Classic American Pale Ale',
    author: 'BrewMaster',
    type: 'All Grain',
    batchSize: 20,
    boilTime: 60,
    efficiency: 75,
    style: {
      name: 'American Pale Ale',
      category: 'Pale American Ale',
      categoryNumber: '18',
      styleLetter: 'B',
      styleGuide: 'BJCP 2015',
      type: 'Ale',
      minOg: 1.045,
      maxOg: 1.060,
      minFg: 1.010,
      maxFg: 1.015,
      minIbu: 30,
      maxIbu: 50,
      minColor: 5,
      maxColor: 10,
      minAbv: 4.5,
      maxAbv: 6.2,
      notes: 'A pale, refreshing and hoppy ale, yet with sufficient supporting malt to make the beer balanced and drinkable.',
      profile: 'Moderate to strong hop aroma from American or New World hop varieties with a wide range of possible characteristics.',
      ingredients: 'Pale ale malt, American or New World hops, clean American yeast.',
      examples: 'Sierra Nevada Pale Ale, Stone Pale Ale, Great Lakes Burning River Pale Ale',
    },
    ingredients: {
      fermentables: [
        {
          id: uuidv4(),
          name: 'Pale Ale Malt (2-Row)',
          type: 'Grain',
          amount: 4.5,
          yield: 80,
          color: 3.5,
          supplier: 'Briess',
          notes: 'Base malt for all ales',
          costPerUnit: 2.2,
        },
        {
          id: uuidv4(),
          name: 'Crystal Malt 40L',
          type: 'Grain',
          amount: 0.5,
          yield: 74,
          color: 40,
          supplier: 'Briess',
          notes: 'Adds sweetness and color',
          costPerUnit: 2.4,
        }
      ],
      hops: [
        {
          id: uuidv4(),
          name: 'Cascade',
          alpha: 5.5,
          amount: 0.028,
          use: 'Boil',
          time: 60,
          form: 'Pellet',
          notes: 'Bittering addition',
          costPerUnit: 25,
        },
        {
          id: uuidv4(),
          name: 'Cascade',
          alpha: 5.5,
          amount: 0.028,
          use: 'Boil',
          time: 15,
          form: 'Pellet',
          notes: 'Flavor addition',
          costPerUnit: 25,
        },
        {
          id: uuidv4(),
          name: 'Cascade',
          alpha: 5.5,
          amount: 0.028,
          use: 'Boil',
          time: 0,
          form: 'Pellet',
          notes: 'Aroma addition',
          costPerUnit: 25,
        }
      ],
      yeasts: [
        {
          id: uuidv4(),
          name: 'American Ale',
          type: 'Ale',
          form: 'Liquid',
          laboratory: 'Wyeast',
          productId: '1056',
          amount: 11.5,
          minAttenuation: 73,
          maxAttenuation: 77,
          tempRange: {
            min: 15.6,
            max: 22.2,
          },
          flocculation: 'Medium',
          notes: 'Very clean, crisp flavor characteristics with low fruitiness and mild ester production.',
          costPerUnit: 8,
        }
      ],
      miscs: []
    },
    mash: {
      name: 'Single Infusion, Medium Body',
      grainTemp: 22,
      mashTemp: 67,
      spargeTemp: 75,
      ph: 5.4,
      steps: [
        {
          name: 'Mash In',
          type: 'Infusion',
          temperature: 67,
          time: 60,
        },
        {
          name: 'Mash Out',
          type: 'Temperature',
          temperature: 75,
          time: 10,
        }
      ],
      notes: 'Simple single infusion mash.',
    },
    fermentation: {
      name: 'Ale, Single Stage',
      type: 'Primary',
      temperature: 20,
      period: 14,
      notes: 'Ferment at 20°C for 2 weeks.',
      steps: [
        {
          name: 'Primary',
          temperature: 20,
          time: 14,
        }
      ]
    },
    waterProfile: {
      name: 'Balanced Profile',
      calcium: 80,
      magnesium: 5,
      sodium: 25,
      chloride: 75,
      sulfate: 80,
      bicarbonate: 100,
      ph: 7.0,
      notes: 'Balanced water profile suitable for pale ales.',
    },
    boil: {
      name: 'Standard Boil',
      time: 60,
      temperature: 100
    },
    clarification: {
      name: 'Standard Clarification',
      type: 'Whirlpool',
      amount: 0,
      temperature: 20,
      notes: ''
    },
    coldCrash: {
      name: 'Standard Cold Crash',
      type: 'Standard',
      temperature: 2,
      period: 48,
      notes: ''
    },
    carbonation: {
      name: 'Standard Carbonation',
      type: 'Natural',
      volumeCo2: 2.4,
      temperature: 20,
      period: 14,
      notes: ''
    },
    bottling: {
      name: 'Standard Bottling',
      type: 'Bottle',
      temperature: 20,
      period: 14,
      notes: ''
    },
    notes: 'A classic American pale ale with Cascade hops providing a signature citrus and floral character.',
    estimatedCost: 25,
    tags: ['pale ale', 'american', 'cascade', 'classic'],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: uuidv4(),
    name: 'Irish Stout',
    author: 'BrewMaster',
    type: 'All Grain',
    batchSize: 19,
    boilTime: 60,
    efficiency: 72,
    style: {
      name: 'Irish Stout',
      category: 'Dark British Beer',
      categoryNumber: '15',
      styleLetter: 'B',
      styleGuide: 'BJCP 2015',
      type: 'Ale',
      minOg: 1.036,
      maxOg: 1.044,
      minFg: 1.007,
      maxFg: 1.011,
      minIbu: 25,
      maxIbu: 45,
      minColor: 25,
      maxColor: 40,
      minAbv: 4.0,
      maxAbv: 4.5,
      notes: 'A black beer with a pronounced roasted flavor, often similar to coffee.',
      profile: 'Medium to high hop bitterness, moderate to high hop flavor and aroma.',
      ingredients: 'Pale ale malt, flaked barley, roasted barley, and often other dark malts.',
      examples: 'Guinness Draught, Murphy\'s Irish Stout, Beamish Irish Stout',
    },
    ingredients: {
      fermentables: [
        {
          id: uuidv4(),
          name: 'Pale Ale Malt',
          type: 'Grain',
          amount: 3.4,
          yield: 82,
          color: 3,
          supplier: 'Muntons',
          notes: 'Base malt',
          costPerUnit: 2.1,
        },
        {
          id: uuidv4(),
          name: 'Flaked Barley',
          type: 'Adjunct',
          amount: 0.7,
          yield: 70,
          color: 2,
          supplier: 'Briess',
          notes: 'Adds body and head retention',
          costPerUnit: 2.5,
        },
        {
          id: uuidv4(),
          name: 'Roasted Barley',
          type: 'Grain',
          amount: 0.35,
          yield: 55,
          color: 500,
          supplier: 'Briess',
          notes: 'Adds color and roasted flavor',
          costPerUnit: 2.8,
        }
      ],
      hops: [
        {
          id: uuidv4(),
          name: 'East Kent Goldings',
          alpha: 5.0,
          amount: 0.05,
          use: 'Boil',
          time: 60,
          form: 'Pellet',
          notes: 'Bittering addition',
          costPerUnit: 30,
        }
      ],
      yeasts: [
        {
          id: uuidv4(),
          name: 'Irish Ale',
          type: 'Ale',
          form: 'Liquid',
          laboratory: 'White Labs',
          productId: 'WLP004',
          amount: 11.5,
          minAttenuation: 69,
          maxAttenuation: 74,
          tempRange: {
            min: 18,
            max: 20,
          },
          flocculation: 'Medium',
          notes: 'Produces a slight hint of diacetyl balanced by a light fruitiness.',
          costPerUnit: 9,
        }
      ],
      miscs: []
    },
    mash: {
      name: 'Single Infusion, Medium Body',
      grainTemp: 20,
      mashTemp: 66,
      spargeTemp: 76,
      ph: 5.2,
      steps: [
        {
          name: 'Mash In',
          type: 'Infusion',
          temperature: 66,
          time: 60,
        }
      ],
      notes: 'Standard single infusion mash.',
    },
    fermentation: {
      name: 'Ale, Single Stage',
      type: 'Primary',
      temperature: 19,
      period: 14,
      notes: 'Ferment at 19°C for 2 weeks.',
      steps: [
        {
          name: 'Primary',
          temperature: 19,
          time: 14,
        }
      ]
    },
    waterProfile: {
      name: 'Dublin',
      calcium: 115,
      magnesium: 4,
      sodium: 12,
      chloride: 19,
      sulfate: 55,
      bicarbonate: 200,
      ph: 8.0,
      notes: 'Water profile similar to Dublin. High in carbonates which suits dark beers.',
    },
    boil: {
      name: 'Standard Boil',
      time: 60,
      temperature: 100
    },
    clarification: {
      name: 'Standard Clarification',
      type: 'Whirlpool',
      amount: 0,
      temperature: 20,
      notes: ''
    },
    coldCrash: {
      name: 'Standard Cold Crash',
      type: 'Standard',
      temperature: 2,
      period: 48,
      notes: ''
    },
    carbonation: {
      name: 'Standard Carbonation',
      type: 'Natural',
      volumeCo2: 2.4,
      temperature: 20,
      period: 14,
      notes: ''
    },
    bottling: {
      name: 'Standard Bottling',
      type: 'Bottle',
      temperature: 20,
      period: 14,
      notes: ''
    },
    notes: 'Classic Irish stout with a dry finish and roasted barley character.',
    estimatedCost: 22,
    tags: ['stout', 'irish', 'dry', 'roasted'],
    createdAt: now,
    updatedAt: now,
  }
];
