
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

interface FermentableDialogFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const FermentableDialogForm = ({ 
  open, 
  onOpenChange,
  onSubmit 
}: FermentableDialogFormProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Fermentable</DialogTitle>
          <DialogDescription>
            Create a new fermentable ingredient that will be available for all recipes
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={onSubmit} className="space-y-4">
          <FormField
            name="name"
            render={() => (
              <FormItem>
                <FormLabel>Name*</FormLabel>
                <FormControl>
                  <Input name="name" required />
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
                  <Input 
                    name="costPerUnit" 
                    type="number" 
                    step="0.01"
                    defaultValue="0"
                  />
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
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Fermentable</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
