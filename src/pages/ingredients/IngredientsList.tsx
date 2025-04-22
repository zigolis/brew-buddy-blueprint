
import { Layout } from "@/components/layout/Layout";

const IngredientsList = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Ingredients</h1>
          <p className="text-muted-foreground">Manage your brewing ingredients</p>
        </div>
        <div className="rounded-lg border p-8 text-center">
          <h2 className="text-2xl font-semibold">Coming Soon</h2>
          <p className="mt-2 text-muted-foreground">The ingredients management functionality will be available soon.</p>
        </div>
      </div>
    </Layout>
  );
};

export default IngredientsList;
