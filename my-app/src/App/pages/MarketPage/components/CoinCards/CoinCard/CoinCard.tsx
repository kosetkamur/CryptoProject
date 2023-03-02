import React, { FC } from "react";

import { regexPrice, Stocks } from "@config/const";
import cn from "classnames";
import { Link } from "react-router-dom";

import styles from "./CoinCard.module.scss";

type CoinCardList = {
  stock: Stocks;
};

const CoinCard: FC<CoinCardList> = ({ stock }) => {
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
            $
            {stock.current_price.toFixed(2).toString().replace(regexPrice, ",")}
          </h5>
          <p
            className={cn(
              styles.card__price_percent,
              stock.price_change_percentage_24h > 0
                ? styles.colorGreen
                : styles.colorRed
            )}
          >
            {stock.price_change_percentage_24h.toFixed(2)}%
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CoinCard;
