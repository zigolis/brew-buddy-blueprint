
/**
 * Calculate Alcohol By Volume (ABV) from Original Gravity (OG) and Final Gravity (FG)
 * Uses the standard formula: ABV = (OG - FG) * 131.25
 */
export const calculateABV = (originalGravity: number, finalGravity: number): number => {
  // Ensure we have valid numbers
  if (!originalGravity || !finalGravity || originalGravity < finalGravity) {
    return 0;
  }
  
  return (originalGravity - finalGravity) * 131.25;
};
