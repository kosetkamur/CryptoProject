import { getStocksListParams, IStocksStore } from "@config/types";
import ApiStore from "@store/ApiStore/ApiStore";
import { CoinApi, CoinModels, normalizeCoin } from "@store/models/Coin";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from "@store/models/shared/collection";
import rootStore from "@store/RootStore";
import { queryFunction } from "@store/StocksStore/queryFunction.ts/queryFunction";
import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
  runInAction,
  toJS,
} from "mobx";

import { Meta } from "../meta";
import {
  normalizeStockItems,
  StockItemsApi,
  StockItemsModels,
} from "../models";
import { ILocalStore } from "../useLocalStore/useLocalStore";

const BASE_URL = "https://api.coingecko.com/api/v3/coins";

type PrivateFields = "_list" | "_meta" | "_coin" | "_value";

export default class StocksStore implements IStocksStore, ILocalStore {
  private readonly _apiStore = new ApiStore(BASE_URL);
  private _list: CollectionModel<string, StockItemsModels> =
    getInitialCollectionModel();
  private _coin: CoinModels | null = null;
  private _meta: Meta = Meta.initial;
  private _value: string = "";

  constructor() {
    makeObservable<StocksStore, PrivateFields>(this, {
      _coin: observable.ref,
      _list: observable.ref,
      _meta: observable,
      _value: observable,

      list: computed,
      meta: computed,
      coin: computed,
      value: computed,

      getStocksList: action,
      getCoin: action,
      setValue: action,
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

  setValue(value: string) {
    this._value = value;
    let str = `vs_currency=${value}`;
    rootStore.query.setSearch(str);
  }

  async getStocksList(params: getStocksListParams): Promise<void> {
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();
    // let query: string = "usd";
    // if (this._value) {
    //   query = this._value;
    // }

    const response = await this._apiStore.request<StockItemsApi[] | null>({
      // endpoint: `markets?vs_currency=${query}`,
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

  destroy(): void {
    this._qpReaction();
  }

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam("vs_currency"),
    (search) => search //загрузить список монет, который должны выводиться при vs_currency
  );
}
