
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import HopNameField from "./HopNameField";

interface HopRowProps {
  form: any;
  control: any;
  index: number;
  hop: { id: number };
  onRemove: (id: number) => void;
}

export default function HopRow({ form, control, index, hop, onRemove }: HopRowProps) {
  const watchedHop = form.watch(`ingredients.hops.${index}`) || {};

  return (
    <div className="grid gap-6 md:grid-cols-8 items-end bg-muted/40 rounded-lg p-4 mb-2">
      <HopNameField control={control} form={form} index={index} value={watchedHop.name || ""} />

      <FormField
        control={control}
        name={`ingredients.hops.${index}.amount`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Amount (g)*</FormLabel>
            <FormControl>
              <Input
                type="number"
                step="0.1"
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
        control={control}
        name={`ingredients.hops.${index}.alpha`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Alpha (%)</FormLabel>
            <FormControl>
              <Input
                type="number"
                step="0.01"
                min="0"
                {...field}
                onChange={(e) => {
                  const value = e.target.value ? parseFloat(e.target.value) : 0;
                  field.onChange(isNaN(value) ? 0 : value);
                }}
                placeholder="e.g. 5.5"
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`ingredients.hops.${index}.beta`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Beta (%)</FormLabel>
            <FormControl>
              <Input
                type="number"
                step="0.01"
                min="0"
                {...field}
                onChange={(e) => {
                  const value = e.target.value ? parseFloat(e.target.value) : 0;
                  field.onChange(isNaN(value) ? 0 : value);
                }}
                placeholder="e.g. 4.2"
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`ingredients.hops.${index}.time`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Time (min)*</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) => {
                  const value = e.target.value ? parseInt(e.target.value) : 0;
                  field.onChange(isNaN(value) ? 0 : value);
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`ingredients.hops.${index}.use`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Use</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value || "Boil"}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select use" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Boil">Boil</SelectItem>
                <SelectItem value="Dry Hop">Dry Hop</SelectItem>
                <SelectItem value="Mash">Mash</SelectItem>
                <SelectItem value="First Wort">First Wort</SelectItem>
                <SelectItem value="Aroma">Aroma</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`ingredients.hops.${index}.form`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Form</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value || "Pellet"}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select form" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Pellet">Pellet</SelectItem>
                <SelectItem value="Plug">Plug</SelectItem>
                <SelectItem value="Leaf">Leaf</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => onRemove(hop.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
