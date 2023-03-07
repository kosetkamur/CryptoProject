export type StockItemsApi = {
  id: string;
  name: string;
  image: string;
  current_price: number;
  symbol: string;
  price_change_percentage_24h: number;
  price_change_24h: number;
};

export type StockItemsModels = {
  id: string;
  name: string;
  image: string;
  currentPrice: number;
  symbol: string;
  priceChangePercentage24h: number;
  priceChange24h: number;
};

export const normalizeStockItems = (from: StockItemsApi): StockItemsModels => ({
  id: from.id,
  name: from.name,
  image: from.image,
  currentPrice: from.current_price,
  symbol: from.symbol,
  priceChangePercentage24h: from.price_change_percentage_24h,
  priceChange24h: from.price_change_24h,
});
