
import { Equipment } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EquipmentDetailsProps {
  equipment: Equipment;
}

export function EquipmentDetails({ equipment }: EquipmentDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{equipment.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Type</p>
            <p className="font-medium">{equipment.type}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Batch Size</p>
            <p className="font-medium">{equipment.batchSize}L</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Boil Size</p>
            <p className="font-medium">{equipment.boilSize}L</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Boil Time</p>
            <p className="font-medium">{equipment.boilTime} minutes</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Efficiency</p>
            <p className="font-medium">{equipment.efficiency}%</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Cost</p>
            <p className="font-medium">${equipment.cost}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Purchase Date</p>
            <p className="font-medium">{equipment.purchaseDate}</p>
          </div>
        </div>
        {equipment.notes && (
          <div>
            <p className="text-sm text-muted-foreground">Notes</p>
            <p className="font-medium">{equipment.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
