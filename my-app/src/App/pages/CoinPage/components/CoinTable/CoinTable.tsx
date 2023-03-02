import React, { FC } from "react";

import { CoinList, regexPrice } from "@config/const";

import styles from "./CoinTable.module.scss";
import Line from "../../../../components/Line";

const CoinTable: FC<CoinList> = ({ coin }) => {
  // const tableValue = [
  //   { key: 0, title: "Market Cap", value: coin.market_cap },
  //   {
  //     key: 1,
  //     title: "Fully Diluted Valuation",
  //     value: coin.fully_diluted_valuation,
  //   },
  //   {
  //     key: 2,
  //     title: "Circulating Supply",
  //     value: coin.circulating_supply,
  //   },
  //   { key: 3, title: "Total Supply", value: coin.total_supply },
  //   { key: 4, title: "Max Supply", value: coin.max_supply },
  // ];
  return (
    <div className={styles.table}>
      {/*{tableValue.map((value) => (*/}
      {/*  <div key={value.key}>*/}
      {/*    <div className={styles.table__head}>*/}
      {/*      <p className={styles.table__head_title}>{value.title}</p>*/}
      {/*      <p className={styles.table__head_value}>*/}
      {/*        ${value.value ? value.value.toString().replace(regexPrice, ",") : 0}*/}
      {/*      </p>*/}
      {/*    </div>*/}
      <Line />
      {/*  </div>*/}
      {/*))}*/}
    </div>
  );
};

export default CoinTable;
