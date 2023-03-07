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

const BASE_URL = "https://api.coingecko.com/api/v3/coins/";

type PrivateFields = "_list" | "_meta" | "_coin" | "_query";

export default class StocksStore implements IStocksStore, ILocalStore {
  private readonly _apiStore = new ApiStore(BASE_URL);
  private _list: CollectionModel<string, StockItemsModels> =
    getInitialCollectionModel();
  private _coin: CoinModels | null = null;
  private _meta: Meta = Meta.initial;
  private _query: string = "";

  constructor() {
    makeObservable<StocksStore, PrivateFields>(this, {
      _coin: observable.ref,
      _list: observable.ref,
      _meta: observable,
      _query: observable,
      query: computed,
      list: computed,
      meta: computed,
      coin: computed,
      getStocksList: action,
      getCoin: action,
      setQuery: action,
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

  get query(): string {
    return this._query;
  }

  public setQuery = (getQuery: string): void => {
    this._query = getQuery;
    console.log(getQuery);
    // this.getStocksList();
  };

  async getStocksList(params: getStocksListParams): Promise<void> {
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();

    const query = queryFunction({
      query: this._query !== "" ? this._query : "",
    });

    const response = await this._apiStore.request<StockItemsApi[] | null>({
      endpoint: `${params.area}?vs_currency=usd`,
      // endpoint: `/${params.area}?vs_currency=${query}`,
    });

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }
      try {
        const list: StockItemsModels[] = [];
        for (const item of response.data) {
          list.push(normalizeStockItems(item));
        }
        this._meta = Meta.success;
        this._list = normalizeCollection(list, (listItem) => listItem.id);
        return;
      } catch {
        this._meta = Meta.error;
        this._list = getInitialCollectionModel();
      }
    });
    console.log(toJS(this.getStocksList));
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
    // nothing to do
    this._qpReaction();
  }

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam("vs_currency"),
    () => console.log(this.getStocksList) //загрузить список организаций, который должны выводиться при vs_currency
  );
}
