
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Plus } from "lucide-react";
import { YeastNameField } from "./yeast/YeastNameField";
import { Textarea } from "@/components/ui/textarea";

export const YeastSection = ({ form }) => {
  const [yeasts, setYeasts] = useState([{ id: 0 }]);
  
  const addYeast = () => {
    setYeasts([...yeasts, { id: yeasts.length }]);
  };
  
  const removeYeast = (id: number) => {
    if (yeasts.length <= 1) return;
    setYeasts(yeasts.filter((y) => y.id !== id));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Yeast</h2>
      
      {yeasts.map((yeast, index) => (
        <div key={yeast.id} className="border rounded-lg p-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2 items-end">
            <YeastNameField control={form.control} index={index} form={form} />
            
            <FormField
              control={form.control}
              name={`ingredients.yeasts.${index}.amount`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="1"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value ? parseFloat(e.target.value) : 0;
                        field.onChange(isNaN(value) ? 0 : value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name={`ingredients.yeasts.${index}.type`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value || "Ale"}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Ale">Ale</SelectItem>
                      <SelectItem value="Lager">Lager</SelectItem>
                      <SelectItem value="Wheat">Wheat</SelectItem>
                      <SelectItem value="Wine">Wine</SelectItem>
                      <SelectItem value="Champagne">Champagne</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name={`ingredients.yeasts.${index}.form`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Form</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value || "Dry"}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select form" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Dry">Dry</SelectItem>
                      <SelectItem value="Liquid">Liquid</SelectItem>
                      <SelectItem value="Slant">Slant</SelectItem>
                      <SelectItem value="Culture">Culture</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            
            {yeasts.length > 1 && (
              <Button
                type="button"
                variant="destructive"
                onClick={() => removeYeast(yeast.id)}
                className="mt-2"
              >
                Remove
              </Button>
            )}
          </div>
        </div>
      ))}
      
      <Button
        type="button"
        onClick={addYeast}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" /> Add Yeast
      </Button>

      <FormField
        control={form.control}
        name="yeastNotes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Notes</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Add notes about your yeast here..."
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
