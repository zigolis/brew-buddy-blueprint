import { DOMParser } from '@xmldom/xmldom';
import { 
  Recipe, 
  Style, 
  HopUse, 
  HopForm, 
  YeastForm,
  MiscForm 
} from '@/types/recipe';
import { v4 as uuidv4 } from 'uuid';
import { Fermentable, Hop, Yeast, Misc } from '@/types/ingredients';

// Simple XML parsing helper functions
function getElementText(node: any, tagName: string): string {
  const elements = node.getElementsByTagName(tagName);
  if (elements && elements.length > 0) {
    return elements[0].textContent || '';
  }
  return '';
}

function getElementFloat(node: any, tagName: string, defaultValue = 0): number {
  const text = getElementText(node, tagName);
  return text ? parseFloat(text) : defaultValue;
}

export function parseBeerXml(xmlContent: string): Recipe[] {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlContent, 'text/xml');
    
    const recipes: Recipe[] = [];
    const recipeNodes = xmlDoc.getElementsByTagName('RECIPE');
    
    for (let i = 0; i < recipeNodes.length; i++) {
      const recipeNode = recipeNodes[i];
      recipes.push(parseRecipe(recipeNode));
    }
    
    return recipes;
  } catch (error) {
    console.error('Error parsing BeerXML:', error);
    throw new Error('Failed to parse BeerXML file. Please check the file format.');
  }
}

function parseRecipe(recipeNode: any): Recipe {
  const now = new Date().toISOString();
  
  // Parse style
  const styleNodes = recipeNode.getElementsByTagName('STYLE');
  const styleNode = styleNodes.length > 0 ? styleNodes[0] : null;
  
  // Parse mash
  const mashNodes = recipeNode.getElementsByTagName('MASH');
  const mashNode = mashNodes.length > 0 ? mashNodes[0] : null;
  
  const recipe: Recipe = {
    id: uuidv4(),
    name: getElementText(recipeNode, 'NAME'),
    author: getElementText(recipeNode, 'BREWER'),
    type: getElementText(recipeNode, 'TYPE') as any,
    batchSize: getElementFloat(recipeNode, 'BATCH_SIZE'),
    boilSize: getElementFloat(recipeNode, 'BOIL_SIZE', 23),
    boilTime: getElementFloat(recipeNode, 'BOIL_TIME'),
    efficiency: getElementFloat(recipeNode, 'EFFICIENCY'),
    originalGravity: getElementFloat(recipeNode, 'OG', null),
    finalGravity: getElementFloat(recipeNode, 'FG', null),
    color: getElementFloat(recipeNode, 'COLOR', null),
    ibu: getElementFloat(recipeNode, 'IBU', null),
    abv: getElementFloat(recipeNode, 'ABV', null),
    style: parseStyle(styleNode),
    ingredients: {
      fermentables: parseFermentables(recipeNode),
      hops: parseHops(recipeNode),
      yeasts: parseYeasts(recipeNode),
      miscs: parseMiscs(recipeNode),
    },
    mash: parseMash(mashNode),
    fermentation: {
      name: 'Default Fermentation',
      type: 'Primary',
      temperature: 20,
      period: 14,
      steps: [],
      notes: '',
    },
    waterProfile: {
      name: 'Default Water Profile',
      calcium: 0,
      magnesium: 0,
      sodium: 0,
      chloride: 0,
      sulfate: 0,
      bicarbonate: 0,
      ph: 7.0,
      notes: '',
    },
    clarification: {
      name: 'Default Clarification',
      type: 'Whirlpool',
      amount: 0,
      temperature: 20,
      notes: '',
    },
    coldCrash: {
      name: 'Default Cold Crash',
      type: 'Standard',
      temperature: 2,
      period: 48,
      notes: '',
    },
    carbonation: {
      name: 'Default Carbonation',
      type: 'Natural',
      volumeCo2: 2.4,
      temperature: 20,
      period: 14,
      notes: '',
    },
    bottling: {
      name: 'Default Bottling',
      type: 'Bottle',
      temperature: 20,
      period: 14,
      notes: '',
    },
    boil: {
      name: 'Default Boil',
      time: getElementFloat(recipeNode, 'BOIL_TIME'),
      temperature: 100,
    },
    notes: getElementText(recipeNode, 'NOTES'),
    estimatedCost: 0, // Will be calculated later
    tags: [],
    createdAt: now,
    updatedAt: now,
  };
  
  // Calculate estimated cost based on ingredients
  recipe.estimatedCost = calculateIngredientCost(recipe);
  
  return recipe;
}

