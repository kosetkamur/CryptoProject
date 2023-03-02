import React, { useEffect, useState } from "react";

import { Stocks } from "@config/const";
import { urlCoin } from "@config/urls";
import axios from "axios";
import { useParams } from "react-router-dom";

import styles from "./CoinPage.module.scss";
import Coin from "./components/Coin/Coin";

const CoinPage = () => {
  const [coin, setCoin] = useState<Stocks | null>(null);

  const { coinID } = useParams();

  useEffect(() => {
    try {
      const fetch = async () => {
        let url: string = urlCoin + coinID;
        const result = await axios({
          method: "get",
          url: url,
        });
        setCoin(result.data);
      };
      fetch();
    } catch {
      alert("Error");
    }
  }, [coinID]);

  if (!coin) {
    return <div>загрузка</div>;
  }

  return (
    <div className={styles.coin}>
      <div>
        <Coin coin={coin} />
      </div>
    </div>
  );
};

export default CoinPage;
