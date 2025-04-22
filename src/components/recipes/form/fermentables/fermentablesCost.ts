
export function calculateFermentablesTotalCost(fermentablesData: any[]) {
  return fermentablesData
    .reduce(
      (acc, f) =>
        acc + ((parseFloat(f?.amount || "0") / 1000) || 0) * (parseFloat(f?.costPerUnit || "0") || 0),
      0
    )
    .toFixed(2);
}
