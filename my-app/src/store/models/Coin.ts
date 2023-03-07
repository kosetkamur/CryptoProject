import {
  CoinMarketDataApi,
  CoinMarketDataModels,
  normalizeCoinMarketData,
} from "@store/models/CoinMarketData";

export type CoinApi = {
  id: string;
  name: string;
  image: { small: string };
  symbol: string;
  description: { en: string };
  market_data: CoinMarketDataApi;
};

export type CoinModels = {
  id: string;
  name: string;
  image: { small: string };
  symbol: string;
  description: { en: string };
  marketData: CoinMarketDataModels;
};

export const normalizeCoin = (from: CoinApi): CoinModels => ({
  id: from.id,
  name: from.name,
  image: from.image,
  symbol: from.symbol,
  description: from.description,
  marketData: normalizeCoinMarketData(from.market_data),
});
