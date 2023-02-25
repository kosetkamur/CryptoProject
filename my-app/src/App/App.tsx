import React, { createContext, useContext, useEffect, useState } from "react";

import { Stocks } from "@config/const";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import CoinPage from "./pages/CoinPage";
import MarketPage from "./pages/MarketPage";

import "../styles/styles.scss";

export const CoinContext = createContext<Stocks[]>([]);

export const useCoinContext = () => useContext(CoinContext);

function App() {
  const [stocks, setStocks] = useState<Stocks[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const result = await axios({
        method: "get",
        url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd",
      });
      setStocks(
        result.data.map((stock: any) => ({
          id: stock.id,
          name: stock.name,
          image: stock.image,
          symbol: stock.symbol,
          current_price: stock.current_price,
          price_change_percentage_24h: stock.price_change_percentage_24h,
          price_change_24h: stock.price_change_24h,
          market_cap: stock.market_cap,
          fully_diluted_valuation: stock.fully_diluted_valuation,
          circulating_supply: stock.circulating_supply,
          total_supply: stock.total_supply,
          max_supply: stock.max_supply,
        }))
      );
    };
    fetch();
  }, []);

  return (
    <CoinContext.Provider value={stocks}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MarketPage />} />
          <Route path="/:coinID" element={<CoinPage />} />
        </Routes>
      </BrowserRouter>
    </CoinContext.Provider>
  );
}

export default App;
