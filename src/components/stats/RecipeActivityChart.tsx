
import { useBrewContext } from "@/contexts/BrewContext";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export function RecipeActivityChart() {
  const { recipes } = useBrewContext();
  
  // Process recipes to get monthly counts for the current year
  const currentYear = new Date().getFullYear();
  const monthlyData = Array(12).fill(0).map((_, index) => {
    const month = new Date(currentYear, index).toLocaleString('default', { month: 'short' });
    const count = recipes.filter(recipe => {
      const recipeDate = new Date(recipe.createdAt);
      return recipeDate.getFullYear() === currentYear && recipeDate.getMonth() === index;
    }).length;
    
    return {
      month,
      recipes: count,
    };
  });

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recipe Activity {currentYear}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 pb-4">
        <div className="h-[200px] w-full px-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={monthlyData}
              margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                fontSize={12}
                tick={{ fontSize: 10 }}
                tickMargin={5}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
                fontSize={12}
                tick={{ fontSize: 10 }}
                width={25}
              />
              <ChartTooltip 
                content={<ChartTooltipContent />} 
              />
              <Area
                type="monotone"
                dataKey="recipes"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#gradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
