
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { EquipmentDetails } from "@/components/equipment/EquipmentDetails";
import { BackToHome } from "@/components/navigation/BackToHome";
import { useBrewContext } from "@/contexts/BrewContext";

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
      <BackToHome />
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Equipment Details</h1>
          <p className="text-muted-foreground">View your equipment details</p>
        </div>
        <div className="max-w-2xl">
          <EquipmentDetails equipment={equipmentItem} />
        </div>
      </div>
    </Layout>
  );
}
