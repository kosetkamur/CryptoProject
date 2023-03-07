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
            {coin?.marketData?.currentPrice.usd
              ? coin?.marketData?.currentPrice.usd
                  .toFixed(3)
                  .toString()
                  .replace(regexPrice, ",")
              : 0}
          </h3>
        </div>
        <div className={styles.price__change}>
          <p>
            {coin?.marketData?.priceChange24h.usd !== undefined &&
            coin.marketData?.priceChange24h.usd > 0 ? (
              <span className={styles.colorGreen}>
                +{coin?.marketData?.priceChange24h.usd}(
                {coin?.marketData?.priceChangePercentage24hInCurrency.usd}
                %)
              </span>
            ) : (
              <span className={styles.colorRed}>
                {coin?.marketData?.priceChange24h?.usd || ""}(
                {coin?.marketData?.priceChangePercentage24hInCurrency.usd}
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
