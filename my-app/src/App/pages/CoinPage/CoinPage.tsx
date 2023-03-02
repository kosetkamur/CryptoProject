import React, { useEffect, useState } from "react";

import { Stocks } from "@config/const";
import { useParams } from "react-router-dom";

import styles from "./CoinPage.module.scss";
import Coin from "./components/Coin/Coin";
import { useCoinContext } from "../../App";

const CoinPage = () => {
  const [coin, setCoin] = useState<Stocks | null>(null);
  const coinContext = useCoinContext();

  const { coinID } = useParams();

  let stock = coinContext.find((item) => item.id === coinID);

  useEffect(() => {
    if (stock !== undefined && stock.id !== "") {
      setCoin(stock);
    }
  }, [stock]);

  return (
    <div className={styles.coin}>
      <div>
        <Coin coin={coin} />
      </div>
    </div>
  );
};

export default CoinPage;
