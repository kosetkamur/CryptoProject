import React, { FC } from "react";

import { CoinList } from "@config/const";
import { regexPrice } from "@config/regex";

import styles from "./CoinPrice.module.scss";

const CoinPrice: FC<CoinList> = ({ coin }) => {
  if (coin) {
    return (
      <div className={styles.price}>
        <div className={styles.price__current}>
          <h3>
            $
            {coin?.market_data?.current_price.usd
              ? coin?.market_data?.current_price.usd
                  .toFixed(3)
                  .toString()
                  .replace(regexPrice, ",")
              : 0}
          </h3>
        </div>
        <div className={styles.price__change}>
          <p>
            {coin?.market_data?.price_change_24h.usd !== undefined &&
            coin.market_data?.price_change_24h.usd > 0 ? (
              <span className={styles.colorGreen}>
                +{coin?.market_data?.price_change_24h.usd}(
                {coin?.market_data?.price_change_percentage_24h_in_currency.usd}
                %)
              </span>
            ) : (
              <span className={styles.colorRed}>
                {coin?.market_data?.price_change_24h?.usd || ""}(
                {coin?.market_data?.price_change_percentage_24h_in_currency.usd}
                %)
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
