export const queryFunction = (queryParams: { query: string }): string => {
  return `?vs_currency=${queryParams}`;
};
