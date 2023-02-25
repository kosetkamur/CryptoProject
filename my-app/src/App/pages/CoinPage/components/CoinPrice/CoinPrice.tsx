import React, { FC } from "react";

import { Stocks } from "@config/const";

import styles from "./CoinPrice.module.scss";

type CoinPriceList = {
  coin: Stocks;
};

const CoinPrice: FC<CoinPriceList> = ({ coin }) => {
  let re = /(?=\B(?:\d{3})+(?!\d))/g;
  return (
    <div className={styles.price}>
      <div className={styles.price__current}>
        <h3>${coin.current_price.toFixed(2).toString().replace(re, ",")}</h3>
      </div>
      <div className={styles.price__change}>
        <p>
          {coin.price_change_24h !== undefined && coin.price_change_24h > 0 ? (
            <span>
              +{coin.price_change_24h.toFixed(3)}(
              {coin.price_change_percentage_24h.toFixed(2)}%)
            </span>
          ) : (
            <span style={{ color: "red" }}>
              {coin.price_change_24h ? coin.price_change_24h.toFixed(3) : ""}(
              {coin.price_change_percentage_24h.toFixed(2)}%)
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default CoinPrice;
