import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export const YeastSection = ({ form }) => {
  const [yeasts, setYeasts] = useState([{ id: 0 }]);

  const addYeast = () => {
    setYeasts([...yeasts, { id: yeasts.length }]);
  };

  const removeYeast = (id: number) => {
    if (yeasts.length <= 1) return;
    setYeasts(yeasts.filter(y => y.id !== id));
  };

  return (
    <section className="space-y-5">
      <h2 className="text-2xl font-bold tracking-tight mb-1 text-brewing-amber">Yeast</h2>
      {yeasts.map((yeast, index) => (
        <div key={yeast.id} className="grid gap-4 md:grid-cols-4 items-end bg-muted/40 rounded-lg p-4 mb-2">
          <FormField
            control={form.control}
            name={`ingredients.yeasts.${index}.name`}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Name*</FormLabel>
                <FormControl>
                  <Input placeholder="Yeast name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`ingredients.yeasts.${index}.amount`}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Amount (g)*</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`ingredients.yeasts.${index}.form`}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Form</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. dry, liquid" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => removeYeast(yeast.id)}
            disabled={yeasts.length <= 1}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button type="button" onClick={addYeast} className="w-full bg-brewing-amber text-white hover:bg-brewing-amber/90 rounded-lg py-3 mt-2 shadow hover:shadow-md transition-all">
        <Plus className="h-4 w-4 mr-2" /> Add Yeast
      </Button>
    </section>
  );
};
