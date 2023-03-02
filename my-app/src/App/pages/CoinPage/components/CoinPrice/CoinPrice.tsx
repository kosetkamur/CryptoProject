import React, { FC } from "react";

import { CoinList, regexPrice } from "@config/const";

import styles from "./CoinPrice.module.scss";

const CoinPrice: FC<CoinList> = ({ coin }) => {
  if (coin) {
    return (
      <div className={styles.price}>
        <div className={styles.price__current}>
          <h3>
            ${coin.current_price.toFixed(2).toString().replace(regexPrice, ",")}
          </h3>
        </div>
        <div className={styles.price__change}>
          <p>
            {coin.price_change_24h !== undefined &&
            coin.price_change_24h > 0 ? (
              <span className={styles.colorGreen}>
                +{coin.price_change_24h.toFixed(3)}(
                {coin.price_change_percentage_24h.toFixed(2)}%)
              </span>
            ) : (
              <span className={styles.colorRed}>
                {coin.price_change_24h?.toFixed(3) || ""}(
                {coin.price_change_percentage_24h.toFixed(2)}%)
              </span>
            )}
          </p>
        </div>
      </div>
    );
  } else {
    return <div>Failed</div>;
  }
};

export default CoinPrice;
