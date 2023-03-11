export const getFormattedPrice = (price?: number): string | number => {
  if (price === undefined) {
    return 0;
  }
  return price
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
