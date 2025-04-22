
import { Layout } from "@/components/layout/Layout";
import { EquipmentForm } from "@/components/equipment/EquipmentForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewEquipment() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Add New Equipment</h1>
          <p className="text-muted-foreground">Add new brewing equipment to your inventory</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Equipment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <EquipmentForm />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
