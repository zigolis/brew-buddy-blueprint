
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const WaterSection = ({ form }) => (
  <div className="space-y-4 mt-6">
    <h2 className="text-xl font-semibold">Water Profile</h2>
    <div className="grid gap-4 md:grid-cols-4">
      <FormField
        control={form.control}
        name="waterProfile.calcium"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Calcium (ppm)</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="waterProfile.magnesium"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Magnesium (ppm)</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="waterProfile.sodium"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sodium (ppm)</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="waterProfile.chloride"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Chloride (ppm)</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="waterProfile.sulfate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sulfate (ppm)</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="waterProfile.bicarbonate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bicarbonate (ppm)</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="waterProfile.ph"
        render={({ field }) => (
          <FormItem>
            <FormLabel>pH</FormLabel>
            <FormControl>
              <Input type="number" step="0.01" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
    <FormField
      control={form.control}
      name="waterProfile.notes"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Notes</FormLabel>
          <FormControl>
            <Textarea placeholder="Describe your water profile..." {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);
