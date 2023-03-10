import React, { FC } from "react";

import { CoinProps } from "@config/types";
import arrowBack from "@img/arrow.svg";
import star from "@img/star.svg";
import { Link } from "react-router-dom";

import styles from "./CoinHeader.module.scss";

const CoinHeader: FC<CoinProps> = ({ coin }) => {
  return (
    <div className={styles.header}>
      <Link to="/" className={styles.header__arrowBack}>
        <img src={arrowBack} alt="Вернуться на главную" />
      </Link>
      <div className={styles.header__image}>
        <img src={coin?.image.small} alt="знак валюты" />
      </div>
      <div className={styles.header__description}>
        <p className={styles.header__description_title}>{coin?.name}</p>
        <p className={styles.header__description_subtitle}>
          ({coin?.symbol.toUpperCase()})
        </p>
      </div>
      <div className={styles.header__star}>
        <img src={star} alt="Добавить в избранное" />
      </div>
    </div>
  );
};

export default CoinHeader;
