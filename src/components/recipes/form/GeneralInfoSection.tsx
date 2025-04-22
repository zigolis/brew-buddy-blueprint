
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const GeneralInfoSection = ({ form }) => {
  return (
    <section className="space-y-5">
      <h2 className="text-2xl font-bold tracking-tight mb-1 text-brewing-amber">General Information</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="name"
          rules={{ required: "Recipe name is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipe Name<span className="text-red-600">*</span></FormLabel>
              <FormControl>
                <Input placeholder="Enter recipe name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brewer</FormLabel>
              <FormControl>
                <Input placeholder="Enter brewer name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="style.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Beer Style</FormLabel>
              <FormControl>
                <Input placeholder="Enter beer style" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Notes</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter recipe notes"
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </section>
  );
};

