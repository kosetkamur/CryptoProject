import React, { FC } from "react";

import { CoinList } from "@config/const";

import styles from "./CoinDescription.module.scss";

const CoinDescription: FC<CoinList> = ({ coin }) => {
  return (
    <div className={styles.description}>
      <h5>Description</h5>
      <p
        dangerouslySetInnerHTML={
          coin?.description?.en ? { __html: coin?.description?.en } : undefined
        }
        className={styles.description__text}
      ></p>
    </div>
  );
};

export default CoinDescription;
