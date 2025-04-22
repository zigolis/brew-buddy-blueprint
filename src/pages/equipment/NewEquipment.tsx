
import { Layout } from "@/components/layout/Layout";
import { EquipmentForm } from "@/components/equipment/EquipmentForm";
import { BackToHome } from "@/components/navigation/BackToHome";

export default function NewEquipment() {
  return (
    <Layout>
      <BackToHome />
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Add New Equipment</h1>
          <p className="text-muted-foreground">Add new brewing equipment to your inventory</p>
        </div>
        <div className="max-w-2xl">
          <EquipmentForm />
        </div>
      </div>
    </Layout>
  );
}
