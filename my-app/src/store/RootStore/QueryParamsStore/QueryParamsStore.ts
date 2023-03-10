import { action, makeObservable, observable } from "mobx";
import * as qs from "qs";

type PrivateFields = "_params";

export default class QueryParamsStore {
  private _params: qs.ParsedQs = {}; //объект с параметрами, который мы распарсили
  private _search: string = ""; //оригинальная query строка, которая находиться в браузере

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      setSearch: action,
    });
  }

  getParam(
    key: string
  ): undefined | string | string[] | qs.ParsedQs | qs.ParsedQs[] {
    return this._params[key];
  }

  setSearch(search: string) {
    //каждый раз когда квери параметр меняется, вызываем эту функцию
    // и передаем строку с новыми квери параметрами
    search = search.startsWith("?") ? search.slice(1) : search;
    if (this._search !== search) {
      //проверка не равна ли текущая строка новой
      this._search = search;
      this._params = qs.parse(search); //присваеваем результат распарсенной квери строки
      console.log(this._params);
    }
  }
}
