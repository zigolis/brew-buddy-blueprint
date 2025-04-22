
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Recipe } from '@/types';

interface IngredientsListProps {
  recipe: Recipe;
}

export function IngredientsList({ recipe }: IngredientsListProps) {
  const { ingredients } = recipe;
  
  const formatAmount = (amount: number, unit: string = 'g') => {
    if (amount >= 1000 && unit === 'g') {
      return `${(amount / 1000).toFixed(2)} kg`;
    }
    return `${amount} ${unit}`;
  };
  
  return (
    <div className="space-y-4">
      {ingredients.fermentables && ingredients.fermentables.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Fermentables</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y">
              {ingredients.fermentables.map((fermentable, index) => (
                <li key={`ferm-${index}`} className="py-2 flex justify-between items-center">
                  <span className="font-medium">{fermentable.name}</span>
                  <span className="text-muted-foreground">
                    {formatAmount(fermentable.amount, fermentable.unit || 'g')}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      
      {ingredients.hops && ingredients.hops.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Hops</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y">
              {ingredients.hops.map((hop, index) => (
                <li key={`hop-${index}`} className="py-2 flex justify-between items-center">
                  <div>
                    <span className="font-medium">{hop.name}</span>
                    {hop.use && <span className="text-sm text-muted-foreground ml-2">({hop.use})</span>}
                  </div>
                  <span className="text-muted-foreground">
                    {formatAmount(hop.amount, hop.unit || 'g')}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
