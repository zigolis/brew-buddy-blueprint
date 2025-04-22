import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useBrewContext } from "@/contexts/BrewContext";
import { Button } from "@/components/ui/button";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Equipment } from "@/types/beer";

const EquipmentList = () => {
  const navigate = useNavigate();
  const { equipment, deleteEquipment } = useBrewContext();
  const { toast } = useToast();
  const [equipmentToDelete, setEquipmentToDelete] = useState<Equipment | null>(null);

  const handleDelete = () => {
    if (equipmentToDelete) {
      deleteEquipment(equipmentToDelete.id);
      toast({
        title: "Success",
        description: "Equipment deleted successfully"
      });
      setEquipmentToDelete(null);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Equipment</h1>
            <p className="text-muted-foreground">Manage your brewing equipment</p>
          </div>
          <Button onClick={() => navigate("/equipment/new")}>
            <Plus className="h-4 w-4 mr-2" />
            Add Equipment
          </Button>
        </div>

        {equipment.length > 0 ? (
          <div className="space-y-2">
            {equipment.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center justify-between border rounded-lg p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex-grow">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-muted-foreground text-sm">
                    {item.type} | {item.batchSize}L | Efficiency: {item.efficiency}% | ${item.cost}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/equipment/view/${item.id}`)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/equipment/edit/${item.id}`)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEquipmentToDelete(item)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border rounded-lg p-12 text-center">
            <p className="text-muted-foreground mb-4">No equipment added yet</p>
            <Button onClick={() => navigate("/equipment/new")}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Equipment
            </Button>
          </div>
        )}
      </div>

      <AlertDialog open={!!equipmentToDelete} onOpenChange={() => setEquipmentToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {equipmentToDelete?.name}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default EquipmentList;
