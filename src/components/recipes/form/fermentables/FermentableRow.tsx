
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { FermentableSearch } from "./FermentableSearch";

interface FermentableRowProps {
  index: number;
  fermentable: { id: number };
  form: any;
  onRemove: (id: number) => void;
  onCreateNew: (index: number) => void;
}

export const FermentableRow = ({
  index,
  fermentable,
  form,
  onRemove,
  onCreateNew
}: FermentableRowProps) => (
  <div
    key={fermentable.id}
    className="grid gap-6 md:grid-cols-5 items-end bg-muted/40 rounded-lg p-4 mb-2"
  >
    <FormField
      control={form.control}
      name={`ingredients.fermentables.${index}.name`}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Name*</FormLabel>
          <FermentableSearch
            index={index}
            value={field.value || ""}
            onChange={field.onChange}
            onSelect={(value) => {
              field.onChange(value);
            }}
            onCreateNew={() => onCreateNew(index)}
          />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name={`ingredients.fermentables.${index}.amount`}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Amount (g)*</FormLabel>
          <Input
            type="number"
            value={field.value?.toString() || ""}
            onChange={(e) => {
              const numValue = e.target.value ? Number(e.target.value) : 0;
              field.onChange(numValue);
            }}
          />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name={`ingredients.fermentables.${index}.type`}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Type</FormLabel>
          <select
            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-base md:text-sm"
            value={field.value || "Grain"}
            onChange={e => field.onChange(e.target.value)}
          >
            <option value="Grain">Grain</option>
            <option value="Adjunct">Adjunct</option>
            <option value="Sugar">Sugar</option>
            <option value="Extract">Extract</option>
            <option value="Dry Extract">Dry Extract</option>
            <option value="Other">Other</option>
          </select>
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name={`ingredients.fermentables.${index}.color`}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Color (EBC)</FormLabel>
          <Input
            type="number"
            step="0.1"
            min="0"
            value={field.value?.toString() || ""}
            onChange={(e) => {
              const val = e.target.value ? parseFloat(e.target.value) : undefined;
              field.onChange(val);
            }}
            placeholder="e.g. 5"
          />
        </FormItem>
      )}
    />

    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={() => onRemove(fermentable.id)}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  </div>
);
