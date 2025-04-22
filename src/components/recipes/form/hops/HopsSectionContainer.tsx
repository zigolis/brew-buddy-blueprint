
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import HopsRowsList from "./HopsRowsList";

const HopsSectionContainer = ({ form }) => {
  const [hops, setHops] = useState([{ id: 0 }]);

  const addHop = () => {
    setHops([...hops, { id: hops.length }]);
  };

  const removeHop = (id: number) => {
    if (hops.length <= 1) return;
    setHops(hops.filter((h) => h.id !== id));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Hops</h2>
      <HopsRowsList hops={hops} form={form} removeHop={removeHop} />
      <Button type="button" onClick={addHop} className="w-full">
        <Plus className="h-4 w-4 mr-2" /> Add Hop
      </Button>
    </div>
  );
};

export default HopsSectionContainer;
