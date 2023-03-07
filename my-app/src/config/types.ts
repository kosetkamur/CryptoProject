export type getStocksListParams = {
  area: string;
};

export interface IStocksStore {
  getStocksList(params: getStocksListParams): Promise<void>;
  getCoin(id: string): Promise<void>;
}
