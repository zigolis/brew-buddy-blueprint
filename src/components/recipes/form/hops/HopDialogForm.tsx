
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

interface HopDialogFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const HopDialogForm = ({
  open,
  onOpenChange,
  onSubmit,
}: HopDialogFormProps) => {
  // Make sure we're properly preventing default behavior to avoid form navigation
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // This is crucial to prevent form submission from triggering navigation
    event.stopPropagation(); // Also stop propagation to prevent bubbling up
    onSubmit(event);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Hop</DialogTitle>
          <DialogDescription>
            Create a new hop ingredient that will be available for all recipes
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

          <div className="grid grid-cols-2 gap-4">
            <FormField
              name="alpha"
              render={() => (
                <FormItem>
                  <FormLabel>Alpha (%)*</FormLabel>
                  <FormControl>
                    <Input 
                      name="alpha" 
                      type="number" 
                      step="0.1" 
                      required
                      placeholder="e.g. 5.5" 
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="beta"
              render={() => (
                <FormItem>
                  <FormLabel>Beta (%)</FormLabel>
                  <FormControl>
                    <Input 
                      name="beta" 
                      type="number" 
                      step="0.1"
                      placeholder="e.g. 4.2" 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              name="form"
              render={() => (
                <FormItem>
                  <FormLabel>Form*</FormLabel>
                  <FormControl>
                    <select
                      name="form"
                      required
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-base md:text-sm"
                      defaultValue="Pellet"
                    >
                      <option value="Pellet">Pellet</option>
                      <option value="Whole">Whole</option>
                      <option value="Plug">Plug</option>
                      <option value="Leaf">Leaf</option>
                    </select>
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
          </div>

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
            <Button type="submit">Add Hop</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
