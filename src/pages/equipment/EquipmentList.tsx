
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { BackToHome } from "@/components/navigation/BackToHome";
import { useBrewContext } from "@/contexts/BrewContext";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Plus, Eye, Pencil, Trash } from "lucide-react";
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
      <BackToHome />
      <div className="space-y-6">
        <div className="flex justify-between items-center">
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
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Batch Size</TableHead>
                  <TableHead>Efficiency</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {equipment.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.batchSize}L</TableCell>
                    <TableCell>{item.efficiency}%</TableCell>
                    <TableCell>${item.cost}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => navigate(`/equipment/view/${item.id}`)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => navigate(`/equipment/edit/${item.id}`)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEquipmentToDelete(item)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-12 border rounded-lg">
            <p className="text-muted-foreground">No equipment added yet</p>
            <Button onClick={() => navigate("/equipment/new")} className="mt-4">
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
