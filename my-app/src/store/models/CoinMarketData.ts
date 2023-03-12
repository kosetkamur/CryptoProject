import {
  CurrenciesApi,
  CurrenciesModels,
  normalizeCurrencies,
} from "store/models/Currencies";

export type CoinMarketDataApi = {
  market_cap: CurrenciesApi;
  fully_diluted_valuation: CurrenciesApi;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  current_price: CurrenciesApi;
  price_change_24h_in_currency: CurrenciesApi;
  price_change_percentage_24h_in_currency: CurrenciesApi;
};

export type CoinMarketDataModel = {
  marketCap: CurrenciesModels;
  fullyDilutedValuation: CurrenciesModels;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number;
  currentPrice: CurrenciesModels;
  priceChange24hInCurrency: CurrenciesModels;
  priceChangePercentage24hInCurrency: CurrenciesModels;
};

export const normalizeCoinMarketData = (
  from: CoinMarketDataApi
): CoinMarketDataModel => ({
  marketCap: normalizeCurrencies(from.market_cap),
  fullyDilutedValuation: normalizeCurrencies(from.fully_diluted_valuation),
  circulatingSupply: from.circulating_supply,
  totalSupply: from.total_supply,
  maxSupply: from.max_supply,
  currentPrice: normalizeCurrencies(from.current_price),
  priceChange24hInCurrency: normalizeCurrencies(
    from.price_change_24h_in_currency
  ),
  priceChangePercentage24hInCurrency: normalizeCurrencies(
    from.price_change_percentage_24h_in_currency
  ),
});