function parseStyle(styleNode: any): Style {
  if (!styleNode) {
    return {
      name: 'Unknown Style',
      category: 'Unknown',
      categoryNumber: '0',
      styleLetter: '',
      styleGuide: 'Unknown',
      type: 'Ale',
      minOg: 1.000,
      maxOg: 1.100,
      minFg: 1.000,
      maxFg: 1.030,
      minIbu: 0,
      maxIbu: 100,
      minColor: 0,
      maxColor: 40,
      minAbv: 0,
      maxAbv: 20,
      notes: '',
      profile: '',
      ingredients: '',
      examples: '',
    };
  }
  
  return {
    name: getElementText(styleNode, 'NAME'),
    category: getElementText(styleNode, 'CATEGORY'),
    categoryNumber: getElementText(styleNode, 'CATEGORY_NUMBER'),
    styleLetter: getElementText(styleNode, 'STYLE_LETTER'),
    styleGuide: getElementText(styleNode, 'STYLE_GUIDE'),
    type: getElementText(styleNode, 'TYPE') as any,
    minOg: getElementFloat(styleNode, 'OG_MIN'),
    maxOg: getElementFloat(styleNode, 'OG_MAX'),
    minFg: getElementFloat(styleNode, 'FG_MIN'),
    maxFg: getElementFloat(styleNode, 'FG_MAX'),
    minIbu: getElementFloat(styleNode, 'IBU_MIN'),
    maxIbu: getElementFloat(styleNode, 'IBU_MAX'),
    minColor: getElementFloat(styleNode, 'COLOR_MIN'),
    maxColor: getElementFloat(styleNode, 'COLOR_MAX'),
    minAbv: getElementFloat(styleNode, 'ABV_MIN'),
    maxAbv: getElementFloat(styleNode, 'ABV_MAX'),
    notes: getElementText(styleNode, 'NOTES'),
    profile: getElementText(styleNode, 'PROFILE'),
    ingredients: getElementText(styleNode, 'INGREDIENTS'),
    examples: getElementText(styleNode, 'EXAMPLES'),
  };
}

function parseFermentables(recipeNode: any): Fermentable[] {
  const fermentables: Fermentable[] = [];
  const fermentableNodes = recipeNode.getElementsByTagName('FERMENTABLE');
  
  for (let i = 0; i < fermentableNodes.length; i++) {
    const node = fermentableNodes[i];
    fermentables.push({
      id: uuidv4(),
      name: getElementText(node, 'NAME'),
      type: getElementText(node, 'TYPE'),
      amount: getElementFloat(node, 'AMOUNT'),
      yield: getElementFloat(node, 'YIELD'),
      color: getElementFloat(node, 'COLOR'),
      supplier: getElementText(node, 'SUPPLIER'),
      notes: getElementText(node, 'NOTES') || '',
      costPerUnit: getElementFloat(node, 'COST'),
    });
  }
  
  return fermentables;
}

function parseHops(recipeNode: any): Hop[] {
  const hops: Hop[] = [];
  const hopNodes = recipeNode.getElementsByTagName('HOP');
  
  for (let i = 0; i < hopNodes.length; i++) {
    const node = hopNodes[i];
    hops.push({
      id: uuidv4(),
      name: getElementText(node, 'NAME'),
      alpha: getElementFloat(node, 'ALPHA'),
      beta: getElementFloat(node, 'BETA', 0),
      amount: getElementFloat(node, 'AMOUNT'),
      use: getElementText(node, 'USE') as HopUse || 'Boil',
      time: getElementFloat(node, 'TIME'),
      form: getElementText(node, 'FORM') as HopForm || 'Pellet',
      notes: getElementText(node, 'NOTES') || '',
      costPerUnit: getElementFloat(node, 'COST'),
    });
  }
  
  return hops;
}

