
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useBrewContext } from "@/contexts/BrewContext";
import { Equipment } from "@/types/beer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface EquipmentFormProps {
  equipment?: Equipment;
  onSubmit?: () => void;
}

export function EquipmentForm({ equipment, onSubmit }: EquipmentFormProps) {
  const { addEquipment, updateEquipment } = useBrewContext();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<Partial<Equipment>>(
    equipment || {
      name: "",
      type: "",
      batchSize: 0,
      boilSize: 0,
      boilTime: 60,
      efficiency: 75,
      notes: "",
      cost: 0,
      purchaseDate: new Date().toISOString().split('T')[0]
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.type) {
      toast({
        title: "Error",
        description: "Name and type are required",
        variant: "destructive"
      });
      return;
    }

    const equipmentData: Equipment = {
      ...formData,
      id: equipment?.id || uuidv4()
    } as Equipment;

    if (equipment) {
      updateEquipment(equipment.id, equipmentData);
      toast({
        title: "Success",
        description: "Equipment updated successfully"
      });
    } else {
      addEquipment(equipmentData);
      toast({
        title: "Success",
        description: "Equipment added successfully"
      });
    }

    if (onSubmit) {
      onSubmit();
    } else {
      navigate("/equipment");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <Input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Equipment name"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Type</label>
        <Input
          type="text"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          placeholder="Equipment type"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Batch Size (L)</label>
        <Input
          type="number"
          value={formData.batchSize}
          onChange={(e) => setFormData({ ...formData, batchSize: Number(e.target.value) })}
          placeholder="Batch size in liters"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Boil Size (L)</label>
        <Input
          type="number"
          value={formData.boilSize}
          onChange={(e) => setFormData({ ...formData, boilSize: Number(e.target.value) })}
          placeholder="Boil size in liters"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Boil Time (min)</label>
        <Input
          type="number"
          value={formData.boilTime}
          onChange={(e) => setFormData({ ...formData, boilTime: Number(e.target.value) })}
          placeholder="Boil time in minutes"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Efficiency (%)</label>
        <Input
          type="number"
          value={formData.efficiency}
          onChange={(e) => setFormData({ ...formData, efficiency: Number(e.target.value) })}
          placeholder="Efficiency percentage"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Cost</label>
        <Input
          type="number"
          value={formData.cost}
          onChange={(e) => setFormData({ ...formData, cost: Number(e.target.value) })}
          placeholder="Equipment cost"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Purchase Date</label>
        <Input
          type="date"
          value={formData.purchaseDate}
          onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Notes</label>
        <Input
          type="text"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Additional notes"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => navigate("/equipment")}>
          Cancel
        </Button>
        <Button type="submit">
          {equipment ? "Update Equipment" : "Add Equipment"}
        </Button>
      </div>
    </form>
  );
}
