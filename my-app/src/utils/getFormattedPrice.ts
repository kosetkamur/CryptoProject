export const getFormattedPrice = (price?: number): string | number => {
  if (price === undefined) {
    return 0;
  }
  return price.toLocaleString("en-IN");
};
