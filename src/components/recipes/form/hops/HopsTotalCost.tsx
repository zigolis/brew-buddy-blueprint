
const HopsTotalCost = ({ form }) => {
  // Defensive: ensure we only calculate for array
  const watchedHops = form.watch("ingredients.hops");
  const hopsArray = Array.isArray(watchedHops) ? watchedHops : [];

  const totalCost = hopsArray.reduce((acc, hop) => {
    const amount = parseFloat(hop?.amount || '0') || 0;
    const cost = parseFloat(hop?.costPerUnit || '0') || 0;
    return acc + amount * cost;
  }, 0);

  return (
    <div className="text-sm text-muted-foreground">
      Total Cost: ${totalCost.toFixed(2)}
    </div>
  );
};

export default HopsTotalCost;
