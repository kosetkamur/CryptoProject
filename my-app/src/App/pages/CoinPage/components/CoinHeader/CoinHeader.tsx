import React, { FC } from "react";

import { CoinList } from "@config/const";
import { Link } from "react-router-dom";

import styles from "./CoinHeader.module.scss";

const CoinHeader: FC<CoinList> = ({ coin }) => {
  return (
    <div className={styles.header}>
      <Link to="/" className={styles.header__arrowBack}>
        <div className={styles.header__arrowBack_arrow}></div>
      </Link>
      <div className={styles.header__image}>
        <img src={coin.image} alt="знак валюты" />
      </div>
      <div className={styles.header__description}>
        <p className={styles.header__description_title}>{coin.name}</p>
        <p className={styles.header__description_subtitle}>
          ({coin.symbol.toUpperCase()})
        </p>
      </div>
      <div className={styles.header__star}>
        <div className={styles.header__star_img}></div>
      </div>
    </div>
  );
};

export default CoinHeader;
