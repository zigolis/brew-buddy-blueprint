
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { EquipmentDetails } from "@/components/equipment/EquipmentDetails";
import { useBrewContext } from "@/contexts/BrewContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ViewEquipment() {
  const { equipmentId } = useParams();
  const navigate = useNavigate();
  const { equipment } = useBrewContext();
  
  const equipmentItem = equipment.find(item => item.id === equipmentId);

  if (!equipmentItem) {
    navigate("/equipment");
    return null;
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Equipment Details</h1>
          <p className="text-muted-foreground">View your equipment details</p>
        </div>
        <EquipmentDetails equipment={equipmentItem} />
      </div>
    </Layout>
  );
}
