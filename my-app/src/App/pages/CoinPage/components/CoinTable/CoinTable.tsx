import React, { FC } from "react";

import { CoinList } from "@config/const";
import { regexPrice } from "@config/regex";

import styles from "./CoinTable.module.scss";
import Line from "../../../../components/Line";

const CoinTable: FC<CoinList> = ({ coin }) => {
  let marketData = coin?.marketData;
  //react.useMemo в 4 домашке
  const tableValue = [
    {
      key: 0,
      title: "Market Cap",
      value: `${marketData?.marketCap?.usd}`,
    },
    {
      key: 1,
      title: "Fully Diluted Valuation",
      value: `${marketData?.fullyDilutedValuation?.usd}`,
    },
    {
      key: 2,
      title: "Circulating Supply",
      value: marketData?.circulatingSupply,
    },
    { key: 3, title: "Total Supply", value: marketData?.totalSupply },
    { key: 4, title: "Max Supply", value: marketData?.maxSupply },
  ];
  return (
    <div className={styles.table}>
      {tableValue.map((value) => (
        <div key={value.key}>
          <div className={styles.table__head}>
            <p className={styles.table__head_title}>{value.title}</p>
            <p className={styles.table__head_value}>
              $
              {value.value
                ? value.value.toString().replace(regexPrice, ",")
                : 0}
            </p>
          </div>
          <Line />
        </div>
      ))}
    </div>
  );
};

export default CoinTable;
