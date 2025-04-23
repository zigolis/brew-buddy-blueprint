
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

interface YeastDialogFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const YeastDialogForm = ({
  open,
  onOpenChange,
  onSubmit,
}: YeastDialogFormProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onSubmit(event);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Yeast</DialogTitle>
          <DialogDescription>
            Create a new yeast ingredient that will be available for all recipes
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
              name="type"
              render={() => (
                <FormItem>
                  <FormLabel>Type*</FormLabel>
                  <FormControl>
                    <select
                      name="type"
                      required
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-base md:text-sm"
                      defaultValue="Ale"
                    >
                      <option value="Ale">Ale</option>
                      <option value="Lager">Lager</option>
                      <option value="Wheat">Wheat</option>
                      <option value="Wine">Wine</option>
                      <option value="Champagne">Champagne</option>
                    </select>
                  </FormControl>
                </FormItem>
              )}
            />

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
                      defaultValue="Dry"
                    >
                      <option value="Dry">Dry</option>
                      <option value="Liquid">Liquid</option>
                      <option value="Slant">Slant</option>
                      <option value="Culture">Culture</option>
                    </select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              name="laboratory"
              render={() => (
                <FormItem>
                  <FormLabel>Laboratory</FormLabel>
                  <FormControl>
                    <Input name="laboratory" placeholder="e.g. Fermentis" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="productId"
              render={() => (
                <FormItem>
                  <FormLabel>Product ID</FormLabel>
                  <FormControl>
                    <Input name="productId" placeholder="e.g. US-05" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              name="minAttenuation"
              render={() => (
                <FormItem>
                  <FormLabel>Min Attenuation (%)</FormLabel>
                  <FormControl>
                    <Input 
                      name="minAttenuation" 
                      type="number" 
                      step="0.1"
                      placeholder="e.g. 73" 
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="maxAttenuation"
              render={() => (
                <FormItem>
                  <FormLabel>Max Attenuation (%)</FormLabel>
                  <FormControl>
                    <Input 
                      name="maxAttenuation" 
                      type="number" 
                      step="0.1"
                      placeholder="e.g. 77" 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            name="flocculation"
            render={() => (
              <FormItem>
                <FormLabel>Flocculation</FormLabel>
                <FormControl>
                  <select
                    name="flocculation"
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-base md:text-sm"
                    defaultValue=""
                  >
                    <option value="">Select flocculation</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Very High">Very High</option>
                  </select>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="costPerUnit"
            render={() => (
              <FormItem>
                <FormLabel>Cost per unit ($)</FormLabel>
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
            <Button type="submit">Add Yeast</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
