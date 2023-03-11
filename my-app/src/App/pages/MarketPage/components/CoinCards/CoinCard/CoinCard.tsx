import React, { FC } from "react";

import { currencyIcon } from "@config/const";
import { StockItemsModels } from "@store/models";
import { getFormattedPrice } from "@utils/getFormattedPrice";
import cn from "classnames";
import { Link } from "react-router-dom";

import styles from "./CoinCard.module.scss";

type CoinCardList = {
  stock: StockItemsModels;
  currency: string;
};

const CoinCard: FC<CoinCardList> = ({ stock, currency }) => {
  return (
    <Link to={`/${stock.id}`} className={styles.link}>
      <div className={styles.card} id={stock.id} key={stock.id}>
        <div className={styles.card__content}>
          <div className={styles.card__image}>
            <img src={stock.image} alt="логотип" />
          </div>
          <div className={styles.card__description}>
            <div className={styles.card__description_title}>{stock.name}</div>
            <div className={styles.card__description_subtitle}>
              {stock.symbol.toUpperCase()}
            </div>
          </div>
        </div>
        <div className={styles.card__price}>
          <h5 className={styles.card__price_title}>
            {currency ? currencyIcon[currency.toLowerCase()] : "$"}
            {getFormattedPrice(stock.currentPrice)}
          </h5>
          <p
            className={cn(
              styles.card__price_percent,
              stock.priceChangePercentage24h > 0
                ? styles.colorGreen
                : styles.colorRed
            )}
          >
            {stock.priceChangePercentage24h.toFixed(2)}%
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CoinCard;
