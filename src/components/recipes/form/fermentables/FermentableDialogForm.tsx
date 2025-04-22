
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import * as React from "react";

interface FermentableDialogFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const FermentableDialogForm = ({
  open,
  onOpenChange,
  onSubmit,
}: FermentableDialogFormProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent form submission from triggering navigation
    onSubmit(event);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Fermentable</DialogTitle>
          <DialogDescription>
            Create a new fermentable ingredient that will be available for all recipes
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            name="name"
            render={() => (
              <FormItem>
                <FormLabel>Name*</FormLabel>
                <FormControl>
                  <Input name="name" required autoFocus />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="type"
            render={() => (
              <FormItem>
                <FormLabel>Type*</FormLabel>
                <FormControl>
                  <select
                    name="type"
                    required
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-base md:text-sm"
                    defaultValue="Grain"
                  >
                    <option value="Grain">Grain</option>
                    <option value="Adjunct">Adjunct</option>
                    <option value="Sugar">Sugar</option>
                    <option value="Extract">Extract</option>
                    <option value="Dry Extract">Dry Extract</option>
                    <option value="Other">Other</option>
                  </select>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="color"
            render={() => (
              <FormItem>
                <FormLabel>Color (EBC)</FormLabel>
                <FormControl>
                  <Input
                    name="color"
                    type="number"
                    step="0.1"
                    placeholder="e.g. 5"
                    min="0"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="costPerUnit"
            render={() => (
              <FormItem>
                <FormLabel>Cost per kg ($)</FormLabel>
                <FormControl>
                  <Input name="costPerUnit" type="number" step="0.01" defaultValue="0" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="notes"
            render={() => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Input name="notes" />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Fermentable</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
