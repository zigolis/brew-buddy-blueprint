
import { Layout } from "@/components/layout/Layout";

const EquipmentList = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Equipment</h1>
          <p className="text-muted-foreground">Manage your brewing equipment</p>
        </div>
        <div className="rounded-lg border p-8 text-center">
          <h2 className="text-2xl font-semibold">Coming Soon</h2>
          <p className="mt-2 text-muted-foreground">The equipment management functionality will be available soon.</p>
        </div>
      </div>
    </Layout>
  );
};

export default EquipmentList;
