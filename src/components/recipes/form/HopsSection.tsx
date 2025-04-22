
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import HopRow from "./hops/HopRow";

export const HopsSection = ({ form }) => {
  const [hops, setHops] = useState([{ id: 0 }]);

  const addHop = () => {
    setHops([...hops, { id: hops.length }]);
  };

  const removeHop = (id: number) => {
    if (hops.length <= 1) return;
    setHops(hops.filter((h) => h.id !== id));
  };

  // Safely ensure hops array for cost
  const watchedHops = form.watch("ingredients.hops");
  const hopsArray = Array.isArray(watchedHops) ? watchedHops : [];

  const calculateTotalCost = () => {
    return hopsArray.reduce((acc, hop) => {
      const amount = parseFloat(hop?.amount || '0') || 0;
      const cost = parseFloat(hop?.costPerUnit || '0') || 0;
      return acc + amount * cost;
    }, 0).toFixed(2);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Hops</h2>
        <div className="text-sm text-muted-foreground">
          Total Cost: ${calculateTotalCost()}
        </div>
      </div>
      {hops.map((hop, index) => (
        <HopRow
          key={hop.id}
          hop={hop}
          index={index}
          form={form}
          control={form.control}
          onRemove={removeHop}
        />
      ))}
      <Button type="button" onClick={addHop} className="w-full">
        <Plus className="h-4 w-4 mr-2" /> Add Hop
      </Button>
    </div>
  );
};
