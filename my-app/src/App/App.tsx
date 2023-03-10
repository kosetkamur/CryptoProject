import React from "react";

import "../config/configureMobX";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import CoinPage from "./pages/CoinPage";
import MarketPage from "./pages/MarketPage";

import "../styles/styles.scss";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MarketPage />} />
          <Route path="/:coinID" element={<CoinPage />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
