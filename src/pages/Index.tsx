
import { Layout } from "@/components/layout/Layout";
import { useBrewContext } from "@/contexts/BrewContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Recipe } from "@/types";
import { ModernActivityChart } from "@/components/stats/ModernActivityChart";
import { Beer, GaugeCircle, Package, Calendar } from "lucide-react";

export default function Home() {
  const { recipes } = useBrewContext();

  // Calculate brewing statistics
  const recipeCount = recipes.length || 0;
  const brewedCount = recipes.filter(r => r.isBrewed).length || 0;
  const averageAbv = calculateAverageAbv(recipes);
  const upcomingBrews = recipes.filter(r => isUpcomingBrew(r)).length || 0;

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your brewing dashboard
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Recipes"
            value={recipeCount}
            description="Recipes in your collection"
            icon={<Beer className="h-6 w-6 text-blue-500" />}
          />
          <StatCard
            title="Brewed"
            value={brewedCount}
            description="Recipes you've brewed"
            icon={<Package className="h-6 w-6 text-amber-500" />}
          />
          <StatCard
            title="Average ABV"
            value={averageAbv}
            description="Across all recipes"
            icon={<GaugeCircle className="h-6 w-6 text-green-500" />}
            valueFormatted={`${averageAbv}%`}
          />
          <StatCard
            title="Upcoming Brews"
            value={upcomingBrews}
            description="Planned brewing sessions"
            icon={<Calendar className="h-6 w-6 text-purple-500" />}
          />
        </div>

        {/* Activity Chart */}
        <ModernActivityChart data={[]} className="mt-8" />
      </div>
    </Layout>
  );
}

function StatCard({ title, value, description, icon, valueFormatted }: { 
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
  valueFormatted?: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{valueFormatted || value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function calculateAverageAbv(recipes: Recipe[]): number {
  if (!recipes.length) return 0;
  
  const recipesWithAbv = recipes.filter(r => r.abv !== null && r.abv !== undefined);
  if (!recipesWithAbv.length) return 0;
  
  const totalAbv = recipesWithAbv.reduce((sum, recipe) => sum + (recipe.abv || 0), 0);
  return Number((totalAbv / recipesWithAbv.length).toFixed(1));
}

function isUpcomingBrew(recipe: Recipe): boolean {
  // Mock function - in a real app this would check scheduled brewing dates
  return false;
}
