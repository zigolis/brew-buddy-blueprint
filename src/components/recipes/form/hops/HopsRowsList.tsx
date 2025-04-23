
import { useFormContext } from "react-hook-form";
import HopRow from "./HopRow";

interface HopsRowsListProps {
  hops: { id: number }[];
  form: any;
  removeHop: (id: number) => void;
  onAddToRecipe?: (hopData: any) => void;
}

export default function HopsRowsList({ hops, form, removeHop, onAddToRecipe }: HopsRowsListProps) {
  const { control } = useFormContext();

  return (
    <div className="space-y-6">
      {hops.map((hop, index) => (
        <HopRow 
          key={hop.id} 
          form={form} 
          control={control} 
          index={index} 
          hop={hop} 
          onRemove={removeHop}
          onAddToRecipe={onAddToRecipe}
        />
      ))}
    </div>
  );
}
