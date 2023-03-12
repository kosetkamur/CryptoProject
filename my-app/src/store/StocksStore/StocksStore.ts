import { currencyIcon } from "config/const";
import { IStocksStore } from "config/types";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import ApiStore from "store/ApiStore/ApiStore";
import { CoinApi, CoinModels, normalizeCoin } from "store/models/Coin";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from "store/models/shared/collection";

import { Meta } from "../meta";
import {
  normalizeStockItems,
  StockItemsApi,
  StockItemsModels,
} from "../models";
import { ILocalStore } from "../useLocalStore/useLocalStore";

const BASE_URL = "https://api.coingecko.com/api/v3/coins/";

type PrivateFields =
  | "_list"
  | "_meta"
  | "_coin"
  | "_value"
  | "_num"
  | "_currency";

export default class StocksStore implements IStocksStore, ILocalStore {
  private readonly _apiStore = new ApiStore(BASE_URL);
  private _list: CollectionModel<string, StockItemsModels> =
    getInitialCollectionModel();
  private _coin: CoinModels | null = null;
  private _meta: Meta = Meta.initial;
  private _value: string = "";
  hasMore: boolean = true;
  private _currency: string = "$";
  private _num: number = 0;

  constructor() {
    makeObservable<StocksStore, PrivateFields>(this, {
      _coin: observable.ref,
      _list: observable.ref,
      _meta: observable,
      _value: observable,
      _num: observable,
      _currency: observable,
      hasMore: observable,

      list: computed,
      meta: computed,
      coin: computed,
      value: computed,
      currency: computed,

      getStocksList: action,
      getCoin: action,
      setValue: action,
      setHasMore: action,
      setCurrency: action,
      fetchMoreData: action.bound,
    });
  }

  get list(): StockItemsModels[] {
    return linearizeCollection(this._list);
  }

  get meta(): Meta {
    return this._meta;
  }

  get coin(): CoinModels | null {
    return this._coin;
  }

  get value(): string {
    return this._value;
  }

  get currency(): string {
    return this._currency;
  }

  setValue(value: string) {
    this._value = value;
  }

  setCurrency(query: string) {
    this._currency = currencyIcon[query];
  }

  setHasMore(): void {
    this.hasMore = false;
  }

  fetchMoreData(): void {
    this._num += 20;
    this.getStocksList();
  }

  async getStocksList(): Promise<void> {
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();

    const response = await this._apiStore.request<StockItemsApi[] | null>({
      endpoint: `markets?vs_currency=usd`,
    });

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }
      try {
        const list = response.data.map(normalizeStockItems);
        this._meta = Meta.success;
        this._list = normalizeCollection(list, (listItem) => listItem.id);
        return;
      } catch {
        this._meta = Meta.error;
        this._list = getInitialCollectionModel();
      }
    });
  }
  async setSearchList(currency: string): Promise<void> {
    this._meta = Meta.loading;

    const response = await this._apiStore.request<StockItemsApi[] | null>({
      endpoint: `markets?vs_currency=${currency}`,
    });

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }
      try {
        const list = response.data.map(normalizeStockItems);
        this._meta = Meta.success;
        this._list = normalizeCollection(list, (listItem) => listItem.id);
        return;
      } catch {
        this._meta = Meta.error;
        this._list = getInitialCollectionModel();
      }
    });
  }

  async getCoin(id: string | undefined): Promise<void> {
    this._meta = Meta.loading;
    this._coin = null;
    if (id === undefined) {
      this._meta = Meta.error;
      this._coin = null;
      return;
    }
    // запрос за списком репозиториев
    const response = await this._apiStore.request<CoinApi[] | null>({
      endpoint: `/${id}`,
    });

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
        this._coin = null;
        return;
      }
      try {
        this._meta = Meta.success;
        this._coin = normalizeCoin(response.data);
        return;
      } catch {
        this._meta = Meta.error;
        this._coin = null;
      }
    });
  }

  destroy(): void {}
}
