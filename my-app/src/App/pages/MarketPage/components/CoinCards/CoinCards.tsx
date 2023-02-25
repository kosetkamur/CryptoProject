import React, { FC } from "react";

import CoinCard from "./CoinCard/CoinCard";
import styles from "./CoinCards.module.scss";
import { useCoinContext } from "../../../../App";

const CoinCards: FC = () => {
  const coinContext = useCoinContext();
  return (
    <div className={styles.cards}>
      {coinContext.length > 0
        ? coinContext.map((stock) => <CoinCard stock={stock} key={stock.id} />)
        : ""}
    </div>
  );
};

export default CoinCards;
