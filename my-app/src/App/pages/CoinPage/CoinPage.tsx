import React, { useEffect, useState } from "react";

import { Stocks } from "@config/const";
import { useParams } from "react-router-dom";

import styles from "./CoinPage.module.scss";
import Coin from "./components/Coin/Coin";
import { useCoinContext } from "../../App";

const CoinPage = () => {
  const [coin, setCoin] = useState<Stocks>({
    id: "",
    name: "",
    image: "",
    current_price: 0,
    symbol: "",
    price_change_percentage_24h: 0,
    price_change_24h: 0,
    market_cap: 0,
    fully_diluted_valuation: 0,
    circulating_supply: 0,
    total_supply: 0,
    max_supply: 0,
  });
  const coinContext = useCoinContext();

  const { coinID } = useParams();

  let stock: any = coinContext.find((item) => item.id === coinID);

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
