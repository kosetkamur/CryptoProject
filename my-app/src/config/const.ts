export type Stocks = {
  id: string;
  name: string;
  image: any;
  current_price: number;
  symbol: string;
  value?: string;
  price_change_percentage_24h: number;
  price_change_24h?: number;
  description?: { en: string };
  market_data?: {
    market_cap?: { usd: number };
    fully_diluted_valuation?: { usd: number };
    circulating_supply?: number;
    total_supply?: number;
    max_supply?: number;
    current_price: { usd: number };
    price_change_24h: { usd: number };
    price_change_percentage_24h_in_currency: { usd: number };
  };
};

export type CoinList = {
  coin: Stocks | null;
};
