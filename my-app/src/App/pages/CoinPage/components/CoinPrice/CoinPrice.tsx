import React, { FC } from "react";

import { CoinProps } from "@config/types";
import { getFormattedPrice } from "@utils/getFormattedPrice";

import styles from "./CoinPrice.module.scss";

const CoinPrice: FC<CoinProps> = ({ coin }) => {
  if (!coin) {
    return <div>Error</div>;
  }
  return (
    <div className={styles.price}>
      <div className={styles.price__current}>
        <h3>${getFormattedPrice(coin?.marketData?.currentPrice.usd)}</h3>
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
};

export default CoinPrice;
