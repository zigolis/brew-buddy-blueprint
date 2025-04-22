
import React from "react";

interface FermentablesToolbarProps {
  totalCost: string;
}

export const FermentablesToolbar = ({ totalCost }: FermentablesToolbarProps) => (
  <div className="flex items-center justify-between">
    <h2 className="text-xl font-semibold">Fermentables</h2>
    <div className="flex gap-2 items-center">
      <span className="text-sm text-muted-foreground">
        Total Cost: ${totalCost}
      </span>
    </div>
  </div>
);
