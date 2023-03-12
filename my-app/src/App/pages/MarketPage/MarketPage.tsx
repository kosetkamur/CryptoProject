import React, { createContext, FC, useContext, useState } from "react";

import MultiDropdown from "@components/Multidropdown";
import options from "@config/const";
import { Option } from "@config/types";
import { Meta } from "@store/meta";
import { useQueryParamsStoreInit } from "@store/RootStore/hooks/useQueryParamsStoreInit";
import StocksStore from "@store/StocksStore/StocksStore";
import { useLocalStore } from "@store/useLocalStore/useLocalStore";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";

import CategoryCoin from "./components/CategoryCoin";
import CoinCards from "./components/CoinCards";
import InputSearch from "./components/InputSearch";
import styles from "./MarketPage.module.scss";
import Line from "../../components/Line";

export const StocksStoreContext = createContext<StocksStore | null>(null);
export const useStocksStoreContext = () => useContext(StocksStoreContext);

const MarketPage: FC = () => {
  useQueryParamsStoreInit();
  const stocksStore = useLocalStore(() => new StocksStore());
  const [searchParams, setSarchParams] = useSearchParams();

  const query = searchParams.get("vs_currency") || "";
  const [option, setOption] = useState<Option>({ key: "USD", value: "USD" });

  React.useEffect(() => {
    stocksStore.getStocksList();
  }, [stocksStore]);

  const handleChange = (value: string) => {
    stocksStore.setValue(value);
  };

  const handleSubmit = () => {
    const query = stocksStore.value.toLowerCase();
    stocksStore.setSearchList(query);
    stocksStore.setCurrency(query.toLowerCase());
    setSarchParams({ vs_currency: query });
  };

  if (stocksStore.meta === Meta.loading) {
    return <div>Загрузка</div>;
  }

  return (
    <StocksStoreContext.Provider value={stocksStore}>
      <div className={styles.market}>
        <InputSearch
          value={stocksStore.value}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <div className={styles.market__multidropdown}>
          <h4>Coins</h4>
          <MultiDropdown
            options={options}
            value={option}
            onChange={setOption}
          />
        </div>
        <CategoryCoin />
        <Line />
        <CoinCards />
      </div>
    </StocksStoreContext.Provider>
  );
};

export default observer(MarketPage);
