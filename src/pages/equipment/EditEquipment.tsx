
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { EquipmentForm } from "@/components/equipment/EquipmentForm";
import { useBrewContext } from "@/contexts/BrewContext";

export default function EditEquipment() {
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
          <h1 className="text-3xl font-bold">Edit Equipment</h1>
          <p className="text-muted-foreground">Modify your equipment details</p>
        </div>
        <div className="max-w-2xl">
          <EquipmentForm equipment={equipmentItem} />
        </div>
      </div>
    </Layout>
  );
}
