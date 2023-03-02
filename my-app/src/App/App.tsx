import React, { createContext, useContext, useEffect, useState } from "react";

import { Stocks } from "@config/const";
import { url } from "@config/urls";
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
    try {
      const fetch = async () => {
        const result = await axios({
          method: "get",
          url: url,
        });
        setStocks(result.data);
      };
      fetch();
    } catch (e: any) {
      alert(e.message);
    }
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
