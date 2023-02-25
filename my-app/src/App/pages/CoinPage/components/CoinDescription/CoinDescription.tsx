import React, { FC, useEffect, useState } from "react";

import { CoinList } from "@config/const";
import axios from "axios";

import styles from "./CoinDescription.module.scss";

const CoinDescription: FC<CoinList> = ({ coin }) => {
  const [description, setDescription] = useState();

  useEffect(() => {
    if (coin.id) {
      const fetch = async () => {
        let url: string = "https://api.coingecko.com/api/v3/coins/" + coin.id;
        const result = await axios({
          method: "get",
          url: url,
        });
        setDescription(result.data.description.en);
      };
      fetch();
    }
  }, [coin]);
  return (
    <div className={styles.description}>
      <h5>Description</h5>
      <p
        dangerouslySetInnerHTML={
          description ? { __html: description } : undefined
        }
        className={styles.description__text}
      ></p>
    </div>
  );
};

export default CoinDescription;