function parseYeasts(recipeNode: any): Yeast[] {
  const yeasts: Yeast[] = [];
  const yeastNodes = recipeNode.getElementsByTagName('YEAST');
  
  for (let i = 0; i < yeastNodes.length; i++) {
    const node = yeastNodes[i];
    const attenuation = getElementFloat(node, 'ATTENUATION');
    
    let yeastType = getElementText(node, 'TYPE');
    if (!['Ale', 'Lager', 'Wheat', 'Wine', 'Champagne'].includes(yeastType)) {
      yeastType = 'Ale';
    }
    
    yeasts.push({
      id: uuidv4(),
      name: getElementText(node, 'NAME'),
      type: yeastType as 'Ale' | 'Lager' | 'Wheat' | 'Wine' | 'Champagne',
      form: getElementText(node, 'FORM') as YeastForm || 'Liquid',
      laboratory: getElementText(node, 'LABORATORY'),
      productId: getElementText(node, 'PRODUCT_ID'),
      amount: getElementFloat(node, 'AMOUNT', 11.5),
      minAttenuation: attenuation,
      maxAttenuation: attenuation + 5,
      tempRange: {
        min: getElementFloat(node, 'MIN_TEMPERATURE'),
        max: getElementFloat(node, 'MAX_TEMPERATURE'),
      },
      flocculation: getElementText(node, 'FLOCCULATION') as 'Low' | 'Medium' | 'High' | 'Very High' || 'Medium',
      notes: getElementText(node, 'NOTES') || '',
      costPerUnit: getElementFloat(node, 'COST'),
    });
  }
  
  return yeasts;
}

function parseMiscs(recipeNode: any): Misc[] {
  const miscs: Misc[] = [];
  const miscNodes = recipeNode.getElementsByTagName('MISC');
  
  for (let i = 0; i < miscNodes.length; i++) {
    const node = miscNodes[i];
    miscs.push({
      id: uuidv4(),
      name: getElementText(node, 'NAME'),
      use: getElementText(node, 'USE'),
      time: getElementFloat(node, 'TIME'),
      amount: getElementFloat(node, 'AMOUNT'),
      form: 'Other',
      notes: getElementText(node, 'NOTES') || '',
      costPerUnit: getElementFloat(node, 'COST'),
    });
  }
  
  return miscs;
}

function parseMash(mashNode: any): MashProfile {
  if (!mashNode) {
    return {
      name: 'Default Mash',
      grainTemp: 20,
      mashTemp: 65,
      spargeTemp: 75,
      ph: 5.4,
      steps: [],
      notes: '',
    };
  }
  
  const mashSteps: MashStep[] = [];
  const mashStepNodes = mashNode.getElementsByTagName('MASH_STEP');
  
  for (let i = 0; i < mashStepNodes.length; i++) {
    const node = mashStepNodes[i];
    mashSteps.push({
      name: getElementText(node, 'NAME'),
      type: getElementText(node, 'TYPE') as any,
      temperature: getElementFloat(node, 'STEP_TEMP'),
      time: getElementFloat(node, 'STEP_TIME'),
    });
  }
  
  return {
    name: getElementText(mashNode, 'NAME'),
    grainTemp: getElementFloat(mashNode, 'GRAIN_TEMP'),
    mashTemp: getElementFloat(mashNode, 'MASH_TEMP'),
    spargeTemp: getElementFloat(mashNode, 'SPARGE_TEMP'),
    ph: getElementFloat(mashNode, 'PH'),
    steps: mashSteps,
    notes: getElementText(mashNode, 'NOTES'),
  };
}

function calculateIngredientCost(recipe: Recipe): number {
  let totalCost = 0;
  
  // Add fermentable costs
  recipe.ingredients?.fermentables.forEach(fermentable => {
    totalCost += fermentable.amount * fermentable.costPerUnit;
  });
  
  // Add hop costs
  recipe.ingredients?.hops.forEach(hop => {
    totalCost += hop.amount * hop.costPerUnit;
  });
  
  // Add yeast costs
  recipe.ingredients?.yeasts.forEach(yeast => {
    totalCost += yeast.costPerUnit;
  });
  
  // Add misc costs
  recipe.ingredients?.miscs.forEach(misc => {
    totalCost += misc.amount * misc.costPerUnit;
  });
  
  return totalCost;
}

export function serializeToXml(recipe: Recipe): string {
  // Implementation of serializing a recipe to BeerXML format
  // This would be implemented for export functionality
  return ''; // Placeholder for now
}
