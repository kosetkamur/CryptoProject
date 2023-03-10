import React, { FC } from "react";

import { useStocksStoreContext } from "@app/pages/MarketPage/MarketPage";
import { StockItemsModels } from "@store/models";
import { observer } from "mobx-react-lite";

import CoinCard from "./CoinCard/CoinCard";
import styles from "./CoinCards.module.scss";

const CoinCards: FC = () => {
  const stockStore = useStocksStoreContext();
  return (
    <div className={styles.cards}>
      {stockStore?.list.map((stock) => (
        <CoinCard stock={stock} key={stock.id} />
      ))}
    </div>
  );
};

export default observer(CoinCards);
