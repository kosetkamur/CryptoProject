export type Stocks = {
  id: string;
  name: string;
  image: any;
  current_price: number;
  symbol: string;
  value?: string;
  price_change_percentage_24h: number;
  price_change_24h?: number;
  market_cap?: number;
  fully_diluted_valuation?: number;
  circulating_supply?: number;
  total_supply?: number;
  max_supply?: number;
};

export const regexPrice = /(?=\B(?:\d{3})+(?!\d))/g;

export type CoinList = {
  coin: Stocks | null;
};
