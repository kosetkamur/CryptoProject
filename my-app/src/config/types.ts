import { CoinModels } from "store/models/Coin";
import { ILocalStore } from "store/useLocalStore/useLocalStore";

export type CoinProps = {
  coin: CoinModels | null;
};

export type getStocksListParams = {
  area: string;
};

export interface IStocksStore extends ILocalStore {
  getStocksList(params: getStocksListParams): Promise<void>;
  getCoin(id: string): Promise<void>;
}

export type Option = {
  key: string;
  value: string;
};

export type MultiDropdownProps = {
  options: Option[];
  value: Option;
  onChange: (value: Option) => void;
};

export type TableRow = {
  key: number;
  title: string;
  value?: number | string;
};
