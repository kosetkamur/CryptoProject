import React, { createContext, useContext } from "react";

import "../config/configureMobX";

import { Meta } from "@store/meta";
import { StockItemsModels } from "@store/models";
import { useQueryParamsStoreInit } from "@store/RootStore/hooks/useQueryParamsStoreInit";
import StocksStore from "@store/StocksStore/StocksStore";
import { useLocalStore } from "@store/useLocalStore/useLocalStore";
import { observer } from "mobx-react-lite";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import CoinPage from "./pages/CoinPage";
import MarketPage from "./pages/MarketPage";

import "../styles/styles.scss";

export const CoinContext = createContext<StockItemsModels[]>([]);

export const useCoinContext = () => useContext(CoinContext);

function App() {
  // useQueryParamsStoreInit();
  const stocksStore = useLocalStore(() => new StocksStore());

  React.useEffect(() => {
    stocksStore.getStocksList({
      area: "markets",
    });
  }, [stocksStore]);

  if (stocksStore.meta === Meta.loading) {
    return <div>Загрузка</div>;
  }

  return (
    <CoinContext.Provider value={stocksStore.list}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MarketPage />} />
          <Route path="/:coinID" element={<CoinPage />} />
        </Routes>
      </BrowserRouter>
    </CoinContext.Provider>
  );
}

export default observer(App);
