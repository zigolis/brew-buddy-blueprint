
import { useState } from "react";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { YeastDialogForm } from "./yeasts/YeastDialogForm";
import { useIngredientSuggestions } from "@/hooks/useIngredientSuggestions";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const YeastSection = ({ form }) => {
  const [yeasts, setYeasts] = useState([{ id: 0 }]);
  const [showNewYeastDialog, setShowNewYeastDialog] = useState(false);
  const { addNewYeast, getYeastSuggestions } = useIngredientSuggestions();

  const addYeast = () => {
    const currentYeasts = form.getValues('ingredients.yeasts') || [];
    const newId = currentYeasts.length > 0
      ? Math.max(...currentYeasts.map(y => parseInt(y.id))) + 1
      : 0;

    setYeasts([...yeasts, { id: newId }]);
    form.setValue(
      `ingredients.yeasts.${currentYeasts.length}`,
      {
        id: newId,
        name: '',
        type: 'Ale',
        form: 'Dry',
        amount: 1,
        costPerUnit: 0,
        notes: ''
      },
      { shouldDirty: true, shouldTouch: true }
    );
  };

  const removeYeast = (id: number) => {
    const currentYeasts = form.getValues('ingredients.yeasts') || [];
    if (currentYeasts.length <= 1) return;
    
    const filtered = currentYeasts.filter((_, index) => index !== id);
    form.setValue('ingredients.yeasts', filtered);
    setYeasts(yeasts.filter((_, index) => index !== id));
  };

  const handleAddNewYeast = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const yeastData = {
      name: formData.get('name') as string,
      type: formData.get('type') as string,
      form: formData.get('form') as string,
      laboratory: formData.get('laboratory') as string,
      productId: formData.get('productId') as string,
      minAttenuation: parseFloat(formData.get('minAttenuation') as string) || undefined,
      maxAttenuation: parseFloat(formData.get('maxAttenuation') as string) || undefined,
      flocculation: formData.get('flocculation') as string,
      costPerUnit: parseFloat(formData.get('costPerUnit') as string) || 0,
      notes: formData.get('notes') as string || '',
      amount: 1
    };
    
    addNewYeast(yeastData);
    setShowNewYeastDialog(false);
  };

  const YeastRow = ({ index }) => {
    const watchedYeast = form.watch(`ingredients.yeasts.${index}`) || {};
    const [openNamePopover, setOpenNamePopover] = useState(false);
    const [searchQuery, setSearchQuery] = useState(watchedYeast.name || '');
    
    const getSuggestions = (query: string) => {
      try {
        if (!query || query.trim() === "") return [];
        const results = getYeastSuggestions(query);
        return Array.isArray(results) ? results : [];
      } catch {
        return [];
      }
    };
    
    const handleSelectYeast = (yeast: any) => {
      form.setValue(`ingredients.yeasts.${index}.name`, yeast.name);
      form.setValue(`ingredients.yeasts.${index}.type`, yeast.type || "Ale");
      form.setValue(`ingredients.yeasts.${index}.form`, yeast.form || "Dry");
      form.setValue(`ingredients.yeasts.${index}.laboratory`, yeast.laboratory || "");
      form.setValue(`ingredients.yeasts.${index}.productId`, yeast.productId || "");
      form.setValue(`ingredients.yeasts.${index}.minAttenuation`, yeast.minAttenuation || undefined);
      form.setValue(`ingredients.yeasts.${index}.maxAttenuation`, yeast.maxAttenuation || undefined);
      form.setValue(`ingredients.yeasts.${index}.flocculation`, yeast.flocculation || "");
      form.setValue(`ingredients.yeasts.${index}.costPerUnit`, yeast.costPerUnit || 0);
      form.setValue(`ingredients.yeasts.${index}.notes`, yeast.notes || "");
      setOpenNamePopover(false);
    };
    
    return (
      <div className="space-y-6 border p-4 rounded-md">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField
            control={form.control}
            name={`ingredients.yeasts.${index}.name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name*</FormLabel>
                <Popover
                  open={openNamePopover}
                  onOpenChange={(open) => {
                    setOpenNamePopover(open);
                    if (open) setSearchQuery(field.value || "");
                  }}
                >
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Input
                        placeholder="Search yeast..."
                        {...field}
                        onClick={() => setOpenNamePopover(true)}
                      />
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0" align="start">
                    <Command>
                      <CommandInput
                        placeholder="Search yeast..."
                        value={searchQuery}
                        onValueChange={(val) => setSearchQuery(val || "")}
                      />
                      <CommandList>
                        <CommandEmpty>
                          <div
                            className="flex items-center px-2 py-1.5 text-sm rounded-sm cursor-pointer hover:bg-accent"
                            onClick={() => {
                              setShowNewYeastDialog(true);
                              setOpenNamePopover(false);
                            }}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Create "{searchQuery}"
                          </div>
                        </CommandEmpty>
                        {getSuggestions(searchQuery).length > 0 && (
                          <CommandGroup>
                            {getSuggestions(searchQuery).map((item) => (
                              <CommandItem
                                key={item.id || `yeast-${Math.random()}`}
                                value={item.name}
                                onSelect={() => handleSelectYeast(item)}
                              >
                                {item.name}
                              </CommandItem>
                            ))}
                            <div
                              className="flex items-center px-2 py-1.5 text-sm rounded-sm cursor-pointer text-primary hover:bg-accent"
                              onClick={() => {
                                setShowNewYeastDialog(true);
                                setOpenNamePopover(false);
                              }}
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              Create "{searchQuery}"
                            </div>
                          </CommandGroup>
                        )}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
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

          <FormField
            control={form.control}
            name={`ingredients.yeasts.${index}.amount`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount (pkg)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    step="0.01" 
                    min="0" 
                    {...field}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      field.onChange(isNaN(value) ? 0 : value);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name={`ingredients.yeasts.${index}.laboratory`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Laboratory</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Fermentis" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`ingredients.yeasts.${index}.flocculation`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Flocculation</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value || "Medium"}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select flocculation" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Very High">Very High</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`ingredients.yeasts.${index}.productId`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product ID</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. US-05" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name={`ingredients.yeasts.${index}.minAttenuation`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Min Attenuation (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="e.g. 73"
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const value = e.target.value ? parseFloat(e.target.value) : undefined;
                      field.onChange(isNaN(value as number) ? undefined : value);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`ingredients.yeasts.${index}.maxAttenuation`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Attenuation (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="e.g. 77"
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const value = e.target.value ? parseFloat(e.target.value) : undefined;
                      field.onChange(isNaN(value as number) ? undefined : value);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => removeYeast(index)}
            disabled={yeasts.length <= 1}
          >
            <Trash2 className="h-4 w-4 mr-1" /> Remove
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Yeast</h2>
      <div className="space-y-6">
        {yeasts.map((_, index) => (
          <YeastRow key={index} index={index} />
        ))}
      </div>
      <div className="flex gap-2">
        <Button type="button" onClick={addYeast} className="w-full bg-brewing-amber text-white hover:bg-brewing-amber/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Yeast
        </Button>
        <Button type="button" onClick={() => setShowNewYeastDialog(true)} variant="outline" className="whitespace-nowrap">
          Create New Yeast
        </Button>
      </div>
      <YeastDialogForm
        open={showNewYeastDialog}
        onOpenChange={setShowNewYeastDialog}
        onSubmit={handleAddNewYeast}
      />
    </div>
  );
};
