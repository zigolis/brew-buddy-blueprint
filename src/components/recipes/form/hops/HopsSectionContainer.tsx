
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
    <section className="space-y-5">
      <h2 className="text-2xl font-bold tracking-tight mb-1 text-brewing-amber">Hops</h2>
      <HopsRowsList hops={hops} form={form} removeHop={removeHop} />
      <Button type="button" onClick={addHop} className="w-full bg-brewing-amber text-white hover:bg-brewing-amber/90 rounded-lg py-3 mt-2 shadow hover:shadow-md transition-all">
        <Plus className="h-4 w-4 mr-2" /> Add Hop
      </Button>
    </section>
  );
};

export default HopsSectionContainer;
