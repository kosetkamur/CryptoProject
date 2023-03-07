export type CurrenciesApi = {
  usd: number;
  rub: number;
  aed: number;
  eur: number;
};

export type CurrenciesModels = {
  usd: number;
  rub: number;
  aed: number;
  eur: number;
};

export const normalizeCurrencies = (from: CurrenciesApi): CurrenciesModels => ({
  usd: from.usd,
  rub: from.rub,
  aed: from.aed,
  eur: from.eur,
});
