
import { Layout } from "@/components/layout/Layout";
import { BackToHome } from "@/components/navigation/BackToHome";

const CostCalculator = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <BackToHome />
        <div>
          <h1 className="text-3xl font-bold">Cost Calculator</h1>
          <p className="text-muted-foreground">Calculate and analyze your brewing costs</p>
        </div>
        <div className="rounded-lg border p-8 text-center">
          <h2 className="text-2xl font-semibold">Coming Soon</h2>
          <p className="mt-2 text-muted-foreground">The cost calculator functionality will be available soon.</p>
        </div>
      </div>
    </Layout>
  );
};

export default CostCalculator;
