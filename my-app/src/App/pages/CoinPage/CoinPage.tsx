import React, { useEffect, useState } from "react";

import { CoinTypes } from "@config/const";
import { urlCoin } from "@config/urls";
import axios from "axios";
import { useParams } from "react-router-dom";

import styles from "./CoinPage.module.scss";
import Coin from "./components/Coin/Coin";

const CoinPage = () => {
  const [coin, setCoin] = useState<CoinTypes | null>(null);
  const [error, setError] = React.useState<string | null>(null);

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
      setError("Не удалось получить данные");
    }
  }, [coinID]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.coin}>
      <Coin coin={coin} />
    </div>
  );
};

export default CoinPage;
