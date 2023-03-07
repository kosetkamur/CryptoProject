import React from "react";

import { Meta } from "@store/meta";
import StocksStore from "@store/StocksStore/StocksStore";
import { useLocalStore } from "@store/useLocalStore/useLocalStore";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import styles from "./CoinPage.module.scss";
import Coin from "./components/Coin/Coin";

const CoinPage = () => {
  const stocksStore = useLocalStore(() => new StocksStore());
  const { coinID } = useParams();

  React.useEffect(() => {
    stocksStore.getCoin(coinID);
  }, [stocksStore, coinID]);

  if (stocksStore.meta === Meta.loading) {
    return <div>Загрузка</div>;
  }

  return (
    <div className={styles.coin}>
      <Coin coin={stocksStore.coin} />
    </div>
  );
};

export default observer(CoinPage);
